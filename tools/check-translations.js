#!/usr/bin/env node
/**
 * Informe de cobertura de traducciones y consistencia de datos.
 * Uso: node tools/check-translations.js   (sale con código 1 si hay errores de datos)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = vm.createContext({ console });
const load = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });

load('js/core/utils.js');
vm.runInContext('const I18n = { registerContent(t,l,f){ (globalThis.__c ||= {})[t+":"+l] = f; } };', ctx);
['js/data/concepts.js', 'js/data/paradoxes.js', 'js/i18n/concepts.pt.js', 'js/i18n/paradoxes.pt.js'].forEach(load);

const get = name => vm.runInContext(name, ctx);
const concepts = get('PHILOSOPHY_DATABASE.concepts');
const paradoxes = get('PARADOXES_DATABASE');
const dicts = get('globalThis.__c');
let errors = 0;

function report(label, items, type, fields) {
    console.log(`\n${label}: ${items.length} elementos`);
    const dup = items.map(i => i.title).filter((t, i, a) => a.indexOf(t) !== i);
    if (dup.length) { errors++; console.log(`  ✗ títulos duplicados: ${dup.join(', ')}`); }
    for (const field of fields) {
        const dict = dicts[`${type}:pt`][field];
        const missing = items.filter(i => !dict[i[field]]);
        const pct = Math.round(100 * (items.length - missing.length) / items.length);
        console.log(`  ${field.padEnd(12)} PT ${String(items.length - missing.length).padStart(3)}/${items.length} (${pct}%)`);
    }
}

report('Conceptos', concepts, 'concepts', ['title', 'category', 'quote', 'application']);
report('Paradojas', paradoxes, 'paradoxes', ['title', 'explanation', 'reflection', 'application', 'category']);
process.exit(errors ? 1 : 0);
