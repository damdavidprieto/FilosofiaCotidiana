/**
 * Feature · diálogos de detalle (concepto y paradoja)
 *
 * Usan el elemento nativo <dialog>: foco atrapado, cierre con Esc y accesible por
 * teclado. También se cierran al pulsar fuera del cuadro o en [data-close].
 */
const Dialogs = (() => {
    const pickName = p => I18n.pick(p.name);
    let conceptEl, paradoxEl, handlers = {}, currentConcept = null, currentParadox = null;

    function bind(dialog) {
        dialog.addEventListener('click', e => {
            if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
        });
    }

    function show(dialog) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
    }

    function conceptHtml(c) {
        const x = Atlas.text(c);
        const author = Atlas.philosophers.get(c.author);
        const school = Atlas.schools.get(c.school);
        const isQuote = c.type === 'q';
        const note = c.note ? I18n.pick(c.note) : null;
        const fav = Favorites.has(c.id);
        return `
            <header>
                <p class="kind-line"><span class="kind-badge ${isQuote ? 'q' : 'i'}">${esc(t(isQuote ? 'lbl_quote' : 'lbl_idea'))}</span>
                   <span class="muted">${esc(t('lbl_level'))}: ${esc(t('level_' + c.level))}</span></p>
                <h2 id="concept-dialog-title">${esc(x.title)}</h2>
                <p class="author-line"><button class="chip" data-author="${author.id}">${esc(pickName(author))}</button>
                   <span class="muted">${esc(Atlas.dates(author))}</span>
                   <button class="chip" data-school="${school.id}">${esc(I18n.pick(school.name))}</button></p>
            </header>
            ${isQuote ? `<blockquote class="dialog-quote">“${esc(x.quote)}”</blockquote>` : `<p class="dialog-idea">${esc(x.quote)}</p>`}
            <p class="source-line"><strong>${esc(t('lbl_source'))}:</strong> ${esc(c.source)}<br>
               <span class="muted">${esc(t(isQuote ? 'quote_translated' : 'idea_not_quote'))}</span></p>
            ${note ? `<aside class="note"><strong>${esc(t('lbl_note'))}.</strong> ${esc(note)}</aside>` : ''}
            <section><h3>${esc(t('lbl_application'))}</h3><p>${esc(x.application)}</p></section>
            <section><h3>${esc(t('lbl_prompt'))}</h3><p>${esc(x.prompt)}</p></section>
            <p class="tags">${c.tags.map(tag => `<span class="tag">#${esc(tag)}</span>`).join(' ')}</p>
            <footer class="dialog-actions">
                <button class="btn-secondary" data-favorite>${fav ? '♥' : '♡'} ${esc(t('btn_favorite_title'))}</button>
                <button class="btn-primary" data-reflect>${esc(t('btn_reflect'))}</button>
                <button class="btn-secondary" data-close>${esc(t('btn_close'))}</button>
            </footer>`;
    }

    function paradoxHtml(p) {
        const x = Atlas.text(p);
        const author = p.authorId ? Atlas.philosophers.get(p.authorId) : null;
        const note = p.note ? I18n.pick(p.note) : null;
        return `
            <header><h2 id="paradox-dialog-title">${esc(x.title)}</h2>
                <p class="muted">${esc(I18n.pick(PARADOX_TOPICS.find(tp => tp.id === p.topic).name))}</p></header>
            <section><h3>${esc(t('paradox_dilemma'))}</h3><p>${esc(x.explanation)}</p></section>
            <section><h3>${esc(t('paradox_reflection'))}</h3><p>${esc(x.reflection)}</p></section>
            <section><h3>${esc(t('paradox_application'))}</h3><p>${esc(x.application)}</p></section>
            <p class="source-line"><strong>${esc(t('paradox_origin'))}:</strong> ${esc(p.source)}
               ${author ? `<br><button class="chip" data-author="${author.id}">${esc(pickName(author))}</button>` : ''}</p>
            ${note ? `<aside class="note"><strong>${esc(t('lbl_note'))}.</strong> ${esc(note)}</aside>` : ''}
            <footer class="dialog-actions"><button class="btn-secondary" data-close>${esc(t('btn_close'))}</button></footer>`;
    }

    return {
        /** handlers: { onFavorite(concept), onReflect(concept), onAuthor(id), onSchool(id) } */
        init(options) {
            handlers = options;
            conceptEl = document.getElementById('concept-dialog');
            paradoxEl = document.getElementById('paradox-dialog');
            [conceptEl, paradoxEl].forEach(bind);

            conceptEl.addEventListener('click', e => {
                if (!currentConcept) return;
                const author = e.target.closest('[data-author]'), school = e.target.closest('[data-school]');
                if (author) { conceptEl.close(); handlers.onAuthor(author.dataset.author); }
                else if (school) { conceptEl.close(); handlers.onSchool(school.dataset.school); }
                else if (e.target.closest('[data-reflect]')) { conceptEl.close(); handlers.onReflect(currentConcept); }
                else if (e.target.closest('[data-favorite]')) { handlers.onFavorite(currentConcept); this.rerender(); }
            });
            paradoxEl.addEventListener('click', e => {
                const author = e.target.closest('[data-author]');
                if (author) { paradoxEl.close(); handlers.onAuthor(author.dataset.author); }
            });
            conceptEl.addEventListener('close', () => { currentConcept = null; });
            paradoxEl.addEventListener('close', () => { currentParadox = null; });
        },
        openConcept(concept) {
            currentConcept = concept;
            conceptEl.innerHTML = `<div class="dialog-body">${conceptHtml(concept)}</div>`;
            show(conceptEl);
        },
        openParadox(paradox) {
            currentParadox = paradox;
            paradoxEl.innerHTML = `<div class="dialog-body">${paradoxHtml(paradox)}</div>`;
            show(paradoxEl);
        },
        /** Repinta lo que esté abierto (cambio de idioma, favorito). */
        rerender() {
            if (currentConcept && conceptEl.open) conceptEl.innerHTML = `<div class="dialog-body">${conceptHtml(currentConcept)}</div>`;
            if (currentParadox && paradoxEl.open) paradoxEl.innerHTML = `<div class="dialog-body">${paradoxHtml(currentParadox)}</div>`;
        }
    };
})();
