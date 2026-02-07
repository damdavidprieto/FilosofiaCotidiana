// Manual test script - Run this in browser console
console.log("=== TESTING FILTER LOGIC ===");

// 1. Check if concepts is defined
if (typeof concepts === 'undefined') {
    console.error("❌ ERROR: 'concepts' is not defined!");
} else {
    console.log(`✅ concepts array exists: ${concepts.length} items`);
}

// 2. Check if concepts have 'category' property
const withCategory = concepts.filter(c => c.category);
console.log(`✅ Concepts with 'category': ${withCategory.length}`);

if (withCategory.length === 0) {
    console.error("❌ NO CONCEPTS HAVE 'category' PROPERTY!");
} else {
    console.log(`✅ First category found: "${withCategory[0].category}"`);
}

// 3. Test filtering by EXISTENCIALISMO
const existencialismo = concepts.filter(c => c.category === 'EXISTENCIALISMO');
console.log(`\n=== EXISTENCIALISMO Filter Test ===`);
console.log(`Found: ${existencialismo.length} concepts`);
if (existencialismo.length > 0) {
    console.log("Titles:");
    existencialismo.forEach(c => console.log(`  - ${c.title}`));
} else {
    console.error("❌ NO EXISTENCIALISMO CONCEPTS FOUND!");
}

// 4. Test filtering by ESTOICISMO
const estoicismo = concepts.filter(c => c.category === 'ESTOICISMO');
console.log(`\n=== ESTOICISMO Filter Test ===`);
console.log(`Found: ${estoicismo.length} concepts`);
if (estoicismo.length > 0) {
    console.log("Titles:");
    estoicismo.forEach(c => console.log(`  - ${c.title}`));
}

// 5. Show all unique categories
const allCategories = [...new Set(concepts.map(c => c.category))];
console.log(`\n=== All Categories Found ===`);
allCategories.forEach(cat => {
    const count = concepts.filter(c => c.category === cat).length;
    console.log(`  ${cat}: ${count} concepts`);
});

// 6. Test if showExistencialismo function exists
if (typeof showExistencialismo === 'undefined') {
    console.error("❌ showExistencialismo() function NOT DEFINED!");
} else {
    console.log("\n✅ showExistencialismo() function exists");
    console.log("You can manually call: showExistencialismo()");
}

console.log("\n=== END OF TEST ===");
