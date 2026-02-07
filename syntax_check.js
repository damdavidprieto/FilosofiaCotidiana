try {
    const fs = require('fs');
    const vm = require('vm');

    // Check data.js
    const dataCode = fs.readFileSync('C:\\Proyectos\\Development\\FilosofiaCotidiana\\js\\data.js', 'utf8');
    vm.runInNewContext(dataCode, {});
    console.log("data.js syntax OK");

    // Check features.js (needs mocking)
    const featuresCode = fs.readFileSync('C:\\Proyectos\\Development\\FilosofiaCotidiana\\js\\features.js', 'utf8');
    const mockContext = {
        document: { querySelectorAll: () => [], getElementById: () => ({}) },
        window: {},
        localStorage: { getItem: () => "[]", setItem: () => { } },
        navigator: {},
        concepts: [], // Mock concepts
        isFavorite: () => false,
        displayConcept: () => { },
        showNoResults: () => { },
        console: console
    };
    vm.runInNewContext(featuresCode, mockContext);
    console.log("features.js syntax OK");

} catch (e) {
    console.error("SYNTAX ERROR:", e.message);
    if (e.stack) console.error(e.stack);
}
