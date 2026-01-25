import { concepts, experiments } from './data.js';
import { saveEntryData, deleteEntryData, getEntries } from './journal.js';
import { renderHistoryUI, notify, toggleParadoxUI } from './ui.js';

let currentConceptIndex = 0;
let currentExperimentIndex = 0;

function renderConcept(index) {
    const concept = concepts[index];
    const card = document.getElementById('daily-card');
    if (!card) return;

    card.style.opacity = '0.5';

    setTimeout(() => {
        const titleEl = card.querySelector('.concept-title');
        const defEl = card.querySelector('.concept-definition');
        const detailsEl = card.querySelector('.concept-details');
        const promptEl = document.getElementById('journal-prompt');

        if (titleEl) titleEl.textContent = concept.title;
        if (defEl) defEl.textContent = `"${concept.quote}"`;
        if (detailsEl) {
            detailsEl.innerHTML = `
                <p><strong>Filósofo:</strong> ${concept.philosopher}</p>
                <p><strong>Aplicación práctica:</strong> ${concept.application}</p>
            `;
        }
        if (promptEl) promptEl.innerHTML = `Pregunta de hoy: <strong>${concept.prompt}</strong>`;

        card.style.opacity = '1';
    }, 100);
}

function renderExperiment(index) {
    const exp = experiments[index];
    const card = document.querySelector('.thought-experiment .glass-card');
    if (!card) return;

    card.style.opacity = '0.5';

    setTimeout(() => {
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
                <p><strong>Reflexión:</strong> ${exp.reflection}</p>
                <p><strong>Aplicado a ti:</strong> ${exp.application}</p>
            `;
        }
        card.style.opacity = '1';
    }, 100);
}

function renderHistoryList() {
    const list = document.getElementById('entries-list');
    if (list) {
        renderHistoryUI(getEntries(), list);
    }
}

// Global exposure for event listeners or direct bindings
window.nextConcept = () => {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    renderConcept(currentConceptIndex);
};

window.nextExperiment = () => {
    currentExperimentIndex = (currentExperimentIndex + 1) % experiments.length;
    renderExperiment(currentExperimentIndex);
};

window.showAnswer = () => {
    const answer = document.getElementById('answer');
    if (answer) {
        answer.style.display = 'block';
        answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

window.toggleParadox = (element) => {
    toggleParadoxUI(element);
};

window.saveEntry = () => {
    const text = document.getElementById('journal-entry').value;
    const prompt = document.getElementById('journal-prompt').innerText;

    const result = saveEntryData(text, prompt);
    if (!result.success) {
        notify('Escribe algo profundo...', 'error');
        return;
    }

    notify('Reflexión guardada.', 'success');
    document.getElementById('journal-entry').value = '';

    const container = document.getElementById('history-container');
    if (container && container.style.display === 'block') {
        renderHistoryList();
    }
};

window.toggleHistory = () => {
    const container = document.getElementById('history-container');
    if (!container) return;
    const isVisible = container.style.display === 'block';

    container.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        renderHistoryList();
        container.scrollIntoView({ behavior: 'smooth' });
    }
};

window.confirmDelete = (id) => {
    if (confirm('¿Eliminar esta reflexión?')) {
        deleteEntryData(id);
        renderHistoryList();
    }
};

// Orchestration
function init() {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    currentConceptIndex = dayOfYear % concepts.length;
    renderConcept(currentConceptIndex);

    currentExperimentIndex = dayOfYear % experiments.length;
    renderExperiment(currentExperimentIndex);

    // Event delegation for dynamic elements
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-btn')) {
            window.showAnswer();
        }
        if (e.target.classList.contains('delete')) {
            window.confirmDelete(parseInt(e.target.dataset.id));
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
