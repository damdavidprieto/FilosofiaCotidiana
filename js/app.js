/**
 * Filosofía Cotidiana · punto de entrada
 *
 * Orquesta los componentes; no contiene lógica reutilizable propia.
 *   data/        taxonomía, autores (con maestros), conceptos y paradojas (es + pt)
 *   core/        utils (Store, esc) · i18n · atlas (índices y linaje) · CollectionView
 *   features/    Theme · Favorites · Journal · Explorer · Lineage · Dialogs
 */

const App = {
    concepts: null,          // CollectionView de conceptos
    paradoxes: null,         // CollectionView de paradojas
    current: null,           // concepto destacado
    favoritesOnly: false,
    streak: 0
};

const $ = id => document.getElementById(id);
const conceptById = new Map(Atlas.concepts.map(c => [c.id, c]));
const paradoxById = new Map(Atlas.paradoxes.map(p => [p.id, p]));
const authorName = id => I18n.pick(Atlas.philosophers.get(id).name);
const schoolName = id => I18n.pick(Atlas.schools.get(id).name);

/** Compara títulos ignorando mayúsculas, acentos y artículo inicial. */
const normalizeTitle = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/^(el|la|los|las)\s+/, '').trim();

/** Convierte un favorito guardado por versiones anteriores (título en español) en un id actual. */
function legacyConceptId(ref) {
    if (conceptById.has(ref)) return ref;
    const wanted = normalizeTitle(String(ref));
    return Atlas.concepts.find(c => normalizeTitle(c.es.title) === wanted)?.id;
}

// ============= TARJETAS =============
function conceptCard(x, c) {
    const author = Atlas.philosophers.get(c.author);
    const isQuote = c.type === 'q';
    return `
        <article class="concept-card" data-key="${esc(c.id)}">
            <div class="card-top">
                <span class="category-badge">${esc(schoolName(c.school))}</span>
                <span class="kind-badge ${isQuote ? 'q' : 'i'}">${esc(t(isQuote ? 'lbl_quote' : 'lbl_idea'))}</span>
            </div>
            <h3 class="concept-title">${esc(x.title)}</h3>
            <p class="philosopher">${esc(authorName(c.author))} <span class="muted">(${esc(Atlas.dates(author))})</span></p>
            ${isQuote ? `<p class="quote">“${esc(x.quote)}”</p>` : `<p class="idea">${esc(x.quote)}</p>`}
            <p class="source">${esc(c.source)}</p>
            <div class="application"><p>${esc(x.application)}</p></div>
            <div class="card-actions">
                <button class="btn-icon" data-action="favorite" title="${esc(t('btn_favorite_title'))}" aria-label="${esc(t('btn_favorite_title') + ': ' + x.title)}" aria-pressed="${Favorites.has(c.id)}">${Favorites.has(c.id) ? '♥' : '♡'}</button>
                <button class="btn-icon" data-action="detail" title="${esc(t('btn_read_more'))}" aria-label="${esc(t('btn_read_more') + ': ' + x.title)}">📖</button>
            </div>
        </article>`;
}

function paradoxCard(x, p) {
    const preview = x.explanation.length > 130 ? x.explanation.slice(0, 130) + '…' : x.explanation;
    const topic = PARADOX_TOPICS.find(tp => tp.id === p.topic);
    return `
        <article class="paradox-card" data-key="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(x.title)}">
            <h3>${esc(x.title)}</h3>
            <p class="paradox-preview">${esc(preview)}</p>
            <span class="paradox-category-label">${esc(I18n.pick(topic.name))}</span>
        </article>`;
}

// ============= CONCEPTO DESTACADO =============
function setFeatured(concept) {
    App.current = concept;
    renderFeatured();
    renderJournalPrompt();
}

function renderFeatured() {
    const c = App.current;
    if (!c) return;
    const x = Atlas.text(c);
    $('featured-title').textContent = x.title;
    $('featured-quote').textContent = c.type === 'q' ? `“${x.quote}”` : x.quote;
    $('featured-quote').classList.toggle('is-idea', c.type !== 'q');
    $('featured-philosopher').textContent = `${authorName(c.author)} (${Atlas.dates(Atlas.philosophers.get(c.author))})`;
    $('featured-school').textContent = schoolName(c.school);
    $('featured-application').textContent = x.application;
    renderFeaturedFavorite();
}

function renderFeaturedFavorite() {
    const btn = $('favorite-btn');
    if (!btn || !App.current) return;
    const fav = Favorites.has(App.current.id);
    btn.textContent = t(fav ? 'btn_favorite_active' : 'btn_favorite');
    btn.classList.toggle('active', fav);
}

const randomConcept = () => Atlas.concepts[Math.floor(Math.random() * Atlas.concepts.length)];

function toggleFavorite(id) {
    Favorites.toggle(id);
    renderStats();
    renderFeaturedFavorite();
    App.concepts.rerender();
    Dialogs.rerender();
}

// ============= BITÁCORA =============
function renderJournalPrompt() {
    const prompt = App.current ? Atlas.text(App.current).prompt : null;
    $('journal-prompt').textContent = prompt ? t('journal_prompt_label', { prompt }) : t('journal_prompt');
}

