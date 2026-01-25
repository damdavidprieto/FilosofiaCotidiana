const STORAGE_KEY = 'philosophyJournal';

export function saveEntry(text, prompt) {
    if (!text.trim()) return { success: false, error: 'Empty content' };

    const entries = getEntries();
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        prompt: prompt,
        text: text
    };

    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return { success: true, entry: newEntry };
}

export function getEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function deleteEntry(id) {
    let entries = getEntries();
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
}
