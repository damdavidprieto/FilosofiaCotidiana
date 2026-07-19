/**
 * Filosofía Cotidiana - App V2
 * Aplicación completamente rediseñada con 500+ conceptos
 */

// ============= STATE MANAGEMENT =============
const APP_STATE = {
    currentConcept: null,
    filteredConcepts: [],
    favorites: JSON.parse(localStorage.getItem('philosophy-favorites')) || [],
    journalEntries: JSON.parse(localStorage.getItem('philosophy-journal')) || [],
    lastVisit: localStorage.getItem('philosophy-last-visit') || new Date().toISOString(),
    currentStreak: parseInt(localStorage.getItem('philosophy-streak')) || 0,
    currentCategory: 'Todos',
    searchQuery: '',
    conceptsPage: 1,
    paradoxesPage: 1,
    itemsPerPage: getItemsPerPage()
};

function getItemsPerPage() {
    if (window.innerWidth < 480) return 5;  // Mobile: 5 items
    if (window.innerWidth < 768) return 8;  // Tablet: 8 items
    return 10;                               // Desktop: 10 items
}

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI();
    initializeApp();
});

// Recalcular items por página cuando cambia el tamaño de ventana
window.addEventListener('resize', () => {
    const newItemsPerPage = getItemsPerPage();
    if (newItemsPerPage !== APP_STATE.itemsPerPage) {
        APP_STATE.itemsPerPage = newItemsPerPage;
        APP_STATE.conceptsPage = 1;
        APP_STATE.paradoxesPage = 1;
        renderConceptsGrid();
        renderParadoxesGrid();
    }
});

// Recalcular también cuando la página carga completamente
window.addEventListener('load', () => {
    APP_STATE.itemsPerPage = getItemsPerPage();
    renderConceptsGrid();
    renderParadoxesGrid();
});

// ============= LANGUAGE MANAGEMENT =============
function updateLanguageUI() {
    const currentLang = getCurrentLanguage();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Actualizar header
    document.querySelector('.header-title').textContent = t('header_title');
    document.querySelector('.header-subtitle').textContent = t('header_subtitle');
    document.querySelector('.header-tagline').textContent = t('header_tagline');

    // Actualizar featured section
    document.querySelector('.featured-label').textContent = t('featured_label');
    document.querySelector('[aria-label="Cambiar tema oscuro/claro"]').title = currentLang === 'es' ? 'Cambiar tema' : 'Alterar tema';

    // Actualizar stats
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('.stat-label').textContent = t('stat_concepts');
        statCards[1].querySelector('.stat-label').textContent = t('stat_categories');
        statCards[2].querySelector('.stat-label').textContent = t('stat_streak');
        statCards[3].querySelector('.stat-label').textContent = t('stat_favorites');
    }

    // Actualizar búsqueda
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = t('search_concepts');

    const paradoxSearch = document.getElementById('paradox-search-input');
    if (paradoxSearch) paradoxSearch.placeholder = t('search_paradoxes');

    // Actualizar secciones
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length >= 4) {
        sectionTitles[0].textContent = t('section_concepts');
        sectionTitles[1].textContent = t('section_paradoxes');
        sectionTitles[2].textContent = t('section_journal');
        sectionTitles[3].textContent = t('section_about');
    }

    const sectionSubtitle = document.querySelector('.section-subtitle');
    if (sectionSubtitle) sectionSubtitle.textContent = t('paradoxes_subtitle');

    // Actualizar journal
    const journalPrompt = document.getElementById('journal-prompt');
    if (journalPrompt) journalPrompt.textContent = t('journal_prompt');

    const journalEntry = document.getElementById('journal-entry');
    if (journalEntry) journalEntry.placeholder = t('journal_placeholder');

    const privacyNote = document.querySelector('.privacy-note');
    if (privacyNote) privacyNote.textContent = t('privacy_note');

    // Actualizar botones
    const buttons = document.querySelectorAll('button.btn-primary, button.btn-secondary');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (text.includes('Otro') || text.includes('Outro')) btn.textContent = t('btn_another_concept');
        if (text.includes('Guardar') || text.includes('Salvar')) btn.textContent = t('btn_save_reflection');
        if (text.includes('Historial') || text.includes('Histórico')) btn.textContent = t('btn_view_history');
        if (text.includes('Cerrar') || text.includes('Fechar')) btn.textContent = t('btn_close');
    });
}

