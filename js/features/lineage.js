/**
 * Feature · mapa de linaje
 *
 * Dibuja a todos los autores en un SVG: eje horizontal = año de nacimiento,
 * carriles = grupos de corrientes. Línea continua = maestro directo; línea
 * discontinua = influencia. Al seleccionar un autor se resaltan sus ancestros y
 * descendientes y se atenúa el resto.
 */
const Lineage = (() => {
    const MIN_YEAR = -660, MAX_YEAR = 2010;
    const LEFT = 150, TOP = 34, ROW_H = 24, LANE_PAD = 12, RIGHT_PAD = 170;
    const CHAR_W = 6.4;
    const TICKS = [-500, 0, 500, 1000, 1500, 1800, 1900, 2000];
    const ERA_STARTS = [{ id: 'medieval', year: 300 }, { id: 'moderna', year: 1450 }, { id: 'contemporanea', year: 1770 }];

    // Escala por tramos: la Edad Media tiene pocos autores y los siglos XVIII–XX muchos.
    const SEGMENTS = [[MIN_YEAR, 300, 1.0], [300, 1450, 0.2], [1450, 1770, 1.15], [1770, MAX_YEAR, 2.6]];
    const xOf = year => {
        let x = LEFT;
        for (const [from, to, px] of SEGMENTS) {
            if (year <= from) break;
            x += (Math.min(year, to) - from) * px;
        }
        return x;
    };
    const nameOf = p => I18n.pick(p.name);

    /** Reparte los autores de cada carril en filas para que las etiquetas no se solapen. */
    function layout() {
        const nodes = new Map();
        let y = TOP;
        const lanes = [];
        Atlas.lanes.forEach(lane => {
            const members = PHILOSOPHERS.filter(p => p.lane === lane.id).sort((a, b) => a.born - b.born);
            const rowEnds = [];
            members.forEach(p => {
                const x = xOf(p.born);
                const width = nameOf(p).length * CHAR_W + 18;
                let row = rowEnds.findIndex(end => end + 6 < x);
                if (row === -1) { row = rowEnds.length; rowEnds.push(0); }
                rowEnds[row] = x + width;
                nodes.set(p.id, { p, x, row, laneId: lane.id });
            });
            const height = Math.max(1, rowEnds.length) * ROW_H + LANE_PAD * 2;
            lanes.push({ lane, top: y, height });
            members.forEach(p => { const n = nodes.get(p.id); n.y = y + LANE_PAD + n.row * ROW_H + ROW_H / 2; });
            y += height;
        });
        return { nodes, lanes, height: y + 10, width: xOf(MAX_YEAR) + RIGHT_PAD };
    }

    function edgePath(a, b) {
        const dx = Math.max(24, (b.x - a.x) / 2);
        return `M${a.x},${a.y} C${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x},${b.y}`;
    }

    function build() {
        const { nodes, lanes, height, width } = layout();
        let svg = `<svg class="lineage-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="group" aria-label="${esc(t('tab_lineage'))}">`;

        // carriles
        lanes.forEach(({ lane, top, height: h }, i) => {
            svg += `<rect class="lane-band${i % 2 ? ' alt' : ''}" x="0" y="${top}" width="${width}" height="${h}"/>`;
            svg += `<text class="lane-label" x="10" y="${top + 18}">${esc(I18n.pick(lane.name))}</text>`;
        });
        // eje temporal
        TICKS.forEach(year => {
            const x = xOf(year);
            svg += `<line class="tick" x1="${x}" y1="${TOP - 6}" x2="${x}" y2="${height}"/>`;
            svg += `<text class="tick-label" x="${x + 3}" y="14">${esc(year < 0 ? `${-year} a.C.` : year === 0 ? '0' : year)}</text>`;
        });
        ERA_STARTS.forEach(({ id, year }) => {
            const x = xOf(year);
            svg += `<line class="era-line" x1="${x}" y1="${TOP - 6}" x2="${x}" y2="${height}"/>`;
            svg += `<text class="era-label" x="${x + 3}" y="28">${esc(I18n.pick(Atlas.eras.get(id).name))}</text>`;
        });

        // relaciones
        const edge = (from, to, kind) => {
            const a = nodes.get(from), b = nodes.get(to);
            if (a && b) svg += `<path class="edge ${kind}" data-from="${from}" data-to="${to}" d="${edgePath(a, b)}"/>`;
        };
        PHILOSOPHERS.forEach(p => {
            p.influences.forEach(src => edge(src, p.id, 'influence'));
            p.teachers.forEach(src => edge(src, p.id, 'teacher'));
        });

        // autores
        nodes.forEach(({ p, x, y }) => {
            svg += `<g class="node era-${p.era}" data-id="${p.id}" tabindex="0" role="button" aria-label="${esc(nameOf(p))}">
                <circle cx="${x}" cy="${y}" r="5.5"/>
                <text x="${x + 10}" y="${y + 4}">${esc(nameOf(p))}</text></g>`;
        });
        return { svg: svg + '</svg>', nodes };
    }

    return {
        /** Pinta el mapa en `container`. Devuelve { select(id) }. */
        mount(container, onSelect) {
            const { svg, nodes } = build();
            container.innerHTML = svg;
            const root = container.querySelector('svg');

            const select = (id, { scroll = true } = {}) => {
                const related = id ? Atlas.relatedSet(id) : null;
                root.classList.toggle('has-selection', Boolean(id));
                root.querySelectorAll('.node').forEach(n => {
                    n.classList.toggle('selected', n.dataset.id === id);
                    n.classList.toggle('related', Boolean(related) && related.has(n.dataset.id));
                });
                root.querySelectorAll('.edge').forEach(e => {
                    e.classList.toggle('related', Boolean(related) && related.has(e.dataset.from) && related.has(e.dataset.to));
                });
                if (id && scroll && nodes.get(id)) {
                    container.scrollTo({ left: Math.max(0, nodes.get(id).x - container.clientWidth / 3), behavior: 'smooth' });
                }
            };

            const choose = target => {
                const node = target.closest('.node');
                if (node) onSelect(node.dataset.id);
            };
            root.addEventListener('click', e => choose(e.target));
            root.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(e.target); }
            });

            return { select };
        }
    };
})();
