/**
 * Core · Internacionalización (ES / PT)
 *
 *  - Textos de interfaz: I18N_UI (js/i18n/ui.js) → t('clave', {variables})
 *  - Contenido (conceptos, paradojas, autores, corrientes): cada entrada lleva sus
 *    textos en ambos idiomas ({ es, pt }) → I18n.pick(objeto)
 *
 * El HTML se traduce de forma declarativa:
 *   data-i18n="clave"              → textContent
 *   data-i18n-placeholder="clave"  → placeholder
 *   data-i18n-title="clave"        → title y aria-label
 */

const I18n = {
    SOURCE_LANG: 'es',
    LOCALES: { es: 'es-ES', pt: 'pt-BR' },
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
        for (const name in vars) text = text.split(`{${name}}`).join(vars[name]);
        return text;
    },

    /** Elige el texto del idioma actual de un objeto { es, pt } (con respaldo en español). */
    pick(obj) {
        if (obj == null) return obj;
        return obj[this.lang] ?? obj[this.SOURCE_LANG];
    },

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
