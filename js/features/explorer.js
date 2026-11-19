/**
 * Feature · explorador por corriente, época y autor (+ mapa de linaje)
 *
 * Mantiene los filtros activos (corriente, época, autor) y la ficha de contexto
 * de lo último seleccionado. Los filtros los consume la vista de conceptos mediante
 * Explorer.predicate(); los chips de filtros activos se pintan en
 * [data-role="active-filters"] (sección de conceptos).
 *
 * Marcado: <section data-view="explore"> con [data-action="explore-tab"][data-tab],
 * [data-role="hint"], [data-role="panel"] y [data-role="context"].
 */
const Explorer = (() => {
    const state = {
        tab: 'schools',
        focus: null,                       // { type: 'school'|'era'|'author', id }
        filters: { school: null, era: null, author: null },
        authorQuery: ''
    };
    let root, panel, context, hint, chipsEl, onChange, openParadox, lineage;

    const pickName = p => I18n.pick(p.name);
    const authorsSorted = () =>
        [...PHILOSOPHERS].sort((a, b) => pickName(a).localeCompare(pickName(b), I18n.locale));
    const countLabel = n => (n === 1 ? t('n_concepts_one') : t('n_concepts', { n }));

    const chip = (type, id, label) =>
        `<button class="chip" data-pick="${type}" data-id="${esc(id)}">${esc(label)}</button>`;
    const authorChip = id => chip('author', id, pickName(Atlas.philosophers.get(id)));
    const schoolChip = id => chip('school', id, I18n.pick(Atlas.schools.get(id).name));
    const eraChip = id => chip('era', id, I18n.pick(Atlas.eras.get(id).name));

    // ---------- paneles ----------
    function schoolsPanel() {
        return LANES.map(lane => {
            const cards = SCHOOLS.filter(s => s.lane === lane.id).map(s => {
                const n = Atlas.conceptCount.school(s.id);
                return `<button class="explore-card${state.filters.school === s.id ? ' active' : ''}" data-pick="school" data-id="${s.id}">
                    <strong>${esc(I18n.pick(s.name))}</strong>
                    <span class="muted">${esc(I18n.pick(s.period))}</span>
                    <span class="badge">${esc(countLabel(n))}</span></button>`;
            }).join('');
            return `<h3 class="group-title">${esc(I18n.pick(lane.name))}</h3><div class="card-grid">${cards}</div>`;
        }).join('');
    }

    function erasPanel() {
        return `<div class="card-grid eras">` + ERAS.map(e => `
            <button class="explore-card era${state.filters.era === e.id ? ' active' : ''}" data-pick="era" data-id="${e.id}">
                <strong>${esc(I18n.pick(e.name))}</strong>
                <span class="muted">${esc(I18n.pick(e.range))}</span>
                <span>${esc(I18n.pick(e.desc))}</span>
                <span class="badge">${esc(countLabel(Atlas.conceptCount.era(e.id)))}</span>
            </button>`).join('') + `</div>`;
    }

    function authorList() {
        const q = state.authorQuery.toLowerCase();
        const list = authorsSorted().filter(p => !q || pickName(p).toLowerCase().includes(q));
        return list.map(p => {
            const n = Atlas.conceptCount.author(p.id);
            return `<button class="author-item${state.filters.author === p.id ? ' active' : ''}" data-pick="author" data-id="${p.id}">
                <strong>${esc(pickName(p))}</strong>
                <span class="muted">${esc(Atlas.dates(p))}</span>
                ${n ? `<span class="badge">${n}</span>` : ''}</button>`;
        }).join('') || `<p class="empty-state">—</p>`;
    }

    function authorsPanel() {
        return `<input type="search" class="search-input" data-role="author-search" placeholder="${esc(t('search_authors'))}" value="${esc(state.authorQuery)}">
            <div class="author-list" data-role="author-list">${authorList()}</div>`;
    }

    function lineagePanel() {
        return `<div class="lineage-scroll" data-role="lineage"></div>
            <p class="legend"><span class="key teacher"></span>${esc(t('legend_teacher'))}
              <span class="key influence"></span>${esc(t('legend_influence'))}
              <span class="muted">· ${esc(t('lineage_note'))}</span></p>`;
    }

    // ---------- ficha de contexto ----------
    function relationBlock(label, ids) {
        return ids.length ? `<div class="relation"><h4>${esc(label)}</h4><div class="chips">${ids.map(authorChip).join('')}</div></div>` : '';
    }

    function seeButton(type, id, n) {
        if (!n) return `<p class="muted">${esc(t('no_concepts_yet'))}</p>`;
        const label = n === 1 ? t('btn_see_concept_one') : t('btn_see_concepts', { n });
        return `<button class="btn-primary" data-see="${type}" data-id="${id}">${esc(label)}</button>`;
    }

    function authorContext(p) {
        const chain = Atlas.teacherChain(p.id);
        const students = Atlas.studentsOf(p.id), influenced = Atlas.influencedOf(p.id);
        const paradoxes = PARADOXES.filter(x => x.authorId === p.id);
        const relations = relationBlock(t('lbl_teachers'), p.teachers) + relationBlock(t('lbl_students'), students)
            + relationBlock(t('lbl_influences'), p.influences) + relationBlock(t('lbl_influenced'), influenced);
        return `<header><h3>${esc(pickName(p))}</h3>
              <p class="muted">${esc(Atlas.dates(p))} · ${eraChip(p.era)}</p>
              <div class="chips">${p.schools.map(schoolChip).join('')}</div></header>
            <p>${esc(I18n.pick(p.bio))}</p>
            ${chain.length > 1 ? `<div class="relation"><h4>${esc(t('lbl_teacher_chain'))}</h4>
                <ol class="chain">${chain.map(id => `<li${id === p.id ? ' class="current"' : ''}>${id === p.id ? esc(pickName(p)) : authorChip(id)}</li>`).join('')}</ol></div>` : ''}
            ${relations || `<p class="muted">${esc(t('lbl_none'))}</p>`}
            ${paradoxes.length ? `<div class="relation"><h4>${esc(t('lbl_paradoxes_of'))}</h4><div class="chips">${
                paradoxes.map(x => `<button class="chip" data-paradox="${x.id}">${esc(Atlas.text(x).title)}</button>`).join('')}</div></div>` : ''}
            ${seeButton('author', p.id, Atlas.conceptCount.author(p.id))}`;
    }

    function schoolContext(s) {
        const authors = PHILOSOPHERS.filter(p => p.schools.includes(s.id)).sort((a, b) => a.born - b.born);
        return `<header><h3>${esc(I18n.pick(s.name))}</h3><p class="muted">${esc(I18n.pick(s.period))}</p></header>
            <p>${esc(I18n.pick(s.desc))}</p>
            <div class="relation"><h4>${esc(t('lbl_key_authors'))}</h4><div class="chips">${authors.map(p => authorChip(p.id)).join('')}</div></div>
            ${seeButton('school', s.id, Atlas.conceptCount.school(s.id))}`;
    }

    function eraContext(e) {
        return `<header><h3>${esc(I18n.pick(e.name))}</h3><p class="muted">${esc(I18n.pick(e.range))}</p></header>
            <p>${esc(I18n.pick(e.desc))}</p>
            ${seeButton('era', e.id, Atlas.conceptCount.era(e.id))}`;
    }

    function renderContext() {
        const f = state.focus;
        let html = '';
        if (f?.type === 'author') html = authorContext(Atlas.philosophers.get(f.id));
        if (f?.type === 'school') html = schoolContext(Atlas.schools.get(f.id));
        if (f?.type === 'era') html = eraContext(Atlas.eras.get(f.id));
        context.innerHTML = html ? `<article class="context-card">${html}</article>` : '';
    }

    // ---------- chips de filtros activos ----------
    function renderChips() {
        if (!chipsEl) return;
        const f = state.filters;
        const items = [];
        if (f.school) items.push(['school', I18n.pick(Atlas.schools.get(f.school).name)]);
        if (f.era) items.push(['era', I18n.pick(Atlas.eras.get(f.era).name)]);
        if (f.author) items.push(['author', pickName(Atlas.philosophers.get(f.author))]);
        chipsEl.hidden = items.length === 0;
        chipsEl.innerHTML = items.length
            ? `<span class="muted">${esc(t('filtering_by'))}</span>` +
              items.map(([type, label]) => `<button class="chip removable" data-remove="${type}">${esc(label)} ✕</button>`).join('') +
              `<button class="link-btn" data-remove="all">${esc(t('clear_filters'))}</button>`
            : '';
    }

    // ---------- render general ----------
    function renderPanel() {
        const render = { schools: schoolsPanel, eras: erasPanel, authors: authorsPanel, lineage: lineagePanel }[state.tab];
        panel.innerHTML = render();
        hint.textContent = t('hint_' + state.tab);
        root.querySelectorAll('[data-action="explore-tab"]').forEach(btn => {
            const on = btn.dataset.tab === state.tab;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-selected', on);
        });
        if (state.tab === 'lineage') {
            lineage = Lineage.mount(panel.querySelector('[data-role="lineage"]'), id => select('author', id));
            if (state.focus?.type === 'author') lineage.select(state.focus.id, { scroll: true });
        }
    }

    function renderAll() {
        renderPanel();
        renderContext();
        renderChips();
    }

    // ---------- selección ----------
    function setFilter(type, id, force) {
        const f = state.filters;
        const same = !force && f[type] === id;
        if (type === 'author') {
            f.author = same ? null : id;
            if (f.author) { f.school = null; f.era = null; }
        } else {
            f[type] = same ? null : id;
            if (f[type]) f.author = null;
        }
        state.focus = f[type] ? { type, id } : null;
    }

    /** En la pestaña del mapa no se vuelve a dibujar el SVG (se perdería el desplazamiento). */
    function refresh() {
        if (state.tab === 'lineage' && lineage) {
            renderContext();
            renderChips();
            lineage.select(state.focus?.type === 'author' ? state.focus.id : null);
        } else {
            renderAll();
        }
    }

    function select(type, id, force = false) {
        setFilter(type, id, force);
        refresh();
        onChange?.();
    }

    function remove(type) {
        if (type === 'all') Object.keys(state.filters).forEach(k => { state.filters[k] = null; });
        else state.filters[type] = null;
        if (type === 'all' || state.focus?.type === type) state.focus = null;
        refresh();
        onChange?.();
    }

    function scrollToConcepts() {
        document.querySelector('[data-view="concepts"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return {
        init(options) {
            ({ onChange, openParadox } = options);
            root = document.querySelector('[data-view="explore"]');
            if (!root) return;
            panel = root.querySelector('[data-role="panel"]');
            context = root.querySelector('[data-role="context"]');
            hint = root.querySelector('[data-role="hint"]');
            chipsEl = document.querySelector('[data-role="active-filters"]');

            root.addEventListener('click', e => {
                const tab = e.target.closest('[data-action="explore-tab"]');
                if (tab) { state.tab = tab.dataset.tab; renderPanel(); return; }
                const pick = e.target.closest('[data-pick]');
                if (pick) return select(pick.dataset.pick, pick.dataset.id);
                const see = e.target.closest('[data-see]');
                if (see) return scrollToConcepts();
                const par = e.target.closest('[data-paradox]');
                if (par) openParadox?.(par.dataset.paradox);
            });
            root.addEventListener('input', e => {
                if (!e.target.matches('[data-role="author-search"]')) return;
                state.authorQuery = e.target.value.trim();
                panel.querySelector('[data-role="author-list"]').innerHTML = authorList();
            });
            chipsEl?.addEventListener('click', e => {
                const btn = e.target.closest('[data-remove]');
                if (btn) remove(btn.dataset.remove);
            });
            renderAll();
        },
        rerender: () => root && renderAll(),
        /** Filtro para la vista de conceptos. */
        predicate() {
            const f = state.filters;
            return c => (!f.school || c.school === f.school)
                && (!f.era || Atlas.eraOfConcept(c) === f.era)
                && (!f.author || c.author === f.author);
        },
        /** Abre un autor desde fuera (tarjetas, diálogo) y lleva a la sección. */
        showAuthor(id) {
            if (state.tab !== 'lineage') state.tab = 'authors';
            select('author', id, true);
            root?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        showSchool(id) {
            state.tab = 'schools';
            select('school', id, true);
            root?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        get hasFilters() { return Object.values(state.filters).some(Boolean); }
    };
})();
