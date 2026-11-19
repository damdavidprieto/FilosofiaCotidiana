/** Feature · bitácora de reflexión (privada, solo en este navegador) */
const Journal = {
    entries: [],

    init() {
        this.entries = Store.get(STORE_KEYS.journal, []);
    },
    get count() {
        return this.entries.length;
    },
    /** Devuelve false si el texto está vacío. */
    add(text, conceptId) {
        text = text.trim();
        if (!text) return false;
        this.entries.push({ id: Date.now(), concept: conceptId || null, text });
        Store.set(STORE_KEYS.journal, this.entries);
        return true;
    },
    /** Más recientes primero. `titleOf(ref)` devuelve el título del concepto en el idioma actual. */
    renderHistory(container, titleOf) {
        if (!this.entries.length) {
            container.innerHTML = `<p class="empty-state">${esc(t('journal_empty'))}</p>`;
            return;
        }
        container.innerHTML = [...this.entries].reverse().map(entry => {
            const date = new Date(entry.id).toLocaleString(I18n.locale);
            const concept = entry.concept ? titleOf(entry.concept) : t('journal_free');
            const text = entry.text.length > 150 ? entry.text.slice(0, 150) + '…' : entry.text;
            return `<div class="journal-entry-item">
                <div class="journal-date">${esc(date)} - ${esc(concept)}</div>
                <div class="journal-text">${esc(text)}</div>
            </div>`;
        }).join('');
    }
};
