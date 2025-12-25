// Conceptos filosóficos
const concepts = [
    {
        title: "Estoicismo",
        quote: "No podemos controlar lo que nos sucede, pero sí cómo respondemos a ello.",
        philosopher: "Marco Aurelio, Epicteto, Séneca",
        application: "Cuando algo sale mal, pregúntate: ¿Está bajo mi control? Si no, acéptalo. Si sí, actúa."
    },
    {
        title: "Existencialismo",
        quote: "La existencia precede a la esencia. Tú creas tu propio significado.",
        philosopher: "Jean-Paul Sartre",
        application: "No esperes que la vida tenga un propósito predefinido. Tú decides qué es importante para ti."
    },
    {
        title: "Minimalismo (Diógenes)",
        quote: "Quien tiene menos necesidades, es más libre.",
        philosopher: "Diógenes de Sinope",
        application: "Antes de comprar algo, pregúntate: ¿Realmente lo necesito o solo lo deseo?"
    },
    {
        title: "Memento Mori",
        quote: "Recuerda que morirás. No para temer, sino para vivir plenamente.",
        philosopher: "Tradición estoica",
        application: "¿Qué harías hoy si supieras que te queda poco tiempo? Hazlo."
    },
    {
        title: "Navaja de Ockham",
        quote: "La explicación más simple suele ser la correcta.",
        philosopher: "Guillermo de Ockham",
        application: "Cuando algo va mal, busca primero las causas obvias antes de complicarte."
    }
];

let currentConceptIndex = 0;

// Cambiar concepto del día
function nextConcept() {
    currentConceptIndex = (currentConceptIndex + 1) % concepts.length;
    const concept = concepts[currentConceptIndex];

    const card = document.getElementById('daily-card');
    card.style.opacity = '0';

    setTimeout(() => {
        card.querySelector('.concept-title').textContent = concept.title;
        card.querySelector('.concept-definition').textContent = concept.quote;
        card.querySelector('.concept-details').innerHTML = `
            <p><strong>Filósofo:</strong> ${concept.philosopher}</p>
            <p><strong>Aplicación práctica:</strong> ${concept.application}</p>
        `;
        card.style.opacity = '1';
    }, 300);
}

// Mostrar respuesta del experimento mental
function showAnswer(choice) {
    const answer = document.getElementById('answer');
    answer.style.display = 'block';
    answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Toggle paradoja
function toggleParadox(element) {
    const explanation = element.querySelector('.paradox-explanation');
    const isVisible = explanation.style.display === 'block';

    // Cerrar todas las demás
    document.querySelectorAll('.paradox-explanation').forEach(exp => {
        exp.style.display = 'none';
    });

    // Toggle la actual
    explanation.style.display = isVisible ? 'none' : 'block';
}

// Guardar entrada del diario
function saveEntry() {
    const entry = document.getElementById('journal-entry').value;

    if (!entry.trim()) {
        alert('Escribe algo primero 😊');
        return;
    }

    const date = new Date().toLocaleDateString('es-ES');
    const entries = JSON.parse(localStorage.getItem('philosophyJournal') || '[]');

    entries.push({
        date: date,
        text: entry
    });

    localStorage.setItem('philosophyJournal', JSON.stringify(entries));

    alert('✓ Reflexión guardada');
    document.getElementById('journal-entry').value = '';
}

// Animación suave al cargar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';

        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
});
