/** Feature · tema claro/oscuro */
const Theme = {
    init() {
        this.apply(Store.getRaw(STORE_KEYS.theme, 'light'));
    },
    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    },
    toggle() {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        Store.setRaw(STORE_KEYS.theme, next);
        this.apply(next);
    }
};
