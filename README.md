# 📖 Filosofía Cotidiana

**Conceptos de la filosofía occidental y oriental, con su fuente, explorables por corriente, época y autor, y con el linaje de maestros y discípulos.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Pure JS](https://img.shields.io/badge/Vanilla-JS-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Demo Live](https://img.shields.io/badge/Demo-Live_App-orange.svg)](https://damdavidprieto.github.io/FilosofiaCotidiana/)

![Vista previa](assets/preview.png)

## ✨ Qué ofrece

- **152 conceptos** de 100 autores y 36 corrientes (Grecia, Roma, China, India, Edad Media, Moderna y Contemporánea). Cada uno incluye **autor, fuente concreta, aplicación práctica y pregunta de reflexión**.
- **Explorar por corriente, época o autor**, combinando con búsqueda y favoritos.
- **Mapa de linaje**: quién fue maestro directo (línea continua) o influencia (línea discontinua) de quién, con cadena de maestros por autor.
- **19 paradojas** con su fuente real y notas cuando la atribución popular es errónea.
- **Bilingüe ES / PT** sin recargar la página; todo el contenido está en ambos idiomas.
- **Bitácora de reflexión** privada: los datos se guardan solo en tu navegador (`localStorage`).
- Sin dependencias ni compilación: HTML + CSS + JavaScript.

## 🔍 Criterio de fuentes (leer antes de citar)

Cada concepto es de uno de dos tipos, y la interfaz lo indica:

| Tipo | Qué es |
| --- | --- |
| **Cita** | Texto de una obra concreta (se indica pasaje o edición), **traducido por el proyecto**. |
| **Idea resumida** | Paráfrasis de una idea del autor. Nunca se entrecomilla ni se presenta como cita literal. |

Cuando una frase famosa se atribuye mal (p. ej. «solo sé que no sé nada», «somos lo que hacemos repetidamente», la «navaja de Ockham» o la tesis–antítesis–síntesis de Hegel) el concepto lleva una **nota de atribución**. Las traducciones no sustituyen a la obra original; el contenido se ha escrito a partir de fuentes y manuales de referencia, pero **no ha pasado una revisión por pares externa**. Si encuentras un error, abre una incidencia.

## 🚀 Uso

Abre `index.html` en el navegador (funciona con `file://`). Para desarrollar con un servidor local:

```bash
python3 -m http.server 8765      # y abre http://localhost:8765
```

## 📁 Estructura

```
index.html                    Marcado declarativo (data-i18n, data-view, data-action)
css/style.css                 Tokens, temas claro/oscuro, componentes
js/
  core/                       Componentes reutilizables, sin lógica de dominio
    utils.js                    Store (localStorage seguro) y esc() (escapado HTML)
    i18n.js                     Idioma, t(), I18n.pick(), data-i18n
    atlas.js                    Índices y consultas de linaje sobre los datos
    collection-view.js          Búsqueda + filtros + rejilla paginada (conceptos y paradojas)
  data/                       Contenido bilingüe { es, pt }
    taxonomy.js                 Épocas, carriles del mapa y corrientes
    philosophers.js             Autores con maestros e influencias
    concepts/                   Conceptos por periodo (antigua, oriental, medieval, moderna…)
    paradoxes.js                Paradojas
  features/                   Una responsabilidad por archivo
    explorer.js                 Corrientes · épocas · autores · ficha de contexto
    lineage.js                  Mapa de linaje (SVG)
    dialogs.js                  Detalle de concepto y de paradoja (<dialog>)
    favorites.js · journal.js · theme.js
  i18n/ui.js                  Textos de la interfaz
  app.js                      Punto de entrada: configura y conecta los componentes
tools/
  check-data.js               Valida datos: referencias, maestros, fechas, bilingüismo
  e2e.js                      Pruebas en navegador real (Playwright)
```

Orden de carga de los scripts: `core/utils` → `i18n/ui` → `core/i18n` → `data/*` → `core/atlas` → `core/collection-view` → `features/*` → `app`.

## ➕ Añadir contenido

**Un concepto** (en `js/data/concepts/<periodo>.js`):

```js
C('id-unico', 'autor-id', 'corriente-id', 'Obra, capítulo/pasaje', 'q',   // 'q' cita · 'i' idea resumida
  ['Título', 'Cita o idea en español', 'Aplicación', 'Pregunta de reflexión'],
  ['Título', 'Citação ou ideia em português', 'Aplicação', 'Pergunta de reflexão'],
  ['etiqueta1', 'etiqueta2'], 2,          // nivel: 1 principiante · 2 intermedio · 3 avanzado
  ['Nota de atribución en español (opcional)', 'Nota em português']);
```

**Un autor** (en `js/data/philosophers.js`): `_p(id, nombre, nacimiento, muerte, [corrientes], [maestros directos], [influencias], [bio es, bio pt], { approx, label })`.
Usa **`teachers`** solo si el maestro enseñó personalmente al autor; para el resto usa **`influences`**. Un maestro o influencia debe ser anterior al autor (lo comprueba el validador).

**Después, valida:**

```bash
node tools/check-data.js                       # integridad y bilingüismo
python3 -m http.server 8765 &                  # y, con playwright instalado:
node tools/e2e.js                              # pruebas en navegador
```

## 🧭 Decisiones de diseño

- **Corrientes y épocas, no categorías sueltas.** Cada concepto pertenece a una corriente y a un autor; la época se deduce del año de nacimiento del autor (antigua < 300, medieval < 1450, moderna < 1770, contemporánea).
- **Los eventos usan delegación** (`data-action`, `data-pick`, `data-pager`): no hay `onclick` inline ni funciones globales expuestas.
- **Todo texto insertado con `innerHTML` pasa por `esc()`.**
- **Solo se pinta la página actual** de cada lista (5 / 8 / 10 elementos según el ancho).

## 🤝 Contribuir

Las contribuciones son bienvenidas: conceptos, paradojas, correcciones de atribución o de traducción. Toda aportación debe indicar la **fuente concreta** y pasar `node tools/check-data.js`.

## 📜 Licencia y autoría

MIT. Proyecto de **David Prieto** · [@damdavidprieto](https://github.com/damdavidprieto)

*"La filosofía no es solo para académicos. Es para todos los que se hacen preguntas."*
