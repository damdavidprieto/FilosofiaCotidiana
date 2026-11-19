/**
 * Filosofía Cotidiana · punto de entrada
 *
 * Orquesta los componentes; no contiene lógica reutilizable propia.
 *   core/        utils (Store, esc) · i18n · CollectionView
 *   features/    Theme · Favorites · Journal
 *   data/        conceptos y paradojas (español, idioma de origen)
 *   i18n/        textos de interfaz y traducciones de contenido
 */

const App = {
    concepts: null,       // CollectionView de conceptos
    paradoxes: null,      // CollectionView de paradojas
    currentConcept: null, // concepto destacado (original en español)
    openParadox: null,    // paradoja abierta en el detalle
    streak: 0
};

const $ = id => document.getElementById(id);
const localizeConcept = c => I18n.localize('concepts', c);
const localizeParadox = p => I18n.localize('paradoxes', p);

// ============= TARJETAS =============
function conceptCard(c, original) {
    const fav = Favorites.has(original.title);
    return `
        <div class="concept-card" data-key="${esc(original.title)}">
            <span class="category-badge">${esc(c.category)}</span>
            <h3 class="concept-title">${esc(c.title)}</h3>
            <p class="philosopher">${esc(c.philosopher)}${c.era ? ` (${esc(c.era)})` : ''}</p>
            <p class="quote">"${esc(c.quote)}"</p>
            <div class="application">${esc(c.application)}</div>
            <div class="card-actions">
                <button class="btn-icon" data-action="favorite" title="${esc(t('btn_favorite_title'))}">${fav ? '♥' : '♡'}</button>
                <button class="btn-icon" data-action="detail" title="${esc(t('btn_read_more'))}">📖</button>
            </div>
        </div>`;
}

function paradoxCard(p, original) {
    const preview = p.explanation.length > 120 ? p.explanation.slice(0, 120) + '…' : p.explanation;
    return `
        <div class="paradox-card" data-key="${esc(original.title)}">
            <h3>${esc(p.title)}</h3>
            <p class="paradox-preview">${esc(preview)}</p>
            <span class="paradox-category-label">${esc(p.category)}</span>
        </div>`;
}

// ============= CONCEPTO DESTACADO =============
function setFeatured(concept) {
    App.currentConcept = concept;
    renderFeatured();
    renderJournalPrompt();
}

function renderFeatured() {
    const original = App.currentConcept;
    if (!original) return;
    const c = localizeConcept(original);
    $('featured-title').textContent = c.title;
    $('featured-quote').textContent = `"${c.quote}"`;
    $('featured-philosopher').textContent = c.philosopher + (c.era ? ` (${c.era})` : '');
    $('featured-school').textContent = c.category;
    $('featured-application').textContent = c.application;
    renderFeaturedFavorite();
}

function renderFeaturedFavorite() {
    const btn = $('favorite-btn');
    if (!btn || !App.currentConcept) return;
    const fav = Favorites.has(App.currentConcept.title);
    btn.textContent = t(fav ? 'btn_favorite_active' : 'btn_favorite');
    btn.classList.toggle('active', fav);
}

function randomConcept() {
    const all = PHILOSOPHY_DATABASE.concepts;
    return all[Math.floor(Math.random() * all.length)];
}

function toggleFavorite(title) {
    Favorites.toggle(title);
    renderStats();
    renderFeaturedFavorite();
    App.concepts.rerender();
}

// ============= PARADOJAS (detalle) =============
function renderParadoxDetail() {
    const original = App.openParadox;
    if (!original) return;
    const p = localizeParadox(original);
    $('paradox-title-expanded').textContent = p.title;
    $('paradox-explanation-expanded').textContent = p.explanation;
    $('paradox-reflection-expanded').textContent = p.reflection;
    $('paradox-application-expanded').textContent = p.application;
    $('paradox-philosopher-expanded').textContent = `${p.philosopher} • ${p.category}`;
}

function showParadox(original) {
    App.openParadox = original;
    renderParadoxDetail();
    const panel = $('featured-paradox');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeParadox() {
    App.openParadox = null;
    $('featured-paradox').hidden = true;
}

// ============= BITÁCORA =============
function renderJournalPrompt() {
    const prompt = App.currentConcept?.prompt;
    const useConcept = prompt && I18n.hasTranslation('concepts', 'prompt', prompt);
    $('journal-prompt').textContent = useConcept
        ? t('journal_prompt_label', { prompt })
        : t('journal_prompt');
}

function renderJournal() {
    Journal.renderHistory($('journal-entries-list'), title => localizeConcept({ title }).title);
}

function saveJournalEntry() {
    const input = $('journal-entry');
    if (!Journal.add(input.value, App.currentConcept?.title)) {
        alert(t('alert_write_reflection'));
        return;
    }
    input.value = '';
    renderJournal();
    renderStats();
    alert(t('alert_reflection_saved'));
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
    $('concepts-count').textContent = App.concepts.items.length;
    $('categories-count').textContent = App.concepts.categories.length;
    $('streak-count').textContent = `${App.streak} ${t('stat_days')}`;
    $('favorites-count').textContent = Favorites.count;
}

// ============= ARRANQUE =============
const ACTIONS = {
    'toggle-theme': () => Theme.toggle(),
    'set-lang': el => I18n.set(el.dataset.lang),
    'featured-next': () => setFeatured(randomConcept()),
    'featured-favorite': () => App.currentConcept && toggleFavorite(App.currentConcept.title),
    'save-journal': saveJournalEntry,
    'toggle-history': () => { $('journal-history').hidden = !$('journal-history').hidden; },
    'close-paradox': closeParadox
};

function init() {
    Theme.init();
    Favorites.init();
    Journal.init();
    I18n.apply();

    App.concepts = createCollectionView({
        name: 'concepts',
        type: 'concepts',
        items: PHILOSOPHY_DATABASE.concepts,
        searchFields: ['title', 'quote', 'category'],
        pillClass: 'pill',
        allKey: 'filter_all_concepts',
        emptyKey: 'no_concepts_found',
        renderCard: conceptCard,
        onAction(action, concept) {
            if (action === 'favorite') toggleFavorite(concept.title);
            if (action === 'detail') {
                setFeatured(concept);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });

    App.paradoxes = createCollectionView({
        name: 'paradoxes',
        type: 'paradoxes',
        items: PARADOXES_DATABASE,
        searchFields: ['title', 'explanation', 'category'],
        pillClass: 'paradox-category-pill',
        allKey: 'filter_all_paradoxes',
        emptyKey: 'no_paradoxes_found',
        renderCard: paradoxCard,
        onAction: (action, paradox) => showParadox(paradox)
    });

    document.addEventListener('click', e => {
        const el = e.target.closest('[data-action]');
        const handler = el && ACTIONS[el.dataset.action];
        if (handler) handler(el);
    });

    I18n.onChange(() => {
        App.concepts.rerender();
        App.paradoxes.rerender();
        renderFeatured();
        renderParadoxDetail();
        renderJournalPrompt();
        renderJournal();
        renderStats();
    });

    updateStreak();
    App.concepts.init();
    App.paradoxes.init();
    setFeatured(randomConcept());
    renderJournal();
    renderStats();
}

document.addEventListener('DOMContentLoaded', init);
