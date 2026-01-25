// Consolidated Script for FilosofiaCotidiana
// Works with local file:// access by avoiding ES Modules

// 1. DATA
const concepts = [
    {
        title: "Estoicismo",
        quote: "No podemos controlar lo que nos sucede, pero sí cómo respondemos a ello.",
        philosopher: "Marco Aurelio, Epicteto, Séneca",
        application: "Cuando algo sale mal, pregúntate: ¿Está bajo mi control? Si no, acéptalo. Si sí, actúa.",
        prompt: "¿Qué situación fuera de tu control te ha robado la paz hoy? Escribe cómo podrías aceptarla."
    },
    {
        title: "Existencialismo",
        quote: "La existencia precede a la esencia. Tú creas tu propio significado.",
        philosopher: "Jean-Paul Sartre",
        application: "No esperes que la vida tenga un propósito predefinido. Tú decides qué es importante para ti.",
        prompt: "Si mañana pudieras cambiar tu propósito de vida, ¿cuál elegirías y por qué?"
    },
    {
        title: "Minimalismo (Diógenes)",
        quote: "Quien tiene menos necesidades, es más libre.",
        philosopher: "Diógenes de Sinope",
        application: "Antes de comprar algo, pregúntate: ¿Realmente lo necesito o solo lo deseo?",
        prompt: "¿De qué carga física o mental podrías prescindir hoy para sentirte más ligero?"
    },
    {
        title: "Memento Mori",
        quote: "Recuerda que morirás. No para temer, sino para vivir plenamente.",
        philosopher: "Tradición estoica",
        application: "¿Qué harías hoy si supieras que te queda poco tiempo? Hazlo.",
        prompt: "Si hoy fuera tu último día, ¿te sentirías orgulloso de cómo has pasado tus últimas 24 horas?"
    },
    {
        title: "Navaja de Ockham",
        quote: "La explicación más simple suele ser la correcta.",
        philosopher: "Guillermo de Ockham",
        application: "Cuando algo va mal, busca primero las causas obvias antes de complicarte.",
        prompt: "¿En qué área de tu vida estás complicando algo que en realidad es muy simple?"
    }
];

// 2. JOURNAL LOGIC
const STORAGE_KEY = 'philosophyJournal';

function saveEntry(text, prompt) {
    if (!text.trim()) return { success: false, error: 'Empty content' };

    const entries = getEntries();
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        prompt: prompt,
        text: text
    };

    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return { success: true, entry: newEntry };
}

function getEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function deleteEntry(id) {
    let entries = getEntries();
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
}

// 3. UI LOGIC
function renderHistoryUI(entries, listContainer, onDeleteClick) {
    if (entries.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Aún no has escrito ninguna reflexión. Tu viaje comienza con la primera palabra.</p>';
        return;
    }

    listContainer.innerHTML = entries.map(entry => `
        <div class="journal-entry-item">
            <div class="entry-header">
                <span>${entry.date}</span>
                <div class="entry-actions">
                    <span class="action-link delete" data-id="${entry.id}">Borrar</span>
                </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 0.5rem; font-style: italic;">${entry.prompt}</p>
            <p style="white-space: pre-wrap;">${entry.text}</p>
        </div>
    `).join('');

    listContainer.querySelectorAll('.action-link.delete').forEach(btn => {
        btn.onclick = () => onDeleteClick(Number(btn.dataset.id));
    });
}

function notify(msg, type) {
    const toast = document.createElement('div');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b7355';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : accentColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleParadoxUI(element) {
    const explanation = element.querySelector('.paradox-explanation');
    const isVisible = explanation.style.display === 'block';

    document.querySelectorAll('.paradox-explanation').forEach(exp => {
        exp.style.display = 'none';
        exp.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });

    if (!isVisible) {
        explanation.style.display = 'block';
        element.style.borderColor = 'var(--accent)';
    }
}

// 4. MAIN ORCHESTRATION
let currentConceptIndex = 0;

function renderConcept(index) {
    const concept = concepts[index];
    const card = document.getElementById('daily-card');
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

window.nextConcept = function () {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    renderConcept(currentConceptIndex);
};

window.showAnswer = function (choice) {
    const answer = document.getElementById('answer');
    answer.style.display = 'block';
    answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.toggleParadox = function (element) {
    toggleParadoxUI(element);
};

window.saveEntry = function () {
    const text = document.getElementById('journal-entry').value;
    const prompt = document.getElementById('journal-prompt').innerText;

    const result = saveEntry(text, prompt);
    if (!result.success) {
        notify('Escribe algo profundo antes de guardar...', 'error');
        return;
    }

    notify('Reflexión guardada en tu bitácora.', 'success');
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
    renderHistoryUI(getEntries(), list, (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta reflexión?')) {
            deleteEntry(id);
            renderHistoryList();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - (now.getTimezoneOffset() * 60 * 1000) - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    currentConceptIndex = dayOfYear % concepts.length;
    renderConcept(currentConceptIndex);
});