function renderJournal() {
    Journal.renderHistory($('journal-entries-list'), ref => {
        const concept = conceptById.get(ref) || conceptById.get(legacyConceptId(ref));
        return concept ? Atlas.text(concept).title : ref;
    });
}

function saveJournalEntry() {
    const input = $('journal-entry');
    if (!Journal.add(input.value, App.current?.id)) {
        alert(t('alert_write_reflection'));
        return;
    }
    input.value = '';
    renderJournal();
    renderStats();
    alert(t('alert_reflection_saved'));
}

function reflectOn(concept) {
    setFeatured(concept);
    const section = $('bitacora');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => $('journal-entry').focus({ preventScroll: true }), 400);
}

// ============= ESTADÍSTICAS Y RACHA =============
function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = Store.getRaw(STORE_KEYS.lastVisit);
    App.streak = parseInt(Store.getRaw(STORE_KEYS.streak, '0'), 10) || 0;

    if (lastVisit && new Date(lastVisit).toDateString() === today && App.streak > 0) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const visitedYesterday = lastVisit && new Date(lastVisit).toDateString() === yesterday.toDateString();

    App.streak = visitedYesterday ? App.streak + 1 : 1;
    Store.setRaw(STORE_KEYS.lastVisit, new Date().toISOString());
    Store.setRaw(STORE_KEYS.streak, App.streak);
}

function renderStats() {
    $('concepts-count').textContent = Atlas.concepts.length;
    $('categories-count').textContent = SCHOOLS.filter(s => Atlas.conceptCount.school(s.id) > 0).length;
    $('streak-count').textContent = `${App.streak} ${t('stat_days')}`;
    $('favorites-count').textContent = Favorites.count;
    const btn = $('favorites-only-btn');
    btn.classList.toggle('active', App.favoritesOnly);
    btn.setAttribute('aria-pressed', App.favoritesOnly);
    btn.textContent = `${t('favorites_only')} (${Favorites.count})`;
}

// ============= ARRANQUE =============
const ACTIONS = {
    'toggle-theme': () => Theme.toggle(),
    'set-lang': el => I18n.set(el.dataset.lang),
    'featured-next': () => setFeatured(randomConcept()),
    'featured-favorite': () => App.current && toggleFavorite(App.current.id),
    'featured-detail': () => App.current && Dialogs.openConcept(App.current),
    'save-journal': saveJournalEntry,
    'toggle-history': () => { $('journal-history').hidden = !$('journal-history').hidden; },
    'toggle-favorites-only': () => {
        App.favoritesOnly = !App.favoritesOnly;
        renderStats();
        App.concepts.refresh();
    },
    'scroll-top': () => window.scrollTo({ top: 0, behavior: 'smooth' })
};

function init() {
    Theme.init();
    Favorites.init(legacyConceptId);
    Journal.init();
    I18n.apply();

    App.concepts = createCollectionView({
        name: 'concepts',
        items: Atlas.concepts,
        localize: Atlas.text,
        searchText: (x, c) => [x.title, x.quote, x.application, c.source, c.tags.join(' '),
            authorName(c.author), schoolName(c.school), Atlas.philosophers.get(c.author).name.es].join(' '),
        predicate: () => {
            const explorer = Explorer.predicate();
            return c => explorer(c) && (!App.favoritesOnly || Favorites.has(c.id));
        },
        emptyText: () => t(App.favoritesOnly && !Favorites.count ? 'no_favorites_yet' : 'no_concepts_found'),
        renderCard: conceptCard,
        onAction(action, concept) {
            if (action === 'favorite') toggleFavorite(concept.id);
            else Dialogs.openConcept(concept);
        }
    });

    App.paradoxes = createCollectionView({
        name: 'paradoxes',
        items: Atlas.paradoxes,
        localize: Atlas.text,
        searchText: (x, p) => [x.title, x.explanation, x.reflection, p.source].join(' '),
        facet: {
            get: p => p.topic,
            label: id => I18n.pick(PARADOX_TOPICS.find(tp => tp.id === id).name),
            allKey: 'filter_all_paradoxes'
        },
        pillClass: 'paradox-category-pill',
        emptyText: () => t('no_paradoxes_found'),
        renderCard: paradoxCard,
        onAction: (action, paradox) => Dialogs.openParadox(paradox)
    });

    Explorer.init({
        onChange: () => App.concepts.refresh(),
        openParadox: id => Dialogs.openParadox(paradoxById.get(id))
    });

    Dialogs.init({
        onFavorite: concept => toggleFavorite(concept.id),
        onReflect: reflectOn,
        onAuthor: id => Explorer.showAuthor(id),
        onSchool: id => Explorer.showSchool(id)
    });

    document.addEventListener('click', e => {
        const el = e.target.closest('[data-action]');
        const handler = el && ACTIONS[el.dataset.action];
        if (handler) handler(el);
    });

    I18n.onChange(() => {
        App.concepts.rerender();
        App.paradoxes.rerender();
        Explorer.rerender();
        renderFeatured();
        renderJournalPrompt();
        renderJournal();
        renderStats();
        Dialogs.rerender();
    });

    updateStreak();
    App.concepts.init();
    App.paradoxes.init();
    setFeatured(randomConcept());
    renderJournal();
    renderStats();
}

document.addEventListener('DOMContentLoaded', init);
