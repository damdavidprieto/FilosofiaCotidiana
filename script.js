// Base de datos de conceptos y preguntas dinámicas
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

let currentConceptIndex = 0;

// Cambiar concepto y su pregunta asociada
function nextConcept() {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    const concept = concepts[currentConceptIndex];

    const card = document.getElementById('daily-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';

    setTimeout(() => {
        card.querySelector('.concept-title').textContent = concept.title;
        card.querySelector('.concept-definition').textContent = concept.quote;
        card.querySelector('.concept-details').innerHTML = `
            <p><strong>Filósofo:</strong> ${concept.philosopher}</p>
            <p><strong>Aplicación práctica:</strong> ${concept.application}</p>
        `;
        
        // Actualizar también la pregunta del diario
        document.getElementById('journal-prompt').innerHTML = `Pregunta de hoy: <strong>${concept.prompt}</strong>`;
        
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
}

// Experimentos mentales
function showAnswer(choice) {
    const answer = document.getElementById('answer');
    answer.style.display = 'block';
    answer.style.animation = 'slideIn 0.5s ease-out';
    answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Toggle paradojas
function toggleParadox(element) {
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

// LÓGICA DEL DIARIO (CRUD)
const STORAGE_KEY = 'philosophyJournal';

function saveEntry() {
    const text = document.getElementById('journal-entry').value;
    const prompt = document.getElementById('journal-prompt').innerText;

    if (!text.trim()) {
        notify('Escribe algo profundo antes de guardar...', 'error');
        return;
    }

    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        prompt: prompt,
        text: text
    };

    entries.unshift(newEntry); // Añadir al inicio para ver las nuevas primero
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    notify('Reflexión guardada en tu bitácora.', 'success');
    document.getElementById('journal-entry').value = '';
    
    if (document.getElementById('history-container').style.display === 'block') {
        renderHistory();
    }
}

function toggleHistory() {
    const container = document.getElementById('history-container');
    const isVisible = container.style.display === 'block';
    
    container.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        renderHistory();
        container.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderHistory() {
    const list = document.getElementById('entries-list');
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (entries.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Aún no has escrito ninguna reflexión. Tu viaje comienza con la primera palabra.</p>';
        return;
    }

    list.innerHTML = entries.map(entry => `
        <div class="journal-entry-item">
            <div class="entry-header">
                <span>${entry.date}</span>
                <div class="entry-actions">
                    <span class="action-link delete" onclick="deleteEntry(${entry.id})">Borrar</span>
                </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 0.5rem; font-style: italic;">${entry.prompt}</p>
            <p style="white-space: pre-wrap;">${entry.text}</p>
        </div>
    `).join('');
}

function deleteEntry(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reflexión?')) {
        let entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        renderHistory();
    }
}

// Utilidades UI
function notify(msg, type) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : 'var(--accent)'};
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

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    // Configurar pregunta inicial
    document.getElementById('journal-prompt').innerHTML = `Pregunta de hoy: <strong>${concepts[0].prompt}</strong>`;
});