function initializeApp() {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('philosophy-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Inicializar vista principal
    APP_STATE.filteredConcepts = PHILOSOPHY_DATABASE.concepts;

    loadFeatured();
    renderFilterPills();
    renderConceptsGrid();
    updateStats();
    loadJournalPrompt();
    loadJournalHistory();

    // Inicializar paradojas
    renderParadoxCategories();
    renderParadoxesGrid();

    // Calcular racha
    calculateStreak();
}

// ============= THEME MANAGEMENT =============
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('philosophy-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============= FEATURED CONCEPT =============
function loadFeatured() {
    const concept = getRandomConcept();
    APP_STATE.currentConcept = concept;

    // Translate if needed
    const currentLang = getCurrentLanguage();
    const translatedConcept = translateConcept(concept, currentLang);

    document.getElementById('featured-title').textContent = translatedConcept.title;
    document.getElementById('featured-quote').textContent = `"${translatedConcept.quote}"`;
    document.getElementById('featured-philosopher').textContent = concept.philosopher + (concept.era ? ` (${concept.era})` : '');
    document.getElementById('featured-school').textContent = translatedConcept.category;
    document.getElementById('featured-application').textContent = translatedConcept.application;

    updateFavoriteButton();
}

// ============= FAVORITES =============
function toggleFavorite(source = null) {
    if (!APP_STATE.currentConcept) return;

    const idx = APP_STATE.favorites.findIndex(f => f.title === APP_STATE.currentConcept.title);

    if (idx === -1) {
        APP_STATE.favorites.push(APP_STATE.currentConcept);
    } else {
        APP_STATE.favorites.splice(idx, 1);
    }

    localStorage.setItem('philosophy-favorites', JSON.stringify(APP_STATE.favorites));
    updateFavoriteButton();
    updateStats();

    if (source !== 'card') {
        renderConceptsGrid();
    }
}

function updateFavoriteButton() {
    const btn = document.getElementById('favorite-btn');
    if (!btn) return;

    const isFavorite = APP_STATE.favorites.some(f => f.title === APP_STATE.currentConcept.title);
    btn.textContent = isFavorite ? '♥ Favorito' : '♡ Favorito';
    btn.classList.toggle('active', isFavorite);
}

// ============= FILTER & SEARCH =============
function renderFilterPills() {
    const container = document.getElementById('filter-pills');
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'pill active';
    allBtn.textContent = 'Todos';
    allBtn.onclick = () => filterByCategory('Todos');
    container.appendChild(allBtn);

    PHILOSOPHY_DATABASE.categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'pill';
        btn.textContent = category;
        btn.onclick = () => filterByCategory(category);
        container.appendChild(btn);
    });
}

function filterByCategory(category) {
    APP_STATE.currentCategory = category;

    // Update active pill
    document.querySelectorAll('.pill').forEach(pill => {
        pill.classList.toggle('active', pill.textContent === category);
    });

    applyFilters();
}

function filterConcepts() {
    const query = document.getElementById('search-input').value;
    APP_STATE.searchQuery = query;
    applyFilters();
}

function applyFilters() {
    let concepts = PHILOSOPHY_DATABASE.concepts;

    // Filter by category
    if (APP_STATE.currentCategory !== 'Todos') {
        concepts = concepts.filter(c => c.category === APP_STATE.currentCategory);
    }

    // Filter by search
    if (APP_STATE.searchQuery) {
        const q = APP_STATE.searchQuery.toLowerCase();
        concepts = concepts.filter(c =>
            c.title.toLowerCase().includes(q) ||
            c.philosopher.toLowerCase().includes(q) ||
            c.quote.toLowerCase().includes(q) ||
            (c.tags && c.tags.some(t => t.includes(q)))
        );
    }

    APP_STATE.filteredConcepts = concepts;
    APP_STATE.conceptsPage = 1; // Reset pagination
    renderConceptsGrid();
}

// ============= RENDER GRID =============
function renderConceptsGrid() {
    const grid = document.getElementById('concepts-grid');
    grid.innerHTML = '';

    if (APP_STATE.filteredConcepts.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary); padding: 3rem;">${t('no_concepts_found')}</p>`;
        updateConceptsPagination();
        return;
    }

    // Calcular paginación
    const start = (APP_STATE.conceptsPage - 1) * APP_STATE.itemsPerPage;
    const end = start + APP_STATE.itemsPerPage;
    const paginatedConcepts = APP_STATE.filteredConcepts.slice(start, end);

    paginatedConcepts.forEach((concept) => {
        const card = createConceptCard(concept);
        grid.appendChild(card);
    });

    updateConceptsPagination();
}

