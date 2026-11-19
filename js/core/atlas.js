/**
 * Core · Atlas
 *
 * Índices sobre los datos (épocas, corrientes, autores, conceptos, paradojas) y
 * consultas de linaje. No toca el DOM. Debe cargarse después de js/data/*.
 */

const Atlas = (() => {
    const byId = list => new Map(list.map(item => [item.id, item]));

    const eraOfYear = year => (year < 300 ? 'antigua' : year < 1450 ? 'medieval' : year < 1770 ? 'moderna' : 'contemporanea');

    const eras = new Map(ERAS.map(e => [e.id, e]));
    const lanes = new Map(LANES.map(l => [l.id, l]));
    const schools = byId(SCHOOLS);
    const philosophers = byId(PHILOSOPHERS);

    PHILOSOPHERS.forEach(p => {
        p.era = eraOfYear(p.born);
        p.lane = schools.get(p.schools[0])?.lane;
    });

    // Inversas de las relaciones de maestro e influencia
    const studentsOf = new Map(PHILOSOPHERS.map(p => [p.id, []]));
    const influencedOf = new Map(PHILOSOPHERS.map(p => [p.id, []]));
    PHILOSOPHERS.forEach(p => {
        p.teachers.forEach(t => studentsOf.get(t)?.push(p.id));
        p.influences.forEach(i => influencedOf.get(i)?.push(p.id));
    });

    // Recuentos de conceptos
    const eraOfConcept = c => philosophers.get(c.author)?.era;
    const count = (key, id) => CONCEPTS.filter(c => (key === 'era' ? eraOfConcept(c) : c[key]) === id).length;

    const formatYear = y => (y < 0 ? `${-y} a.C.` : `${y}`);

    return {
        eras, lanes, schools, philosophers,
        concepts: CONCEPTS,
        paradoxes: PARADOXES,
        eraOfConcept,
        conceptCount: { author: id => count('author', id), school: id => count('school', id), era: id => count('era', id) },

        studentsOf: id => studentsOf.get(id) || [],
        influencedOf: id => influencedOf.get(id) || [],

        /** Texto de fechas: «c. 384 a.C. – 322 a.C.», «n. 1929»… */
        dates(p) {
            if (p.label) return p.label;
            const c = p.approx ? 'c. ' : '';
            if (p.died === null) return `n. ${c}${formatYear(p.born)}`;
            return `${c}${formatYear(p.born)} – ${formatYear(p.died)}`;
        },

        /** Cadena de maestros directos hacia arriba, de la raíz al autor. */
        teacherChain(id) {
            const chain = [id];
            const seen = new Set(chain);
            let current = philosophers.get(id);
            while (current && current.teachers.length) {
                const next = current.teachers[0];
                if (seen.has(next)) break;
                chain.unshift(next);
                seen.add(next);
                current = philosophers.get(next);
            }
            return chain;
        },

        /** Todos los descendientes por línea de maestro directo (árbol). */
        studentTree(id, seen = new Set()) {
            seen.add(id);
            return studentsOf.get(id)
                .filter(s => !seen.has(s))
                .map(s => ({ id: s, children: this.studentTree(s, seen) }));
        },

        /** Ancestros y descendientes (maestros e influencias) para resaltar en el mapa. */
        relatedSet(id) {
            const set = new Set([id]);
            const up = key => philosophers.get(key).teachers.concat(philosophers.get(key).influences);
            const down = key => studentsOf.get(key).concat(influencedOf.get(key));
            const walk = next => {
                const stack = [id];
                while (stack.length) {
                    for (const n of next(stack.pop())) if (!set.has(n)) { set.add(n); stack.push(n); }
                }
            };
            walk(up);
            // los descendientes se recorren aparte para no mezclar ramas colaterales
            const downSet = new Set([id]);
            const stack = [id];
            while (stack.length) {
                for (const n of down(stack.pop())) if (!downSet.has(n)) { downSet.add(n); stack.push(n); set.add(n); }
            }
            return set;
        },

        /** Texto de un concepto o paradoja en el idioma actual. */
        text: item => item[I18n.lang] || item[I18n.SOURCE_LANG]
    };
})();
