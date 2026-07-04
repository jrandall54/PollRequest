// ============================================================
// PollRequest — Modal Component
// Reusable overlay dialog
// ============================================================

/**
 * Show a modal dialog
 * @param {object} options
 * @returns {object} Controller { close, element }
 */
export function showModal(options = {}) {
  const {
    title = '',
    content = '',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm = () => {},
    onCancel = () => {},
    showCancel = true,
    danger = false,
    size = 'normal', // 'small', 'normal', 'large'
  } = options;

  const sizeClass = size === 'large' ? 'modal__content--large' :
                    size === 'small' ? 'modal__content--small' : '';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal__content ${sizeClass}" role="dialog" aria-modal="true">
      ${title ? `<div class="modal__header">
        <h3 class="modal__title">${title}</h3>
        <button class="btn btn--icon modal__close" id="modal-close-btn" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>` : ''}
      <div class="modal__body">
        ${typeof content === 'string' ? content : ''}
      </div>
      <div class="modal__footer">
        ${showCancel ? `<button class="btn btn--secondary" id="modal-cancel-btn">${cancelText}</button>` : ''}
        <button class="btn ${danger ? 'btn--danger' : 'btn--primary'}" id="modal-confirm-btn">${confirmText}</button>
      </div>
    </div>
  `;

  // If content is an element, append it
  if (typeof content !== 'string') {
    overlay.querySelector('.modal__body').appendChild(content);
  }

  document.body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('modal-overlay--visible');
  });

  function close() {
    overlay.classList.remove('modal-overlay--visible');
    setTimeout(() => overlay.remove(), 200);
  }

  // Event handlers
  overlay.querySelector('#modal-confirm-btn')?.addEventListener('click', () => {
    onConfirm();
    close();
  });

  overlay.querySelector('#modal-cancel-btn')?.addEventListener('click', () => {
    onCancel();
    close();
  });

  overlay.querySelector('#modal-close-btn')?.addEventListener('click', () => {
    onCancel();
    close();
  });

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      onCancel();
      close();
    }
  });

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      onCancel();
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // Inject modal styles if not present
  if (!document.querySelector('#modal-styles')) {
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: var(--bg-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s ease;
        padding: 1rem;
      }
      .modal-overlay--visible {
        opacity: 1;
      }
      .modal-overlay--visible .modal__content {
        transform: scale(1) translateY(0);
      }
      .modal__content {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        width: 100%;
        max-width: 480px;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.95) translateY(10px);
        transition: transform 0.25s ease;
      }
      .modal__content--large { max-width: 700px; }
      .modal__content--small { max-width: 360px; }
      .modal__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }
      .modal__title {
        font-size: 1.125rem;
        font-weight: 700;
      }
      .modal__body {
        padding: 1.5rem;
      }
      .modal__footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--border-color);
      }
    `;
    document.head.appendChild(style);
  }

  return { close, element: overlay };
}