function updateConceptsPagination() {
    const totalPages = Math.ceil(APP_STATE.filteredConcepts.length / APP_STATE.itemsPerPage);
    const pageIndicator = document.getElementById('concepts-page-indicator');
    const paginationControls = document.getElementById('concepts-pagination');

    if (!paginationControls) return;

    const btns = paginationControls.querySelectorAll('.btn-pagination');
    const prevBtn = btns[0];
    const nextBtn = btns[1];

    if (pageIndicator) {
        pageIndicator.textContent = t('pagination_page')
            .replace('{page}', APP_STATE.conceptsPage)
            .replace('{total}', totalPages);
    }

    if (prevBtn) prevBtn.disabled = APP_STATE.conceptsPage <= 1;
    if (nextBtn) nextBtn.disabled = APP_STATE.conceptsPage >= totalPages;
}

function createConceptCard(concept) {
    const card = document.createElement('div');
    card.className = 'concept-card';

    // Translate concept if needed
    const currentLang = getCurrentLanguage();
    const translatedConcept = translateConcept(concept, currentLang);

    const isFavorite = APP_STATE.favorites.some(f => f.title === concept.title);

    card.innerHTML = `
        <span class="category-badge">${translatedConcept.category}</span>
        <h3 class="concept-title">${translatedConcept.title}</h3>
        <p class="philosopher">${concept.philosopher}${concept.era ? ` (${concept.era})` : ''}</p>
        <p class="quote">"${translatedConcept.quote}"</p>
        <div class="application">${translatedConcept.application}</div>
        <div class="card-actions">
            <button class="btn-icon" title="Favorito" onclick="event.stopPropagation(); toggleConceptFavorite(this, '${concept.title}')">
                ${isFavorite ? '♥' : '♡'}
            </button>
            <button class="btn-icon" title="Leer más" onclick="event.stopPropagation(); viewConceptDetail('${concept.title}')">
                📖
            </button>
        </div>
    `;

    return card;
}

function toggleConceptFavorite(btn, title) {
    const concept = PHILOSOPHY_DATABASE.concepts.find(c => c.title === title);
    if (!concept) return;

    const idx = APP_STATE.favorites.findIndex(f => f.title === title);
    if (idx === -1) {
        APP_STATE.favorites.push(concept);
        btn.textContent = '♥';
    } else {
        APP_STATE.favorites.splice(idx, 1);
        btn.textContent = '♡';
    }

    localStorage.setItem('philosophy-favorites', JSON.stringify(APP_STATE.favorites));
    updateStats();
}

