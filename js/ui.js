export function renderHistory(entries, listContainer, onDeleteClick) {
    if (entries.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Aún no has escrito ninguna reflexión. Tu viaje comienza con la primera palabra.</p>';
        return;
    }

    listContainer.innerHTML = entries.map(entry => `
        <div class="journal-entry-item">
            <div class="entry-header">
                <span>${entry.date}</span>
                <div class="entry-actions">
                    <span class="action-link delete" data-id="${entry.id}">Borrar</span>
                </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 0.5rem; font-style: italic;">${entry.prompt}</p>
            <p style="white-space: pre-wrap;">${entry.text}</p>
        </div>
    `).join('');

    // Bind delete events
    listContainer.querySelectorAll('.action-link.delete').forEach(btn => {
        btn.onclick = () => onDeleteClick(Number(btn.dataset.id));
    });
}

export function notify(msg, type) {
    const toast = document.createElement('div');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b7355';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : accentColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

export function toggleParadoxUI(element) {
    const explanation = element.querySelector('.paradox-explanation');
    const isVisible = explanation.style.display === 'block';

    document.querySelectorAll('.paradox-explanation').forEach(exp => {
        exp.style.display = 'none';
        exp.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });

    if (!isVisible) {
        explanation.style.display = 'block';
        element.style.borderColor = 'var(--accent)';
    }
}
