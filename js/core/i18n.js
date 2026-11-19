/**
 * Core · Internacionalización (ES / PT)
 *
 * Dos capas:
 *  1. Textos de interfaz  → I18N_UI (js/i18n/ui.js), accesibles con t('clave').
 *  2. Contenido           → diccionarios registrados con I18n.registerContent().
 *     El español es el idioma de origen de los datos; los diccionarios mapean
 *     "texto en español" → "texto en el otro idioma", campo a campo.
 *     Si falta una traducción se muestra el original (nunca se rompe la UI).
 *
 * El HTML se traduce de forma declarativa:
 *   data-i18n="clave"              → textContent
 *   data-i18n-placeholder="clave"  → placeholder
 *   data-i18n-title="clave"        → title y aria-label
 */

const I18n = {
    SOURCE_LANG: 'es',
    LOCALES: { es: 'es-ES', pt: 'pt-BR' },

    _content: {},      // { tipo: { lang: { campo: {es: traducido} } } }
    _listeners: [],

    get lang() {
        const saved = Store.getRaw(STORE_KEYS.language, this.SOURCE_LANG);
        return I18N_UI[saved] ? saved : this.SOURCE_LANG;
    },

    get locale() {
        return this.LOCALES[this.lang];
    },

    /** Cambia de idioma, re-traduce el HTML estático y avisa a los componentes. */
    set(lang) {
        if (!I18N_UI[lang]) return;
        Store.setRaw(STORE_KEYS.language, lang);
        this.apply();
        this._listeners.forEach(fn => fn(lang));
    },

    onChange(fn) {
        this._listeners.push(fn);
    },

    t(key, vars = {}) {
        let text = I18N_UI[this.lang][key] ?? I18N_UI[this.SOURCE_LANG][key] ?? key;
        for (const name in vars) text = text.replace(`{${name}}`, vars[name]);
        return text;
    },

    // ----- contenido -----

    registerContent(type, lang, fields) {
        this._content[type] = this._content[type] || {};
        this._content[type][lang] = fields;
    },

    _dict(type, field) {
        return this._content[type]?.[this.lang]?.[field];
    },

    hasTranslation(type, field, value) {
        return this.lang === this.SOURCE_LANG || Boolean(this._dict(type, field)?.[value]);
    },

    localizeField(type, field, value) {
        if (this.lang === this.SOURCE_LANG) return value;
        return this._dict(type, field)?.[value] ?? value;
    },

    /** Devuelve una copia del elemento con todos sus campos traducibles traducidos. */
    localize(type, item) {
        if (this.lang === this.SOURCE_LANG) return item;
        const fields = this._content[type]?.[this.lang];
        if (!fields) return item;
        const out = { ...item };
        for (const field in fields) {
            if (field in item) out[field] = fields[field][item[field]] ?? item[field];
        }
        return out;
    },

    // ----- HTML estático -----

    apply(root = document) {
        document.documentElement.lang = this.lang;
        root.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = this.t(el.dataset.i18n);
        });
        root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = this.t(el.dataset.i18nPlaceholder);
        });
        root.querySelectorAll('[data-i18n-title]').forEach(el => {
            const text = this.t(el.dataset.i18nTitle);
            el.title = text;
            el.setAttribute('aria-label', text);
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.lang);
        });
    }
};

const t = (key, vars) => I18n.t(key, vars);
