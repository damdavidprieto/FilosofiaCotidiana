// Consolidated Script for FilosofiaCotidiana
// Works with local file:// access by avoiding ES Modules

console.log("Filosofía Cotidiana: Script inicializado");

// 1. DATA
const concepts = [
    {
        title: "Dicotomía del Control",
        quote: "No podemos elegir nuestras circunstancias externas, pero siempre podemos elegir cómo responder a ellas.",
        philosopher: "Epicteto",
        application: "Ante un imprevisto, separa lo que depende de ti (tu juicio) de lo que no (el evento). Actúa solo en lo primero.",
        prompt: "¿Qué situación te preocupa hoy que está totalmente fuera de tu control? Escribe cómo podrías aceptarla."
    },
    {
        title: "Ataraxia",
        quote: "El límite de la magnitud de los placeres es la eliminación de todo dolor.",
        philosopher: "Epicuro",
        application: "Busca la tranquilidad mental evitando deseos innecesarios y miedos infundados. Valora lo simple.",
        prompt: "¿Qué deseo innecesario estás persiguiendo hoy que te impide alcanzar la paz?"
    },
    {
        title: "Amor Fati",
        quote: "Mi fórmula para la grandeza humana es el Amor Fati: no querer que nada sea distinto ni en el pasado ni en el futuro.",
        philosopher: "Friedrich Nietzsche",
        application: "No solo aceptes lo que sucede; ámalo como una parte necesaria de tu historia única.",
        prompt: "Piensa en algo 'malo' que te haya pasado hoy. ¿Cómo podrías verlo como una oportunidad para crecer?"
    },
    {
        title: "Existencialismo (Esencia)",
        quote: "La existencia precede a la esencia.",
        philosopher: "Jean-Paul Sartre",
        application: "No has nacido con un destino. Eres lo que haces. Tienes la libertad total de definirte hoy.",
        prompt: "Si hoy borraras todas tus etiquetas (puesto, edad, rol), ¿quién decidirías empezar a ser mañana?"
    },
    {
        title: "La Navaja de Ockham",
        quote: "En igualdad de condiciones, la explicación más sencilla suele ser la correcta.",
        philosopher: "Guillermo de Ockham",
        application: "No sobreanalices los problemas. Busca la raíz más evidente antes de crear conspiraciones mentales.",
        prompt: "¿Qué problema estás complicando demasiado en tu cabeza? ¿Cuál es la explicación más simple?"
    },
    {
        title: "Mala Fe",
        quote: "El hombre está condenado a ser libre; porque una vez arrojado al mundo, es responsable de todo lo que hace.",
        philosopher: "Jean-Paul Sartre",
        application: "No te mientas diciendo 'no tengo opción'. Siempre hay una opción, aunque sea difícil.",
        prompt: "¿En qué área de tu vida dices 'no tengo otra opción' para evitar tu responsabilidad real?"
    },
    {
        title: "El Imperativo Categórico",
        quote: "Obra solo según aquella máxima por la cual puedas querer que al mismo tiempo se convierta en ley universal.",
        philosopher: "Immanuel Kant",
        application: "Antes de actuar, pregúntate: ¿Me gustaría que todo el mundo hiciera lo mismo en esta situación?",
        prompt: "Si tu acción más importante de hoy se convirtiera en ley para toda la humanidad, ¿sería el mundo un lugar mejor?"
    },
    {
        title: "Eudaimonía",
        quote: "La felicidad es una actividad del alma de acuerdo con la virtud.",
        philosopher: "Aristóteles",
        application: "La felicidad no es un placer fugaz, sino el florecimiento resultante de vivir con excelencia y propósito.",
        prompt: "¿Qué acción virtuosa (con coraje, justicia o sabiduría) podrías realizar hoy por alguien más?"
    },
    {
        title: "La Caverna",
        quote: "El conocimiento es la opinión verdadera acompañada de una razón.",
        philosopher: "Platón",
        application: "No te quedes con las sombras (lo que dicen otros, redes sociales). Busca la luz de la verdad cuestionando.",
        prompt: "¿Qué 'sombra' o creencia popular has aceptado hoy sin cuestionar si es realmente real?"
    },
    {
        title: "El Eterno Retorno",
        quote: "¿Qué pasaría si un demonio te dijera que esta vida la tendrás que vivir infinitas veces más?",
        philosopher: "Friedrich Nietzsche",
        application: "Vive de tal manera que desees repetir cada segundo de tu vida por toda la eternidad.",
        prompt: "Si hoy fuera el día que se va a repetir por siempre, ¿estarías feliz de revivir estas últimas horas?"
    },
    {
        title: "Meditación sobre la Muerte",
        quote: "Podrías dejar la vida ahora mismo. Deja que eso determine lo que haces, dices y piensas.",
        philosopher: "Marco Aurelio",
        application: "El Memento Mori no es para deprimirse, sino para priorizar lo que realmente importa y descartar lo trivial.",
        prompt: "Si supieras que te queda 24 horas, ¿qué conflicto o queja de hoy dejaría de tener importancia?"
    },
    {
        title: "Minimalismo Cínico",
        quote: "Busco a un hombre honesto.",
        philosopher: "Diógenes de Sinope",
        application: "Despójate de las pretensiones sociales y las posesiones que te encadenan. La virtud basta para la felicidad.",
        prompt: "¿Qué posesión o estatus social te está robando más libertad de la que te da?"
    },
    {
        title: "Saber que no sabes",
        quote: "Solo sé que no sé nada.",
        philosopher: "Sócrates",
        application: "Mantén una mente de principiante. La verdadera sabiduría empieza cuando admites tu propia ignorancia.",
        prompt: "¿Sobre qué tema has sido demasiado arrogante hoy? ¿Qué podrías aprender si admitieras que no lo sabes todo?"
    },
    {
        title: "El Absurdo",
        quote: "Debemos imaginar a Sísifo feliz.",
        philosopher: "Albert Camus",
        application: "Aunque el mundo parezca no tener sentido, nuestra rebelión consiste en crear nuestro propio significado con alegría.",
        prompt: "¿Qué tarea rutinaria y 'maldita' te toca hoy? ¿Cómo podrías hacerla con una sonrisa desafiante?"
    },
    {
        title: "Ética de la Ambigüedad",
        quote: "El hombre es una pasión inútil, pero es él quien decide su valor.",
        philosopher: "Simone de Beauvoir",
        application: "Tu libertad solo es real si también buscas la libertad de los demás.",
        prompt: "¿Cómo puedes ayudar a que alguien a tu alrededor se sienta hoy un poco más libre?"
    },
    {
        title: "Perspectivismo",
        quote: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.",
        philosopher: "José Ortega y Gasset",
        application: "Tu verdad es solo un punto de vista. Entender tu entorno es vital para entenderte a ti mismo.",
        prompt: "Intenta ver el mayor conflicto de hoy desde la perspectiva de la otra persona. ¿Qué descubres?"
    },
    {
        title: "La Duda Metódica",
        quote: "Pienso, luego existo.",
        philosopher: "René Descartes",
        application: "No aceptes nada como verdadero sin antes haberlo verificado por ti mismo. Confía en tu propia razón.",
        prompt: "¿De qué pensamiento o prejuicio estás tan seguro que podrías estar equivocado?"
    },
    {
        title: "Sustancia y Emoción",
        quote: "No reír, no llorar, no indignarse, sino comprender.",
        philosopher: "Baruch Spinoza",
        application: "Cuando alguien te ataque, no reacciones emocionalmente. Trata de entender las causas físicas y lógicas detrás de su acto.",
        prompt: "Visualiza a alguien que te cae mal. Trata de pensar qué causas biográficas lo llevaron a ser así."
    },
    {
        title: "El Velo de la Ignorancia",
        quote: "La justicia es la primera virtud de las instituciones sociales.",
        philosopher: "John Rawls",
        application: "Si no supieras quién vas a ser en la sociedad, ¿qué leyes querrías? Busca la equidad.",
        prompt: "Si hoy se reseteara el mundo y pudieras ser cualquiera, ¿qué cambio pedirías para los más desfavorecidos?"
    },
    {
        title: "Fluidez (Panta Rhei)",
        quote: "Nadie se baña dos veces en el mismo río.",
        philosopher: "Heráclito",
        application: "Todo cambia constantemente. No te aferres a situaciones o personas; fluye con el cambio.",
        prompt: "¿A qué situación del pasado te estás aferrando que ya no existe en el presente?"
    },
    {
        title: "Apatheia",
        quote: "Libérate de las pasiones que nublan el juicio.",
        philosopher: "Zenón de Citio",
        application: "La paz mental llega cuando tus emociones no son las que conducen el carro, sino tu razón.",
        prompt: "¿Qué emoción intensa te ha dominado hoy? ¿Cómo se vería esa situación desde la calma absoluta?"
    },
    {
        title: "La Voluntad de Poder",
        quote: "Lo que no me mata, me hace más fuerte.",
        philosopher: "Friedrich Nietzsche",
        application: "Usa tus dificultades como combustible para tu desarrollo personal y superación.",
        prompt: "¿Cuál es el obstáculo más grande que enfrentas esta semana? ¿Qué habilidad estás desarrollando gracias a él?"
    },
    {
        title: "Tranquilidad de Ánimo",
        quote: "La mayor parte de nuestras preocupaciones son vanas, de modo que es mejor no prestarles atención.",
        philosopher: "Séneca",
        application: "Aprende a distinguir entre problemas reales y dramas imaginarios generados por el cansancio o el miedo.",
        prompt: "De todo lo que te ha estresado hoy, ¿cuánto seguirá importando dentro de un año?"
    },
    {
        title: "Poder y Conocimiento",
        quote: "Donde hay poder, hay resistencia.",
        philosopher: "Michel Foucault",
        application: "Sé consciente de cómo las estructuras y las normas sociales moldean tu pensamiento y comportamiento.",
        prompt: "¿Qué comportamiento tuyo hoy ha sido dictado por la 'presión social' y no por tu propia voluntad?"
    },
    {
        title: "El Otro",
        quote: "El infierno son los otros.",
        philosopher: "Jean-Paul Sartre",
        application: "A menudo nos vemos a nosotros mismos solo a través del juicio de los demás. Reclama tu propia mirada.",
        prompt: "¿Cuánto de tu felicidad de hoy ha dependido de la aprobación de otra persona?"
    },
    {
        title: "Vitalismo",
        quote: "Vivir es encontrarse en el mundo.",
        philosopher: "José Ortega y Gasset",
        application: "No pienses la vida, ¡vívela! La acción es lo que nos mantiene conectados con la realidad.",
        prompt: "Si hoy dejaras de 'planear' por un momento, ¿qué acción pura y vital te gustaría realizar?"
    },
    {
        title: "Soberanía sobre uno mismo",
        quote: "Sobre su propio cuerpo y mente, el individuo es soberano.",
        philosopher: "John Stuart Mill",
        application: "Defiende tu derecho a pensar diferente, siempre que no dañes a los demás. Tu mente es tu castillo.",
        prompt: "¿En qué idea eres hoy 'rebelde' frente a lo que opina la mayoría de tu entorno?"
    },
    {
        title: "Impermanencia",
        quote: "El cambio es la única constante.",
        philosopher: "Buda (Filosofía Oriental)",
        application: "Acepta que el dolor pasará, pero también que la alegría es efímera. Disfruta el ahora sin apego.",
        prompt: "Mira un objeto a tu alrededor. Visualiza cómo el tiempo lo transformará. ¿Cómo cambia eso tu aprecio por él?"
    },
    {
        title: "Pragmatismo",
        quote: "La verdad es lo que funciona.",
        philosopher: "William James",
        application: "No busques verdades abstractas. Busca qué creencias te hacen ser una mejor persona y vivir mejor.",
        prompt: "¿Qué creencia tienes que, aunque no pueda probarse, te ayuda a ser más feliz o productivo?"
    },
    {
        title: "Sociedad Líquida",
        quote: "Vivimos en un tiempo de incertidumbre constante.",
        philosopher: "Zygmunt Bauman",
        application: "En un mundo que cambia rápido, la adaptabilidad y los vínculos humanos sólidos son tu mejor refugio.",
        prompt: "¿A quién has dedicado tiempo de calidad hoy sin mirar ninguna pantalla?"
    }
];

