import { concepts } from './data.js';
import * as journal from './journal.js';
import * as ui from './ui.js';

let currentConceptIndex = 0;

// Función para renderizar un concepto específico
function renderConcept(index) {
    const concept = concepts[index];
    const card = document.getElementById('daily-card');

    // Animación suave
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';

    setTimeout(() => {
        card.querySelector('.concept-title').textContent = concept.title;
        card.querySelector('.concept-definition').textContent = `"${concept.quote}"`;
        card.querySelector('.concept-details').innerHTML = `
            <p><strong>Filósofo:</strong> ${concept.philosopher}</p>
            <p><strong>Aplicación práctica:</strong> ${concept.application}</p>
        `;
        document.getElementById('journal-prompt').innerHTML = `Pregunta de hoy: <strong>${concept.prompt}</strong>`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
}

// Concept Management
window.nextConcept = function () {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    renderConcept(currentConceptIndex);
};

// Thought Experiments
window.showAnswer = function (choice) {
    const answer = document.getElementById('answer');
    answer.style.display = 'block';
    answer.style.animation = 'slideIn 0.5s ease-out';
    answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// Paradoxes
window.toggleParadox = function (element) {
    ui.toggleParadoxUI(element);
};

// Journal Actions
window.saveEntry = function () {
    const text = document.getElementById('journal-entry').value;
    const prompt = document.getElementById('journal-prompt').innerText;

    const result = journal.saveEntry(text, prompt);
    if (!result.success) {
        ui.notify('Escribe algo profundo antes de guardar...', 'error');
        return;
    }

    ui.notify('Reflexión guardada en tu bitácora.', 'success');
    document.getElementById('journal-entry').value = '';

    if (document.getElementById('history-container').style.display === 'block') {
        renderHistoryList();
    }
};

window.toggleHistory = function () {
    const container = document.getElementById('history-container');
    const isVisible = container.style.display === 'block';

    container.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        renderHistoryList();
        container.scrollIntoView({ behavior: 'smooth' });
    }
};

function renderHistoryList() {
    const list = document.getElementById('entries-list');
    ui.renderHistory(journal.getEntries(), list, (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta reflexión?')) {
            journal.deleteEntry(id);
            renderHistoryList();
        }
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Cálculo del concepto del día basado en la fecha (Día del año)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - (now.getTimezoneOffset() * 60 * 1000) - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    currentConceptIndex = dayOfYear % concepts.length;
    renderConcept(currentConceptIndex);
});
