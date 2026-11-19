/**
 * Core · utilidades compartidas
 * - Store: acceso seguro a localStorage (nunca lanza excepciones)
 * - esc:   escapado HTML para todo texto que se inserte con innerHTML
 */

const Store = {
    /** Valor JSON. */
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* modo privado, cuota... */ }
    },
    /** Cadena sin serializar (tema, idioma, fechas ISO). */
    getRaw(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : raw;
        } catch (e) {
            return fallback;
        }
    },
    setRaw(key, value) {
        try { localStorage.setItem(key, String(value)); } catch (e) { /* ver arriba */ }
    }
};

/** Claves de almacenamiento (se mantienen las de versiones anteriores). */
const STORE_KEYS = {
    favorites: 'philosophy-favorites',
    journal: 'philosophy-journal',
    lastVisit: 'philosophy-last-visit',
    streak: 'philosophy-streak',
    theme: 'philosophy-theme',
    language: 'philosophy-language'
};

function esc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
