function renderHistoryUI(entries, listContainer) {
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
}

function notify(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showConfirm(title, text, onConfirm) {
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="custom-modal">
                <h3 class="modal-title"></h3>
                <p class="modal-text"></p>
                <div class="modal-btns">
                    <button class="btn-modal cancel">Cancelar</button>
                    <button class="btn-premium btn-modal confirm">Confirmar</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const titleEl = overlay.querySelector('.modal-title');
    const textEl = overlay.querySelector('.modal-text');
    const confirmBtn = overlay.querySelector('.confirm');
    const cancelBtn = overlay.querySelector('.cancel');

    titleEl.textContent = title;
    textEl.textContent = text;

    overlay.classList.add('show');

    // Clean up old listeners
    const newConfirm = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);

    newConfirm.addEventListener('click', () => {
        overlay.classList.remove('show');
        if (onConfirm) onConfirm();
    });

    cancelBtn.onclick = () => {
        overlay.classList.remove('show');
    };
}

function toggleParadoxUI(element) {
    const explanation = element.querySelector('.paradox-explanation');
    if (!explanation) return;
    const isVisible = explanation.style.display === 'block';

    document.querySelectorAll('.paradox-explanation').forEach(exp => {
        exp.style.display = 'none';
        exp.parentElement.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    });

    if (!isVisible) {
        explanation.style.display = 'block';
        element.style.borderColor = 'var(--accent)';
    }
}