function viewConceptDetail(title) {
    const concept = PHILOSOPHY_DATABASE.concepts.find(c => c.title === title);
    if (!concept) return;

    APP_STATE.currentConcept = concept;
    loadFeatured();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============= JOURNAL =============
function loadJournalPrompt() {
    const prompts = APP_STATE.currentConcept?.tags || ['¿Cómo puedes aplicar la sabiduría a tu vida hoy?'];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById('journal-prompt').textContent = `Reflexión: ${randomPrompt}`;
}

function saveJournalEntry() {
    const text = document.getElementById('journal-entry').value.trim();
    if (!text) {
        alert(t('alert_write_reflection'));
        return;
    }

    const entry = {
        id: Date.now(),
        concept: APP_STATE.currentConcept?.title || 'Reflexión Libre',
        text,
        date: new Date().toLocaleString('es-ES')
    };

    APP_STATE.journalEntries.push(entry);
    localStorage.setItem('philosophy-journal', JSON.stringify(APP_STATE.journalEntries));

    document.getElementById('journal-entry').value = '';
    loadJournalHistory();
    updateStats();

    alert(t('alert_reflection_saved'));
}

function toggleJournalHistory() {
    const history = document.getElementById('journal-history');
    history.style.display = history.style.display === 'none' ? 'block' : 'none';
}

function loadJournalHistory() {
    const list = document.getElementById('journal-entries-list');
    if (!list) return;

    list.innerHTML = '';

    if (APP_STATE.journalEntries.length === 0) {
        list.innerHTML = '<p style="color: var(--text-tertiary); text-align: center; padding: 2rem;">Aún no has escrito reflexiones. ¡Comienza hoy!</p>';
        return;
    }

    // Mostrar en orden inverso (más recientes primero)
    [...APP_STATE.journalEntries].reverse().forEach(entry => {
        const item = document.createElement('div');
        item.className = 'journal-entry-item';
        item.innerHTML = `
            <div class="journal-date">${entry.date} - ${entry.concept}</div>
            <div class="journal-text">${entry.text.substring(0, 150)}...</div>
        `;
        list.appendChild(item);
    });
}

// ============= STATS =============
function updateStats() {
    document.getElementById('favorites-count').textContent = APP_STATE.favorites.length;
    document.getElementById('streak-count').textContent = APP_STATE.currentStreak + ' días';
}

function calculateStreak() {
    const lastVisitDate = new Date(APP_STATE.lastVisit).toDateString();
    const today = new Date().toDateString();

    if (lastVisitDate === today) {
        // Ya visitó hoy
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastVisitDate === yesterday.toDateString()) {
        // Visitó ayer, incrementar racha
        APP_STATE.currentStreak++;
    } else {
        // Reiniciar racha
        APP_STATE.currentStreak = 1;
    }

    APP_STATE.lastVisit = new Date().toISOString();
    localStorage.setItem('philosophy-last-visit', APP_STATE.lastVisit);
    localStorage.setItem('philosophy-streak', APP_STATE.currentStreak);

    updateStats();
}

// ============= UTILITY =============
function getRandomConcept() {
    return PHILOSOPHY_DATABASE.concepts[
        Math.floor(Math.random() * PHILOSOPHY_DATABASE.concepts.length)
    ];
}


// ============= PAGINATION MANAGEMENT =============
function nextConceptsPage() {
    const totalPages = Math.ceil(APP_STATE.filteredConcepts.length / APP_STATE.itemsPerPage);
    if (APP_STATE.conceptsPage < totalPages) {
        APP_STATE.conceptsPage++;
        renderConceptsGrid();
        window.scrollTo({ top: document.getElementById('concepts-accordion')?.offsetTop - 100, behavior: 'smooth' });
    }
}

function prevConceptsPage() {
    if (APP_STATE.conceptsPage > 1) {
        APP_STATE.conceptsPage--;
        renderConceptsGrid();
        window.scrollTo({ top: document.getElementById('concepts-accordion')?.offsetTop - 100, behavior: 'smooth' });
    }
}

function nextParadoxesPage() {
    const totalPages = Math.ceil(PARADOXES_DATABASE.length / APP_STATE.itemsPerPage);
    if (APP_STATE.paradoxesPage < totalPages) {
        APP_STATE.paradoxesPage++;
        renderParadoxesGrid();
        window.scrollTo({ top: document.getElementById('paradoxes-accordion')?.offsetTop - 100, behavior: 'smooth' });
    }
}

function prevParadoxesPage() {
    if (APP_STATE.paradoxesPage > 1) {
        APP_STATE.paradoxesPage--;
        renderParadoxesGrid();
        window.scrollTo({ top: document.getElementById('paradoxes-accordion')?.offsetTop - 100, behavior: 'smooth' });
    }
}

// ============= PARADOXES FUNCTIONS =============
function renderParadoxCategories() {
    const container = document.getElementById('paradox-categories');
    if (!container) return;

    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'paradox-category-pill active';
    allBtn.textContent = 'Todas';
    allBtn.onclick = () => filterParadoxesByCategory('Todas');
    container.appendChild(allBtn);

    const categories = getParadoxCategories();
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'paradox-category-pill';
        btn.textContent = category;
        btn.onclick = () => filterParadoxesByCategory(category);
        container.appendChild(btn);
    });
}

