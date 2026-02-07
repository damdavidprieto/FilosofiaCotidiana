// ===== FEATURES.JS =====
// Theme, Search, Favorites, Stats

// === THEME TOGGLE ===
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon
    const icon = document.getElementById('theme-icon');
    icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// === FAVORITES SYSTEM ===
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFavorite(conceptTitle) {
    const index = favorites.indexOf(conceptTitle);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(conceptTitle);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(conceptTitle);
    updateStats();
}

function isFavorite(conceptTitle) {
    return favorites.includes(conceptTitle);
}

function updateFavoriteButton(conceptTitle) {
    const btn = document.querySelector('.favorite-btn');
    if (btn) {
        btn.classList.toggle('favorited', isFavorite(conceptTitle));
        btn.textContent = isFavorite(conceptTitle) ? '⭐' : '☆';
    }
}

// === SEARCH FUNCTIONALITY ===
let filteredConcepts = [...concepts];
let currentCategory = 'TODOS';

function searchConcepts() {
    const query = document.getElementById('search-input').value.toLowerCase();

    if (query.length === 0) {
        filteredConcepts = [...concepts];
    } else {
        filteredConcepts = concepts.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.philosopher.toLowerCase().includes(query) ||
            c.quote.toLowerCase().includes(query) ||
            c.application.toLowerCase().includes(query)
        );
    }

    // Apply category filter if active
    if (currentCategory !== 'TODOS') {
        applyCategoryFilter();
    }

    // Show first result
    if (filteredConcepts.length > 0) {
        currentConceptIndex = 0;
        displayConcept(filteredConcepts[currentConceptIndex]);
    } else {
        showNoResults();
    }
}

function showNoResults() {
    const card = document.getElementById('daily-card');
    card.innerHTML = `
        <h3 class="concept-title">No se encontraron resultados</h3>
        <p class="concept-definition">
            Intenta con otros términos de búsqueda o explora las categorías.
        </p>
        <button class="btn-premium" onclick="clearSearch()">Limpiar búsqueda</button>
    `;
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    searchConcepts();
}

// === CATEGORY FILTERS - INDIVIDUAL FUNCTIONS ===
function showTodos() {
    currentCategory = 'TODOS';
    updateActiveButton(event);
    filteredConcepts = [...concepts];
    displayResults();
}

function showEstoicismo() {
    console.log("=== showEstoicismo CALLED ===");
    console.log("concepts array:", concepts);
    console.log("concepts.length:", concepts.length);

    currentCategory = 'ESTOICISMO';
    updateActiveButton(event);

    filteredConcepts = concepts.filter(c => c.category === 'ESTOICISMO');
    console.log("filteredConcepts.length:", filteredConcepts.length);
    console.log("filteredConcepts:", filteredConcepts);

    displayResults();
}

function showExistencialismo() {
    currentCategory = 'EXISTENCIALISMO';
    updateActiveButton(event);
    filteredConcepts = concepts.filter(c => c.category === 'EXISTENCIALISMO');
    displayResults();
}

function showOriental() {
    currentCategory = 'ORIENTAL';
    updateActiveButton(event);
    filteredConcepts = concepts.filter(c => c.category === 'ORIENTAL');
    displayResults();
}

function showEtica() {
    currentCategory = 'ETICA';
    updateActiveButton(event);
    filteredConcepts = concepts.filter(c => c.category === 'ETICA');
    displayResults();
}

function showContemporaneo() {
    currentCategory = 'CONTEMPORANEO';
    updateActiveButton(event);
    filteredConcepts = concepts.filter(c => c.category === 'CONTEMPORANEO');
    displayResults();
}

function showFavoritos() {
    currentCategory = 'FAVORITOS';
    updateActiveButton(event);
    filteredConcepts = concepts.filter(c => isFavorite(c.title));
    displayResults();
}

function updateActiveButton(evt) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    if (evt && evt.target) evt.target.classList.add('active');
}

function displayConcept(concept) {
    if (!concept) return;

    const card = document.getElementById('daily-card');
    if (!card) return;

    card.innerHTML = `
        <h3 class="concept-title">${concept.title}</h3>
        <blockquote class="concept-quote">"${concept.quote}"</blockquote>
        <p class="concept-philosopher">— ${concept.philosopher}</p>
        <div class="concept-details">
            <p><strong>Aplicación práctica:</strong> ${concept.application}</p>
        </div>
        <div class="concept-actions">
            <button class="btn-premium" onclick="nextConcept()">Siguiente concepto <span>→</span></button>
        </div>
    `;

    // Update journal prompt
    const promptEl = document.getElementById('journal-prompt');
    if (promptEl && concept.prompt) {
        promptEl.textContent = concept.prompt;
    }
}

function displayResults() {
    if (filteredConcepts.length > 0) {
        currentConceptIndex = 0;
        displayConcept(filteredConcepts[currentConceptIndex]);
    } else {
        showNoResults();
    }
}

// Legacy function for compatibility
function filterCategory(category) {
    const funcMap = {
        'TODOS': showTodos,
        'ESTOICISMO': showEstoicismo,
        'EXISTENCIALISMO': showExistencialismo,
        'ORIENTAL': showOriental,
        'ETICA': showEtica,
        'CONTEMPORANEO': showContemporaneo,
        'FAVORITOS': showFavoritos
    };
    if (funcMap[category]) funcMap[category]();
}

function applyCategoryFilter() {
    // Dynamic filtering based on the 'category' property
    // We filter the ALREADY filtered list (filteredConcepts) to respect search queries!
    if (currentCategory === 'FAVORITOS') {
        filteredConcepts = filteredConcepts.filter(c => isFavorite(c.title));
    } else {
        filteredConcepts = filteredConcepts.filter(c => c.category === currentCategory);
    }
}

// === STATS TRACKING ===
let stats = JSON.parse(localStorage.getItem('stats') || '{"conceptsRead":[],"streakDays":0,"lastVisit":null,"journalCount":0}');

function trackConceptRead(conceptTitle) {
    if (!stats.conceptsRead.includes(conceptTitle)) {
        stats.conceptsRead.push(conceptTitle);
    }
    updateStreak();
    saveStats();
    updateStats();
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = stats.lastVisit ? new Date(stats.lastVisit).toDateString() : null;

    if (lastVisit === today) {
        // Same day, no change
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastVisit === yesterdayStr) {
        // Consecutive day
        stats.streakDays++;
    } else if (lastVisit !== today) {
        // Streak broken
        stats.streakDays = 1;
    }

    stats.lastVisit = new Date().toISOString();
}

function saveStats() {
    localStorage.setItem('stats', JSON.stringify(stats));
}

function updateStats() {
    document.getElementById('stat-concepts').textContent = stats.conceptsRead.length;
    document.getElementById('stat-streak').textContent = stats.streakDays;
    document.getElementById('stat-favorites').textContent = favorites.length;

    // Count journal entries
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    document.getElementById('stat-journal').textContent = entries.length;
    stats.journalCount = entries.length;
}

function toggleStats() {
    const dashboard = document.getElementById('stats-dashboard');
    const isVisible = dashboard.style.display !== 'none';
    dashboard.style.display = isVisible ? 'none' : 'grid';
}

// === SHARE FUNCTIONALITY ===
function shareConcept(concept) {
    const text = `"${concept.quote}" - ${concept.philosopher}\n\nFilosofía Cotidiana`;

    if (navigator.share) {
        navigator.share({
            title: concept.title,
            text: text,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showToast('Concepto copiado al portapapeles');
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    updateStats();

    // Show stats dashboard by default
    document.getElementById('stats-dashboard').style.display = 'grid';
});

