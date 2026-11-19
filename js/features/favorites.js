/**
 * Feature · favoritos
 * Se guardan solo las claves (título original en español), así sobreviven
 * a cambios de idioma. Migra el formato antiguo (objetos completos).
 */
const Favorites = {
    _keys: new Set(),

    init() {
        const stored = Store.get(STORE_KEYS.favorites, []);
        this._keys = new Set(stored.map(entry => (typeof entry === 'string' ? entry : entry?.title)).filter(Boolean));
        this._save();
    },
    has(key) {
        return this._keys.has(key);
    },
    get count() {
        return this._keys.size;
    },
    toggle(key) {
        if (!this._keys.delete(key)) this._keys.add(key);
        this._save();
        return this.has(key);
    },
    _save() {
        Store.set(STORE_KEYS.favorites, [...this._keys]);
    }
};
