/**
 * Core · CollectionView
 *
 * Componente único que usan conceptos y paradojas: búsqueda + filtros + rejilla
 * paginada. Solo se renderiza la página actual, así el DOM no crece con la base de datos.
 *
 * Marcado esperado dentro de <… data-view="nombre">:
 *   [data-role="search"]   input de búsqueda (opcional)
 *   [data-role="pills"]    contenedor de filtros por faceta (opcional)
 *   [data-role="count"]    contador de resultados (opcional)
 *   [data-role="grid"]     rejilla de tarjetas
 *   [data-role="pager"]    contiene [data-pager="prev|next"] y [data-role="indicator"]
 *
 * Configuración:
 *   name        valor del data-view
 *   items       datos originales
 *   localize    (item) => objeto plano en el idioma actual (para tarjetas y búsqueda)
 *   searchText  (local, item) => texto donde buscar
 *   predicate   () => (item) => boolean, filtro externo opcional (explorador, favoritos…)
 *   facet       { get(item) → id, label(id) → texto, allKey } filtro por pills opcional
 *   pillClass   clase CSS de las pills
 *   emptyText   () => texto cuando no hay resultados
 *   renderCard  (local, item) => HTML; la tarjeta debe llevar data-key="{item.id}"
 *   onAction    (acción, item, elemento) => void; 'open' si se pulsa la tarjeta
 */

function getPageSize() {
    if (window.innerWidth < 480) return 5;
    if (window.innerWidth < 768) return 8;
    return 10;
}

function createCollectionView(cfg) {
    const root = document.querySelector(`[data-view="${cfg.name}"]`);
    if (!root) return null;

    const part = role => root.querySelector(`[data-role="${role}"]`);
    const grid = part('grid'), pills = part('pills'), search = part('search');
    const pager = part('pager'), counter = part('count');

    const byKey = new Map(cfg.items.map(item => [item.id, item]));
    const facetIds = cfg.facet ? [...new Set(cfg.items.map(cfg.facet.get))] : [];
    const state = { facet: null, query: '', page: 1, filtered: cfg.items };

    const totalPages = () => Math.max(1, Math.ceil(state.filtered.length / getPageSize()));

    function matches(item, extra) {
        if (state.facet && cfg.facet.get(item) !== state.facet) return false;
        if (extra && !extra(item)) return false;
        if (!state.query) return true;
        return cfg.searchText(cfg.localize(item), item).toLowerCase().includes(state.query);
    }

    function renderPills() {
        if (!pills || !cfg.facet) return;
        const pill = (id, label) =>
            `<button class="${cfg.pillClass}${state.facet === id ? ' active' : ''}" data-facet="${esc(id ?? '')}">${esc(label)}</button>`;
        pills.innerHTML = pill(null, t(cfg.facet.allKey)) + facetIds.map(id => pill(id, cfg.facet.label(id))).join('');
    }

    function renderPager() {
        if (!pager) return;
        const pages = totalPages();
        pager.hidden = state.filtered.length === 0 || pages === 1;
        pager.querySelector('[data-pager="prev"]').disabled = state.page <= 1;
        pager.querySelector('[data-pager="next"]').disabled = state.page >= pages;
        pager.querySelector('[data-role="indicator"]').textContent =
            t('pagination_page', { page: state.page, total: pages });
    }

    function render() {
        state.page = Math.min(state.page, totalPages());
        const start = (state.page - 1) * getPageSize();
        const pageItems = state.filtered.slice(start, start + getPageSize());

        grid.innerHTML = pageItems.length
            ? pageItems.map(item => cfg.renderCard(cfg.localize(item), item)).join('')
            : `<p class="empty-state">${esc(cfg.emptyText())}</p>`;
        if (counter) counter.textContent = t('results_count', { n: state.filtered.length, total: cfg.items.length });
        renderPager();
    }

    function refresh({ resetPage = true } = {}) {
        const extra = cfg.predicate ? cfg.predicate() : null;
        state.filtered = cfg.items.filter(item => matches(item, extra));
        if (resetPage) state.page = 1;
        render();
    }

    function goTo(page) {
        const next = Math.min(Math.max(1, page), totalPages());
        if (next === state.page) return;
        state.page = next;
        render();
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ----- eventos -----
    search?.addEventListener('input', () => {
        state.query = search.value.trim().toLowerCase();
        refresh();
    });

    pills?.addEventListener('click', e => {
        const btn = e.target.closest('[data-facet]');
        if (!btn) return;
        state.facet = btn.dataset.facet || null;
        renderPills();
        refresh();
    });

    pager?.addEventListener('click', e => {
        const btn = e.target.closest('[data-pager]');
        if (btn) goTo(state.page + (btn.dataset.pager === 'next' ? 1 : -1));
    });

    grid.addEventListener('click', e => {
        const card = e.target.closest('[data-key]');
        const item = card && byKey.get(card.dataset.key);
        if (!item) return;
        const actionEl = e.target.closest('[data-action]');
        cfg.onAction?.(actionEl ? actionEl.dataset.action : 'open', item, actionEl);
    });

    // Las tarjetas son accesibles con teclado (Enter / Espacio)
    grid.addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-key][tabindex]')) {
            e.preventDefault();
            e.target.click();
        }
    });

    let lastSize = getPageSize();
    window.addEventListener('resize', () => {
        if (getPageSize() === lastSize) return;
        lastSize = getPageSize();
        state.page = 1;
        render();
    });

    return {
        /** Vuelve a evaluar filtros (explorador, favoritos…). */
        refresh,
        /** Vuelve a pintar todo (idioma, favoritos) conservando filtros y página. */
        rerender() {
            renderPills();
            refresh({ resetPage: false });
        },
        init() {
            renderPills();
            refresh();
        },
        get total() { return state.filtered.length; }
    };
}
