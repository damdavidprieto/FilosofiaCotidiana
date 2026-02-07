let currentConceptIndex = 0;
let currentExperimentIndex = 0;
let currentParadoxIndex = 0;

function logStatus(msg) {
    console.log(`[PHILOSOPHY-APP] ${msg}`);
}

function renderConcept(index) {
    const concept = concepts[index];
    const card = document.getElementById('daily-card');
    if (!card) return;

    // Fully rebuild the card to ensure structure exists (recovering from No Results state)
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
        promptEl.innerHTML = `Pregunta de hoy: <strong>${concept.prompt}</strong>`;
    }

    // Add favorite button
    const favBtn = document.createElement('button');
    favBtn.className = 'favorite-btn';
    favBtn.textContent = isFavorite(concept.title) ? '⭐' : '☆';
    if (isFavorite(concept.title)) favBtn.classList.add('favorited');

    favBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent bubbling if needed
        toggleFavorite(concept.title);
        // Re-render button state immediately without full re-render
        favBtn.textContent = isFavorite(concept.title) ? '⭐' : '☆';
        favBtn.classList.toggle('favorited', isFavorite(concept.title));
    };

    favBtn.setAttribute('aria-label', 'Marcar como favorito');
    card.appendChild(favBtn);

    // Track concept read
    trackConceptRead(concept.title);
}

// Helper function to display concept (used by search/filter)
function displayConcept(concept) {
    const index = concepts.indexOf(concept);
    if (index !== -1) {
        currentConceptIndex = index;
        renderConcept(index);
    }
}


function renderExperiment(index) {
    const exp = experiments[index];
    const card = document.querySelector('.thought-experiment .glass-card');
    if (!card) return;
    const titleEl = card.querySelector('.concept-title');
    const questionEl = card.querySelector('.question');
    const optionsEl = card.querySelector('.options');
    const answerEl = document.getElementById('answer');

    if (titleEl) titleEl.textContent = exp.title;
    if (questionEl) questionEl.textContent = exp.question;
    if (answerEl) answerEl.style.display = 'none';

    if (optionsEl) {
        optionsEl.innerHTML = exp.options.map(opt => `
            <button class="option-btn" data-type="${opt.type}">${opt.text}</button>
        `).join('');
    }

    if (answerEl) {
        answerEl.innerHTML = `
            <div class="experiment-result">
                <div class="result-block reflection">
                    <h4>💡 Reflexión Filosófica</h4>
                    <p>${exp.reflection}</p>
                </div>
                <div class="result-block application">
                    <h4>🫵 Aplicado a ti</h4>
                    <p>${exp.application}</p>
                </div>
            </div>
        `;
    }
}

function renderParadox(index) {
    logStatus(`Rendering Paradox at index ${index}`);
    if (typeof index === 'undefined' || !paradoxes[index]) {
        index = Math.floor(Math.random() * paradoxes.length);
    }

    const par = paradoxes[index];
    const section = document.getElementById('paradox-section');
    if (!section) {
        console.error('Section #paradox-section not found');
        return;
    }

    const titleEl = section.querySelector('#paradox-title');
    const previewEl = section.querySelector('#paradox-preview');
    const contentEl = section.querySelector('#paradox-content');
    const expEl = section.querySelector('#paradox-explanation');
    const refEl = section.querySelector('#paradox-reflection');
    const appEl = section.querySelector('#paradox-application');

    if (titleEl) titleEl.textContent = par.title;
    if (previewEl) previewEl.textContent = par.preview;
    if (contentEl) contentEl.style.display = 'none';

    if (expEl) expEl.textContent = par.explanation;
    if (refEl) refEl.textContent = par.reflection;
    if (appEl) appEl.textContent = par.application;

    const card = section.querySelector('.paradox-card');
    if (card) card.classList.remove('active');

    logStatus(`Paradox "${par.title}" rendered successfully.`);
}

// Global exposure
window.nextConcept = () => {
    // Use filteredConcepts if search/filter is active, otherwise use all concepts
    const conceptsToUse = filteredConcepts.length > 0 ? filteredConcepts : concepts;
    currentConceptIndex = Math.floor(Math.random() * conceptsToUse.length);

    if (filteredConcepts.length > 0) {
        displayConcept(conceptsToUse[currentConceptIndex]);
    } else {
        renderConcept(currentConceptIndex);
    }
};

window.nextExperiment = () => {
    currentExperimentIndex = Math.floor(Math.random() * experiments.length);
    renderExperiment(currentExperimentIndex);
};

window.nextParadox = (e) => {
    if (e) e.stopPropagation();
    currentParadoxIndex = Math.floor(Math.random() * paradoxes.length);
    renderParadox(currentParadoxIndex);
};

window.toggleParadoxCard = (element) => {
    const content = element.querySelector('#paradox-content');
    if (!content) return;
    const isVisible = content.style.display === 'block';
    content.style.display = isVisible ? 'none' : 'block';
    element.classList.toggle('active', !isVisible);
};

window.showAnswer = () => {
    const answer = document.getElementById('answer');
    if (answer) answer.style.display = 'block';
};

window.saveEntry = () => {
    const text = document.getElementById('journal-entry').value;
    const promptEl = document.getElementById('journal-prompt');
    const prompt = promptEl ? promptEl.innerText : 'Reflexión libre';
    const result = saveEntryData(text, prompt);
    if (result.success) {
        notify('Reflexión guardada.', 'success');
        document.getElementById('journal-entry').value = '';
    } else {
        notify('Escribe algo profundo...', 'error');
    }
};

window.toggleHistory = () => {
    const container = document.getElementById('history-container');
    if (!container) return;
    const isVisible = container.style.display === 'block';
    container.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        renderHistoryUI(getEntries(), document.getElementById('entries-list'));
    }
};

window.confirmDelete = (id) => {
    showConfirm(
        '¿Eliminar Reflexión?',
        'Esta acción es permanente y tu pensamiento se perderá en el éter.',
        () => {
            deleteEntryData(id);
            renderHistoryUI(getEntries(), document.getElementById('entries-list'));
            notify('Pensamiento eliminado');
        }
    );
};

// Orchestration
function init() {
    logStatus('Initializing Application...');

    try {
        currentConceptIndex = Math.floor(Math.random() * concepts.length);
        renderConcept(currentConceptIndex);
        logStatus('Concept initialized.');
    } catch (e) { console.error('Concept init failed', e); }

    try {
        currentExperimentIndex = Math.floor(Math.random() * experiments.length);
        renderExperiment(currentExperimentIndex);
        logStatus('Experiment initialized.');
    } catch (e) { console.error('Experiment init failed', e); }

    try {
        currentParadoxIndex = Math.floor(Math.random() * paradoxes.length);
        renderParadox(currentParadoxIndex);
        logStatus('Paradox initialized.');
    } catch (e) { console.error('Paradox init failed', e); }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-btn')) window.showAnswer();
        if (e.target.classList.contains('delete')) window.confirmDelete(parseInt(e.target.dataset.id));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
