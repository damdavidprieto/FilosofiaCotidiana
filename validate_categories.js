// Script para validar categorías
const fs = require('fs');

// Leer data.js y extraer títulos de concepts
const dataContent = fs.readFileSync('js/data.js', 'utf8');
const conceptsMatch = dataContent.match(/const concepts = \[([\s\S]*?)\];/);
const conceptsText = conceptsMatch[1];

// Extraer todos los títulos
const titles = [];
const titleMatches = conceptsText.matchAll(/title:\s*"([^"]+)"/g);
for (const match of titleMatches) {
    titles.push(match[1]);
}

console.log(`Total de conceptos encontrados: ${titles.length}\n`);

// Categorías definidas en features.js
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
        'Performatividad de Género', 'Interseccionalidad'
    ]
};

// Validar cada categoría
console.log('VALIDACIÓN DE CATEGORÍAS:\n');
for (const [catName, catTitles] of Object.entries(categories)) {
    console.log(`\n${catName}:`);
    const notFound = [];
    for (const title of catTitles) {
        if (!titles.includes(title)) {
            notFound.push(title);
        }
    }
    if (notFound.length > 0) {
        console.log(`  ❌ NO ENCONTRADOS (${notFound.length}):`);
        notFound.forEach(t => console.log(`     - "${t}"`));
    } else {
        console.log(`  ✅ Todos los ${catTitles.length} conceptos existen`);
    }
}

// Conceptos sin categoría
const allCategorized = Object.values(categories).flat();
const uncategorized = titles.filter(t => !allCategorized.includes(t));
console.log(`\n\nCONCEPTOS SIN CATEGORÍA (${uncategorized.length}):`);
uncategorized.forEach(t => console.log(`  - "${t}"`));
