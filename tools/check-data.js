#!/usr/bin/env node
/**
 * Validador de los datos: integridad, relaciones de maestro y cobertura bilingüe.
 * Uso: node tools/check-data.js     (código de salida 1 si hay errores)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = vm.createContext({ console });
const load = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });

// Mismo orden que index.html (sin el DOM)
vm.runInContext("const I18n = { lang: 'es', SOURCE_LANG: 'es' };", ctx);
const conceptFiles = fs.readdirSync(path.join(root, 'js/data/concepts'))
    .filter(f => f !== '_helper.js').sort().map(f => 'js/data/concepts/' + f);
['js/data/taxonomy.js', 'js/data/philosophers.js', 'js/data/concepts/_helper.js',
 ...conceptFiles, 'js/data/paradoxes.js', 'js/core/atlas.js'].forEach(load);

const get = expr => vm.runInContext(expr, ctx);
const PH = get('PHILOSOPHERS'), SC = get('SCHOOLS'), CO = get('CONCEPTS'), PA = get('PARADOXES');
const TOPICS = get('PARADOX_TOPICS'), ERAS = get('ERAS'), LANES = get('LANES');

const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);
const dupes = (list, label) => {
    const seen = new Set();
    list.forEach(i => { if (seen.has(i.id)) err(`${label}: id duplicado «${i.id}»`); seen.add(i.id); });
};

dupes(PH, 'autor'); dupes(SC, 'corriente'); dupes(CO, 'concepto'); dupes(PA, 'paradoja');
const phIds = new Set(PH.map(p => p.id)), scIds = new Set(SC.map(s => s.id)), laneIds = new Set(LANES.map(l => l.id));
const phById = new Map(PH.map(p => [p.id, p]));
const nonEmpty = v => typeof v === 'string' && v.trim().length > 0;

// ---- corrientes
SC.forEach(s => {
    if (!laneIds.has(s.lane)) err(`corriente ${s.id}: carril inexistente «${s.lane}»`);
    ['name', 'period', 'desc'].forEach(k => ['es', 'pt'].forEach(l => nonEmpty(s[k][l]) || err(`corriente ${s.id}: falta ${k}.${l}`)));
    if (!PH.some(p => p.schools.includes(s.id))) warn(`corriente ${s.id}: ningún autor la usa`);
});

// ---- autores y relaciones
PH.forEach(p => {
    p.schools.forEach(s => scIds.has(s) || err(`autor ${p.id}: corriente inexistente «${s}»`));
    ['es', 'pt'].forEach(l => nonEmpty(p.bio[l]) || err(`autor ${p.id}: falta bio.${l}`));
    [['teachers', 'maestro'], ['influences', 'influencia']].forEach(([key, label]) => p[key].forEach(r => {
        const other = phById.get(r);
        if (!other) return err(`autor ${p.id}: ${label} inexistente «${r}»`);
        if (other.born >= p.born) err(`autor ${p.id}: ${label} «${r}» no es anterior (${other.born} ≥ ${p.born})`);
    }));
    if (p.died !== null && p.died < p.born) err(`autor ${p.id}: muerte anterior a nacimiento`);
});
// ciclos en la línea de maestros
PH.forEach(p => {
    const seen = new Set(), stack = [p.id];
    while (stack.length) {
        const cur = phById.get(stack.pop());
        for (const t of cur.teachers) {
            if (t === p.id) err(`ciclo de maestros en ${p.id}`);
            if (!seen.has(t)) { seen.add(t); stack.push(t); }
        }
    }
});

// ---- conceptos
CO.forEach(c => {
    const tag = `concepto ${c.id}`;
    phIds.has(c.author) || err(`${tag}: autor inexistente «${c.author}»`);
    scIds.has(c.school) || err(`${tag}: corriente inexistente «${c.school}»`);
    ['q', 'i'].includes(c.type) || err(`${tag}: tipo inválido «${c.type}»`);
    [1, 2, 3].includes(c.level) || err(`${tag}: nivel inválido`);
    nonEmpty(c.source) || err(`${tag}: falta fuente`);
    Array.isArray(c.tags) && c.tags.length || warn(`${tag}: sin etiquetas`);
    ['es', 'pt'].forEach(l => ['title', 'quote', 'application', 'prompt'].forEach(k => nonEmpty(c[l][k]) || err(`${tag}: falta ${l}.${k}`)));
    if (c.es.quote === c.pt.quote && c.es.quote.length > 25) warn(`${tag}: cita idéntica en es y pt`);
    if (c.type === 'q' && c.es.quote.length > 260) warn(`${tag}: cita textual muy larga (¿es una cita o un resumen?)`);
    const a = phById.get(c.author);
    if (a && !a.schools.includes(c.school)) warn(`${tag}: la corriente «${c.school}» no figura entre las del autor ${c.author}`);
    if (c.type === 'i' && /^[«"“]/.test(c.es.quote)) warn(`${tag}: es 'idea' pero empieza con comillas`);
});

// ---- paradojas
PA.forEach(x => {
    const tag = `paradoja ${x.id}`;
    TOPICS.some(t => t.id === x.topic) || err(`${tag}: tema inexistente «${x.topic}»`);
    if (x.authorId && !phIds.has(x.authorId)) err(`${tag}: autor inexistente «${x.authorId}»`);
    nonEmpty(x.source) || err(`${tag}: falta fuente`);
    ['es', 'pt'].forEach(l => ['title', 'explanation', 'reflection', 'application'].forEach(k => nonEmpty(x[l][k]) || err(`${tag}: falta ${l}.${k}`)));
});

// ---- mezcla de idiomas y erratas de formato
// Solo palabras exclusivas de cada idioma (sobre, entre, porque… existen en ambos)
const SPANISH_IN_PT = /[¿¡ñ]|\b(el|pero|también|cuando|más|siempre|aunque|tus|donde|hacer)\b/i;
const PORTUGUESE_IN_ES = /[ãõç]|\b(não|você|também|uma|são|mais|seu|sua|quando|fazer)\b/i;
const texts = [];
CO.forEach(c => ['title', 'quote', 'application', 'prompt'].forEach(k => texts.push([`concepto ${c.id}.${k}`, c.es[k], c.pt[k]])));
CO.forEach(c => c.note && texts.push([`concepto ${c.id}.note`, c.note.es, c.note.pt]));
PA.forEach(x => ['title', 'explanation', 'reflection', 'application'].forEach(k => texts.push([`paradoja ${x.id}.${k}`, x.es[k], x.pt[k]])));
PA.forEach(x => x.note && texts.push([`paradoja ${x.id}.note`, x.note.es, x.note.pt]));
PH.forEach(p => texts.push([`autor ${p.id}.bio`, p.bio.es, p.bio.pt]));
SC.forEach(s => texts.push([`corriente ${s.id}.desc`, s.desc.es, s.desc.pt]));
texts.forEach(([where, es, pt]) => {
    if (SPANISH_IN_PT.test(pt)) warn(`${where}: ¿español en el texto portugués? «${pt.match(SPANISH_IN_PT)[0]}»`);
    if (PORTUGUESE_IN_ES.test(es)) warn(`${where}: ¿portugués en el texto español? «${es.match(PORTUGUESE_IN_ES)[0]}»`);
    for (const [lang, txt] of [['es', es], ['pt', pt]]) {
        if (/\s{2,}|\s[.,;:](?!\.)|(?<!\.)\.\.(?!\.)/.test(txt)) warn(`${where} (${lang}): espacios o puntuación raros`);
        if (/["]/.test(txt)) warn(`${where} (${lang}): comillas rectas (usar «» o “”)`);
        if (/^\s|\s$/.test(txt)) warn(`${where} (${lang}): espacios sobrantes`);
    }
});

// ---- informe
const era = id => PH.filter(p => p.era === id).length;
console.log(`Conceptos: ${CO.length}  (citas textuales: ${CO.filter(c => c.type === 'q').length}, ideas resumidas: ${CO.filter(c => c.type === 'i').length}, con nota de atribución: ${CO.filter(c => c.note).length})`);
console.log(`Paradojas: ${PA.length}   Autores: ${PH.length}   Corrientes: ${SC.length}`);
console.log('Autores por época: ' + ERAS.map(e => `${e.id} ${era(e.id)}`).join(' · '));
const noConcepts = PH.filter(p => !CO.some(c => c.author === p.id)).map(p => p.id);
console.log(`Autores solo de enlace (sin conceptos): ${noConcepts.length} → ${noConcepts.join(', ')}`);
const edges = PH.reduce((n, p) => n + p.teachers.length, 0), infl = PH.reduce((n, p) => n + p.influences.length, 0);
console.log(`Relaciones: ${edges} de maestro directo, ${infl} de influencia`);
warnings.forEach(w => console.log('  aviso: ' + w));
errors.forEach(e => console.log('  ERROR: ' + e));
console.log(errors.length ? `\n${errors.length} error(es)` : '\nDatos válidos');
process.exit(errors.length ? 1 : 0);
