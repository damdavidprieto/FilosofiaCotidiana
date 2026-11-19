#!/usr/bin/env node
/**
 * Pruebas de extremo a extremo en un navegador real (Playwright + Chromium).
 *
 * Uso:   node tools/e2e.js [url]          (por defecto http://localhost:8765/index.html)
 * Antes: python3 -m http.server 8765      (desde la raíz del proyecto)
 *
 * Requiere el paquete «playwright» instalado (no es dependencia del proyecto).
 */
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html';

let failures = 0;
const ok = (name, cond, extra = '') => {
    if (!cond) failures++;
    console.log(`${cond ? 'OK  ' : 'FAIL'} ${name}${extra !== '' ? '  → ' + extra : ''}`);
};

(async () => {
    const browser = await chromium.launch();
    const errors = [];
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push('pageerror: ' + e.message));
    page.on('console', m => m.type() === 'error' && errors.push('console: ' + m.text()));

    const count = sel => page.locator(sel).count();
    const text = sel => page.textContent(sel);
    const cards = '[data-view=concepts] .concept-card';

    // Favoritos guardados por la versión anterior (objetos con título en español)
    await page.addInitScript(() => {
        if (!localStorage.getItem('philosophy-favorites')) {
            localStorage.setItem('philosophy-favorites', JSON.stringify([{ title: 'Dicotomía del Control' }, { title: 'Concepto que ya no existe' }]));
        }
    });
    await page.goto(URL);

    // ----- carga y datos -----
    ok('sin errores al cargar', errors.length === 0, errors.join(' | '));
    ok('estadísticas reales', (await text('#concepts-count')) === String(await page.evaluate(() => CONCEPTS.length)));
    ok('10 tarjetas por página en escritorio', (await count(cards)) === 10);
    ok('migración de favoritos antiguos (1 válido de 2)', (await text('#favorites-count')) === '1');
    ok('tarjetas muestran fuente y tipo (cita/idea)', (await count(cards + ' .source')) === 10 && (await count(cards + ' .kind-badge')) === 10);

    // ----- explorar por corriente -----
    await page.click('.explore-card[data-id=estoicismo]');
    ok('filtro por corriente (Estoicismo)', (await count(cards)) === 9, await text('[data-view=concepts] [data-role=count]'));
    ok('chip de filtro activo', (await count('[data-role=active-filters] .chip.removable')) === 1);
    ok('ficha de la corriente con autores', (await count('.context-card .chips .chip')) >= 4);

    // corriente + época
    await page.click('[data-tab=eras]');
    await page.click('.explore-card.era[data-id=moderna]');
    ok('corriente + época incompatibles → vacío', (await count('[data-view=concepts] .empty-state')) === 1);
    await page.click('[data-remove=school]');
    ok('quitar filtro de corriente deja la época', (await count(cards)) > 0 && (await count('[data-role=active-filters] .chip.removable')) === 1);
    await page.click('[data-remove=all]');
    ok('quitar todos los filtros', (await count('[data-role=active-filters] .chip.removable')) === 0 && (await text('[data-view=concepts] [data-role=count]')).startsWith(await page.evaluate(() => String(CONCEPTS.length))));

    // ----- por autor y cadena de maestros -----
    await page.click('[data-tab=authors]');
    await page.fill('[data-role=author-search]', 'arist');
    await page.click('.author-item');
    const chain = await page.locator('.context-card .chain li').allTextContents();
    ok('cadena de maestros de Aristóteles = Sócrates → Platón → Aristóteles', chain.map(s => s.trim()).join('>') === 'Sócrates>Platón>Aristóteles', chain.join('>'));
    ok('filtra conceptos del autor', (await count(cards)) === 8);
    await page.click('.context-card .relation .chip:has-text("Platón")');
    const students = await page.locator('.context-card .relation:has(h4:text("Discípulos")) .chip').allTextContents();
    ok('Platón: discípulo directo Aristóteles', students.some(s => s.includes('Aristóteles')), students.join(','));

    // ----- mapa de linaje -----
    await page.click('[data-tab=lineage]');
    ok('el mapa dibuja todos los autores', (await count('.lineage-svg .node')) === (await page.evaluate(() => PHILOSOPHERS.length)));
    await page.click('.lineage-svg .node[data-id=foucault]');
    ok('selección resalta linaje', (await count('.lineage-svg .node.related')) >= 4 && (await count('.lineage-svg.has-selection')) === 1);
    ok('ficha de Foucault: maestro Canguilhem', (await text('.context-card')).includes('Georges Canguilhem'));
    ok('el mapa no se vuelve a dibujar al seleccionar (conserva scroll)', (await count('.lineage-svg')) === 1);
    await page.click('[data-remove=all]');

    // ----- búsqueda, favoritos, diálogo -----
    await page.fill('[data-view=concepts] [data-role=search]', 'epicteto');
    ok('búsqueda por autor', (await count(cards)) === 2);
    await page.fill('[data-view=concepts] [data-role=search]', 'zzzz');
    ok('estado vacío', (await count('[data-view=concepts] .empty-state')) === 1);
    await page.fill('[data-view=concepts] [data-role=search]', '');
    await page.click(cards + ':first-child [data-action=favorite]');
    ok('favorito suma', (await text('#favorites-count')) === '2');
    await page.click('#favorites-only-btn');
    ok('solo favoritos', (await count(cards)) === 2);
    await page.click('#favorites-only-btn');

    await page.focus(cards + ':first-child [data-action=detail]');
    await page.keyboard.press('Enter');
    ok('el botón «leer más» abre el detalle con el teclado', await page.locator('#concept-dialog').evaluate(d => d.open));
    ok('detalle muestra fuente y aviso de cita/idea', (await text('#concept-dialog')).includes('Fuente:'));
    await page.click('#concept-dialog [data-author]');
    ok('autor del diálogo abre el explorador', !(await page.locator('#concept-dialog').evaluate(d => d.open)) && (await count('.context-card h3')) === 1);
    await page.click(cards + ':first-child');
    await page.keyboard.press('Escape');
    ok('Esc cierra el diálogo', !(await page.locator('#concept-dialog').evaluate(d => d.open)));

    // ----- paradojas -----
    ok('paradojas paginadas', (await count('[data-view=paradoxes] .paradox-card')) === 10);
    await page.click('[data-view=paradoxes] .paradox-category-pill:has-text("Lógica")');
    const logica = await count('[data-view=paradoxes] .paradox-card');
    ok('filtro por tema de paradoja', logica >= 2 && logica < 10, logica);
    await page.click('[data-view=paradoxes] .paradox-card:first-child');
    ok('detalle de paradoja con fuente', (await text('#paradox-dialog')).includes('Fuente:'));
    await page.keyboard.press('Escape');

    // ----- portugués -----
    await page.click('.lang-btn[data-lang=pt]');
    ok('PT sin recargar: título', (await text('.header-title')).includes('Filosofia'));
    ok('PT: tarjetas traducidas', (await text(cards + ':first-child')).length > 0 && !(await text(cards + ':first-child .kind-badge')).match(/Cita$/));
    ok('PT: html lang', (await page.getAttribute('html', 'lang')) === 'pt');
    await page.click('[data-tab=schools]');
    if (await count('[data-remove=all]')) await page.click('[data-remove=all]');
    ok('PT: corrientes traducidas', (await text('.explore-card[data-id=epicureismo]')).includes('Epicurismo'));
    await page.fill('[data-view=concepts] [data-role=search]', 'dicotomia');
    ok('PT: búsqueda en portugués', (await count(cards)) >= 1);
    await page.fill('[data-view=concepts] [data-role=search]', '');
    const ptTitles = await page.locator(cards + ' .concept-title').allTextContents();
    const knownPt = await page.evaluate(() => CONCEPTS.map(c => c.pt.title));
    ok('PT: los títulos visibles son los del portugués', ptTitles.length === 10 && ptTitles.every(t => knownPt.includes(t)), ptTitles.slice(0, 2).join(' | '));

    // ----- diario -----
    await page.fill('#journal-entry', 'Reflexão <b>teste</b>');
    page.once('dialog', d => d.accept());
    await page.click('[data-action=save-journal]');
    await page.click('[data-action=toggle-history]');
    ok('diario escapa HTML', (await page.innerHTML('#journal-entries-list')).includes('&lt;b&gt;'));

    // ----- persistencia y tema -----
    await page.reload();
    ok('idioma persiste', (await page.getAttribute('html', 'lang')) === 'pt');
    await page.click('[data-action=toggle-theme]');
    ok('tema oscuro', (await page.getAttribute('html', 'data-theme')) === 'dark');

    // ----- móvil -----
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    ok('móvil: 5 tarjetas', (await count(cards)) === 5, await count(cards));
    ok('móvil: sin desbordamiento horizontal de la página', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    await page.click('[data-tab=lineage]');
    ok('móvil: el mapa se desplaza dentro de su contenedor', await page.evaluate(() => {
        const el = document.querySelector('.lineage-scroll');
        return el.scrollWidth > el.clientWidth && document.documentElement.scrollWidth <= window.innerWidth + 1;
    }));

    ok('sin errores de consola en toda la sesión', errors.length === 0, errors.join(' | '));
    console.log(failures ? `\n${failures} prueba(s) fallida(s)` : '\nTodas las pruebas pasan');
    await browser.close();
    process.exit(failures ? 1 : 0);
})();