// 2. JOURNAL LOGIC
const STORAGE_KEY = 'philosophyJournal';

function getEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveEntryData(text, prompt) {
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

function deleteEntryData(id) {
    let entries = getEntries();
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
}

// 3. UI LOGIC
function renderHistoryUI(entries, listContainer) {
    if (entries.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Aún no has escrito ninguna reflexión. Tu viaje comienza con la primera palabra.</p>';
        return;
    }

    listContainer.innerHTML = entries.map(entry => `
        <div class="journal-entry-item">
            <div class="entry-header">
                <span>${entry.date}</span>
                <div class="entry-actions">
                    <span class="action-link delete" onclick="window.confirmDelete(${entry.id})">Borrar</span>
                </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 0.5rem; font-style: italic;">${entry.prompt}</p>
            <p style="white-space: pre-wrap;">${entry.text}</p>
        </div>
    `).join('');
}

function notify(msg, type) {
    const toast = document.createElement('div');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b7355';
    toast.textContent = msg;
    toast.className = 'toast-notification'; // We could add this to CSS if needed
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#e74c3c' : accentColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleParadoxUI(element) {
    const explanation = element.querySelector('.paradox-explanation');
    const isVisible = explanation.style.display === 'block';

    document.querySelectorAll('.paradox-explanation').forEach(exp => {
        exp.style.display = 'none';
        exp.parentElement.style.borderColor = 'rgba(0, 0, 0, 0.1)';
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

// Global functions for HTML
window.nextConcept = function () {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    renderConcept(currentConceptIndex);
};

window.showAnswer = function (choice) {
    const answer = document.getElementById('answer');
    if (answer) {
        answer.style.display = 'block';
        answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

window.toggleParadox = function (element) {
    toggleParadoxUI(element);
};

window.saveEntry = function () {
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

window.toggleHistory = function () {
    const container = document.getElementById('history-container');
    if (!container) return;
    const isVisible = container.style.display === 'block';

    container.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        renderHistoryList();
        container.scrollIntoView({ behavior: 'smooth' });
    }
};

window.confirmDelete = function (id) {
    if (confirm('¿Eliminar esta reflexión?')) {
        deleteEntryData(id);
        renderHistoryList();
    }
};

function renderHistoryList() {
    const list = document.getElementById('entries-list');
    if (list) {
        renderHistoryUI(getEntries(), list);
    }
}

// Bootstrap
function init() {
    console.log("Ejecutando inicialización...");
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    currentConceptIndex = dayOfYear % concepts.length;
    renderConcept(currentConceptIndex);
}

// Multilayer initialization to ensure it runs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
window.onload = init;
