/**
 * Core · CollectionView
 *
 * Componente único que usan conceptos y paradojas: búsqueda + filtro por
 * categoría (pills) + rejilla paginada. Solo se renderiza la página actual,
 * así el DOM nunca crece con el tamaño de la base de datos.
 *
 * Marcado esperado dentro de <… data-view="nombre">:
 *   [data-role="search"]   input de búsqueda
 *   [data-role="pills"]    contenedor de los filtros de categoría
 *   [data-role="grid"]     rejilla de tarjetas
 *   [data-role="pager"]    contiene [data-pager="prev|next"] y [data-role="indicator"]
 *
 * Configuración:
 *   name          nombre del data-view
 *   type          tipo de contenido en I18n ('concepts', 'paradoxes')
 *   items         datos originales (en español)
 *   searchFields  campos de texto (ya localizados) donde buscar
 *   pillClass     clase CSS de los filtros
 *   allKey        clave i18n de la pill "Todos"
 *   emptyKey      clave i18n del mensaje sin resultados
 *   renderCard    (localizado, original) => HTML  (la tarjeta debe llevar data-key)
 *   onAction      (acción, original, elemento) => void; 'open' si se pulsa la tarjeta
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
    const grid = part('grid');
    const pills = part('pills');
    const search = part('search');
    const pager = part('pager');

    const byKey = new Map(cfg.items.map(item => [item.title, item]));
    const categories = [...new Set(cfg.items.map(item => item.category))];
    const state = { category: null, query: '', page: 1, filtered: cfg.items };

    const pageSize = getPageSize;
    const totalPages = () => Math.max(1, Math.ceil(state.filtered.length / pageSize()));

    function matches(item) {
        if (state.category && item.category !== state.category) return false;
        if (!state.query) return true;
        const local = I18n.localize(cfg.type, item);
        const haystack = [
            ...cfg.searchFields.map(field => local[field]),
            item.title, item.philosopher, ...(item.tags || [])
        ].join(' ').toLowerCase();
        return haystack.includes(state.query);
    }

    function renderPills() {
        if (!pills) return;
        const pill = (value, label) =>
            `<button class="${cfg.pillClass}${state.category === value ? ' active' : ''}" ` +
            `data-category="${esc(value ?? '')}">${esc(label)}</button>`;
        pills.innerHTML = pill(null, t(cfg.allKey)) + categories
            .map(cat => pill(cat, I18n.localizeField(cfg.type, 'category', cat)))
            .join('');
    }

    function renderPager() {
        if (!pager) return;
        const pages = totalPages();
        pager.hidden = state.filtered.length === 0;
        pager.querySelector('[data-pager="prev"]').disabled = state.page <= 1;
        pager.querySelector('[data-pager="next"]').disabled = state.page >= pages;
        pager.querySelector('[data-role="indicator"]').textContent =
            t('pagination_page', { page: state.page, total: pages });
    }

    function render() {
        state.page = Math.min(state.page, totalPages());
        const start = (state.page - 1) * pageSize();
        const pageItems = state.filtered.slice(start, start + pageSize());

        grid.innerHTML = pageItems.length
            ? pageItems.map(item => cfg.renderCard(I18n.localize(cfg.type, item), item)).join('')
            : `<p class="empty-state">${esc(t(cfg.emptyKey))}</p>`;
        renderPager();
    }

    function refresh({ resetPage = true } = {}) {
        state.filtered = cfg.items.filter(matches);
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
        const btn = e.target.closest('[data-category]');
        if (!btn) return;
        state.category = btn.dataset.category || null;
        renderPills();
        refresh();
    });

    pager?.addEventListener('click', e => {
        const btn = e.target.closest('[data-pager]');
        if (!btn) return;
        goTo(state.page + (btn.dataset.pager === 'next' ? 1 : -1));
    });

    grid.addEventListener('click', e => {
        const card = e.target.closest('[data-key]');
        const item = card && byKey.get(card.dataset.key);
        if (!item) return;
        const actionEl = e.target.closest('[data-action]');
        cfg.onAction?.(actionEl ? actionEl.dataset.action : 'open', item, actionEl);
    });

    let lastSize = pageSize();
    window.addEventListener('resize', () => {
        if (pageSize() === lastSize) return;
        lastSize = pageSize();
        state.page = 1;
        render();
    });

    return {
        items: cfg.items,
        categories,
        /** Vuelve a pintar todo (cambio de idioma, favoritos...) conservando la página. */
        rerender() {
            renderPills();
            refresh({ resetPage: false });
        },
        init() {
            renderPills();
            refresh();
        }
    };
}
