const concepts = [
    {
        title: "Dicotomía del Control",
        category: "ESTOICISMO"
    },
    {
        title: "Existencialismo (Esencia)",
        category: "EXISTENCIALISMO"
    },
    {
        title: "Impermanencia",
        category: "ORIENTAL"
    }
];

let filteredConcepts = [...concepts];
let currentCategory = 'TODOS';

function filterCategory(category) {
    currentCategory = category;
    if (category === 'TODOS') {
        filteredConcepts = [...concepts];
    } else {
        applyCategoryFilter();
    }
    console.log(`Filtering by ${category}: Found ${filteredConcepts.length} concepts.`);
    filteredConcepts.forEach(c => console.log(` - ${c.title} (${c.category})`));
}

function applyCategoryFilter() {
    filteredConcepts = filteredConcepts.filter(c => c.category === currentCategory);
}

// Test cases
console.log("--- TEST START ---");
filterCategory('ESTOICISMO');
filterCategory('ORIENTAL');
filterCategory('EXISTENCIALISMO');
filterCategory('TODOS');
console.log("--- TEST END ---");
