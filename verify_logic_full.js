try {
    const fs = require('fs');
    const vm = require('vm');

    console.log("Reading data.js...");
    const dataCode = fs.readFileSync('C:\\Proyectos\\Development\\FilosofiaCotidiana\\js\\data.js', 'utf8');

    // Create global context for data.js
    const context = {
        console: console,
        categories: {} // Just in case
    };
    vm.createContext(context);
    vm.runInContext(dataCode, context);

    if (!context.concepts || context.concepts.length === 0) {
        throw new Error("data.js did not define 'concepts' array or it's empty.");
    }
    console.log(`Concepts loaded: ${context.concepts.length}`);

    // Verify one concept has category
    if (!context.concepts[0].category) {
        throw new Error("Concept 0 missing 'category' property! data.js is likely outdated/corrupt.");
    }
    console.log(`Concept 0 category: ${context.concepts[0].category}`);

    // Mock browser environment for features.js
    context.document = {
        getElementById: (id) => {
            if (id === 'search-input') return { value: '' }; // Empty search query
            if (id === 'theme-icon') return {};
            if (id === 'daily-card') return { innerHTML: '' };
            if (id === 'stats-dashboard') return { style: {} };
            return {};
        },
        querySelectorAll: () => [], // Empty nodelist for buttons
        documentElement: {
            getAttribute: () => 'light',
            setAttribute: () => { }
        },
        body: { appendChild: () => { } },
        createElement: () => ({ className: '', classList: { remove: () => { } } }),
        addEventListener: () => { }
    };
    context.window = { location: { href: '' } };
    context.navigator = { clipboard: { writeText: () => Promise.resolve() } };
    context.localStorage = {
        getItem: () => "[]",
        setItem: () => { }
    };
    context.event = { target: { classList: { add: () => { } } } }; // Mock event

    // Globals expected by features.js (it uses 'concepts' that we already loaded)

    console.log("Reading features.js...");
    const featuresCode = fs.readFileSync('C:\\Proyectos\\Development\\FilosofiaCotidiana\\js\\features.js', 'utf8');

    // We need to inject displayConcept mock or features.js might fail if called immediately
    context.displayConcept = (concept) => { console.log(`DISPLAY CONCEPT: ${concept.title}`); };
    context.showNoResults = () => { console.log("DISPLAY: No results found."); };

    vm.runInContext(featuresCode, context);
    console.log("features.js executed successfully.");

    // Now trigger the filter logic
    console.log("\n--- TESTING FILTER LOGIC ---");

    console.log("Calling filterCategory('ESTOICISMO')...");
    context.filterCategory('ESTOICISMO');

    if (context.filteredConcepts.length === 0) {
        console.error("FAIL: filteredConcepts is empty after filtering by ESTOICISMO!");
    } else {
        console.log(`SUCCESS: filteredConcepts has ${context.filteredConcepts.length} items.`);
        context.filteredConcepts.forEach(c => console.log(` -Found: ${c.title}`));
    }

    console.log("\nCalling filterCategory('ORIENTAL')...");
    context.filterCategory('ORIENTAL');

    if (context.filteredConcepts.length === 0) {
        console.error("FAIL: filteredConcepts is empty after filtering by ORIENTAL!");
    } else {
        console.log(`SUCCESS: filteredConcepts has ${context.filteredConcepts.length} items.`);
    }

} catch (e) {
    console.error("CRITICAL ERROR:", e.message);
    if (e.stack) console.error(e.stack);
}
