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

// === CATEGORY FILTERS ===
const categories = {
    ESTOICISMO: [
        'Dicotomía del Control', 'Amor Fati', 'Meditación sobre la Muerte',
        'Apatheia', 'Tranquilidad de Ánimo', 'Ataraxia', 'Minimalismo Cínico'
    ],
    EXISTENCIALISMO: [
        'Existencialismo (Esencia)', 'Mala Fe', 'El Absurdo', 'El Otro',
        'Autenticidad Moderna', 'Soledad Existencial', 'Ética de la Ambigüedad',
        'El Compromiso', 'Ser-en-el-mundo', 'Autenticidad contra la Falsedad',
        'El Guardián en el Centeno'
    ],
    ORIENTAL: [
        'Impermanencia', 'Wu Wei (No-Acción)', 'Karma (Causalidad)',
        'Dharma (Propósito)', 'El Camino Medio', 'Anatman (No-Yo)',
        'Ubuntu', 'Sankofa'
    ],
    ETICA: [
        'El Imperativo Categórico', 'Eudaimonía', 'El Velo de la Ignorancia',
        'Ley Natural', 'Ética del Cuidado', 'Ética del Cuidado Feminista',
        'Justicia como Imparcialidad', 'El Contrato Social', 'Libre Albedrío',
        'Soberanía sobre uno mismo'
    ],
    CONTEMPORANEO: [
        'Capitalismo de Vigilancia', 'Realismo Capitalista', 'Filosofía Cyborg',
        'Necropolítica', 'Banalidad del Mal', 'Industria Cultural', 'Aceleracionismo',
        'Poder y Conocimiento', 'Microfísica del Poder', 'Sociedad Líquida',
        'La Sociedad del Espectáculo', 'Razón Instrumental', 'Reconocimiento Mutuo',
        'Vulnerabilidad Compartida', 'Pensamiento sin Barandillas', 'La Vida Activa',
        'Filosofía de la Liberación', 'Conciencia Mestiza', 'Epistemología del Sur',
        'Performatividad de Género', 'Interseccionalidad Ampliada'
    ]
};

function filterCategory(category) {
    currentCategory = category;

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (category === 'TODOS') {
        filteredConcepts = [...concepts];
    } else if (category === 'FAVORITOS') {
        filteredConcepts = concepts.filter(c => isFavorite(c.title));
    } else {
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

function applyCategoryFilter() {
    const categoryTitles = categories[currentCategory] || [];
    filteredConcepts = filteredConcepts.filter(c => categoryTitles.includes(c.title));
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