function renderParadoxesGrid(paradoxes = PARADOXES_DATABASE) {
    const grid = document.getElementById('paradoxes-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (paradoxes.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary); padding: 2rem;">${t('no_paradoxes_found')}</p>`;
        updateParadoxesPagination(paradoxes);
        return;
    }

    // Calcular paginación
    const start = (APP_STATE.paradoxesPage - 1) * APP_STATE.itemsPerPage;
    const end = start + APP_STATE.itemsPerPage;
    const paginatedParadoxes = paradoxes.slice(start, end);

    paginatedParadoxes.forEach(paradox => {
        const card = document.createElement('div');
        card.className = 'paradox-card';

        // Translate paradox if needed
        const currentLang = getCurrentLanguage();
        const translatedParadox = translateParadox(paradox, currentLang);

        card.innerHTML = `
            <h3>${translatedParadox.title}</h3>
            <p class="paradox-preview">${translatedParadox.explanation.substring(0, 120)}...</p>
            <span class="paradox-category-label">${paradox.category}</span>
        `;
        card.onclick = () => showParadoxDetail(paradox);
        grid.appendChild(card);
    });

    updateParadoxesPagination(paradoxes);
}

function updateParadoxesPagination(paradoxes = PARADOXES_DATABASE) {
    const totalPages = Math.ceil(paradoxes.length / APP_STATE.itemsPerPage);
    const pageIndicator = document.getElementById('paradoxes-page-indicator');
    const paginationControls = document.getElementById('paradoxes-pagination');

    if (!paginationControls) return;

    const btns = paginationControls.querySelectorAll('.btn-pagination');
    const prevBtn = btns[0];
    const nextBtn = btns[1];

    if (pageIndicator) {
        pageIndicator.textContent = t('pagination_page')
            .replace('{page}', APP_STATE.paradoxesPage)
            .replace('{total}', totalPages);
    }

    if (prevBtn) prevBtn.disabled = APP_STATE.paradoxesPage <= 1;
    if (nextBtn) nextBtn.disabled = APP_STATE.paradoxesPage >= totalPages;
}

function showParadoxDetail(paradox) {
    const featured = document.getElementById('featured-paradox');
    if (!featured) return;

    // Translate paradox if needed
    const currentLang = getCurrentLanguage();
    const translatedParadox = translateParadox(paradox, currentLang);

    document.getElementById('paradox-title-expanded').textContent = translatedParadox.title;
    document.getElementById('paradox-explanation-expanded').textContent = translatedParadox.explanation;
    document.getElementById('paradox-reflection-expanded').textContent = translatedParadox.reflection;
    document.getElementById('paradox-application-expanded').textContent = translatedParadox.application;
    document.getElementById('paradox-philosopher-expanded').textContent = `${paradox.philosopher} • ${paradox.category}`;

    featured.style.display = 'block';
    window.scrollTo({ top: featured.offsetTop - 100, behavior: 'smooth' });
}

function closeParadoxFeatured() {
    const featured = document.getElementById('featured-paradox');
    if (featured) featured.style.display = 'none';
}

function filterParadoxesByCategory(category) {
    document.querySelectorAll('.paradox-category-pill').forEach(pill => {
        pill.classList.toggle('active', pill.textContent === category);
    });

    const filtered = category === 'Todas'
        ? PARADOXES_DATABASE
        : getParadoxesByCategory(category);

    APP_STATE.paradoxesPage = 1; // Reset pagination
    renderParadoxesGrid(filtered);
}

function searchParadoxSearch() {
    const query = document.getElementById('paradox-search-input').value;
    const results = query ? searchParadoxes(query) : PARADOXES_DATABASE;
    APP_STATE.paradoxesPage = 1; // Reset pagination
    renderParadoxesGrid(results);
}

// Exponer funciones globales necesarias
window.setLanguage = setLanguage;
window.toggleTheme = toggleTheme;
window.loadFeatured = loadFeatured;
window.toggleFavorite = toggleFavorite;
window.filterByCategory = filterByCategory;
window.filterConcepts = filterConcepts;
window.saveJournalEntry = saveJournalEntry;
window.toggleJournalHistory = toggleJournalHistory;
window.toggleConceptFavorite = toggleConceptFavorite;
window.viewConceptDetail = viewConceptDetail;
window.showParadoxDetail = showParadoxDetail;
window.closeParadoxFeatured = closeParadoxFeatured;
window.filterParadoxesByCategory = filterParadoxesByCategory;
window.searchParadoxSearch = searchParadoxSearch;
window.nextConceptsPage = nextConceptsPage;
window.prevConceptsPage = prevConceptsPage;
window.nextParadoxesPage = nextParadoxesPage;
window.prevParadoxesPage = prevParadoxesPage;
