/**
 * Feature · favoritos
 * Se guardan solo los identificadores de concepto, así sobreviven a los cambios de
 * idioma. Al cargar se migra el formato antiguo (objetos o títulos en español) con la
 * función `resolve`, que devuelve el id actual o null si el concepto ya no existe.
 */
const Favorites = {
    _ids: new Set(),

    init(resolve) {
        const stored = Store.get(STORE_KEYS.favorites, []);
        this._ids = new Set(stored.map(entry => resolve(typeof entry === 'string' ? entry : entry?.title)).filter(Boolean));
        this._save();
    },
    has(id) {
        return this._ids.has(id);
    },
    get count() {
        return this._ids.size;
    },
    toggle(id) {
        if (!this._ids.delete(id)) this._ids.add(id);
        this._save();
        return this.has(id);
    },
    _save() {
        Store.set(STORE_KEYS.favorites, [...this._ids]);
    }
};
