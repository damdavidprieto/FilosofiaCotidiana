/**
 * Registro de conceptos y helper de alta.
 *
 * C(id, autor, corriente, fuente, tipo, es, pt, etiquetas, nivel, nota?)
 *   tipo:  'q' = cita textual (traducida al español/portugués por el proyecto)
 *          'i' = idea resumida: NO es una cita, se muestra sin comillas
 *   es/pt: [título, cita-o-idea, aplicación, pregunta de reflexión]
 *   nota:  [es, pt] opcional: aclaraciones de atribución (frases apócrifas, disputas…)
 *   nivel: 1 principiante · 2 intermedio · 3 avanzado
 *
 * `autor` debe existir en PHILOSOPHERS y `corriente` en SCHOOLS (lo comprueba
 * tools/check-data.js).
 */
const CONCEPTS = [];

function C(id, author, school, source, type, es, pt, tags, level, note = null) {
    const text = a => ({ title: a[0], quote: a[1], application: a[2], prompt: a[3] });
    CONCEPTS.push({
        id, author, school, source, type, tags, level,
        note: note ? { es: note[0], pt: note[1] } : null,
        es: text(es), pt: text(pt)
    });
}
