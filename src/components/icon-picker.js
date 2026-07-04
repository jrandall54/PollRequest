// ============================================================
// PollRequest — Icon Picker Component
// Grid of selectable SVG line-art icons for student identity
// ============================================================

import { ICON_LIST, getIconSvg } from '../utils/constants.js';

/**
 * Render the icon picker grid
 * @param {HTMLElement} container
 * @param {object} options
 * @returns {object} Controller { getSelected, setSelected, destroy }
 */
export function createIconPicker(container, options = {}) {
  const {
    onSelect = () => {},
    selected = null,
    columns = 6,
  } = options;

  let selectedId = selected;

  function render() {
    const categories = ['cs', 'animal', 'game', 'space'];
    const categoryLabels = {
      cs: 'Tech',
      animal: 'Animals',
      game: 'Objects',
      space: 'Space & Nature',
    };

    let html = '<div class="icon-picker">';

    categories.forEach(cat => {
      const icons = ICON_LIST.filter(i => i.category === cat);
      if (icons.length === 0) return;

      html += `
        <div class="icon-picker__category">
          <div class="icon-picker__category-label">${categoryLabels[cat]}</div>
          <div class="icon-picker__grid" style="grid-template-columns: repeat(${columns}, 1fr);">
      `;

      icons.forEach(icon => {
        const isSelected = icon.id === selectedId;
        html += `
          <button
            class="icon-picker__item ${isSelected ? 'icon-picker__item--selected' : ''}"
            data-icon-id="${icon.id}"
            title="${icon.name}"
            type="button"
          >
            ${getIconSvg(icon.id, 28)}
          </button>
        `;
      });

      html += '</div></div>';
    });

    html += '</div>';
    container.innerHTML = html;

    // Add click handlers
    container.querySelectorAll('.icon-picker__item').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedId = btn.dataset.iconId;

        // Update visual state
        container.querySelectorAll('.icon-picker__item').forEach(b =>
          b.classList.remove('icon-picker__item--selected')
        );
        btn.classList.add('icon-picker__item--selected');

        onSelect(selectedId);
      });
    });
  }

  render();

  // Inject styles if not already present
  if (!document.querySelector('#icon-picker-styles')) {
    const style = document.createElement('style');
    style.id = 'icon-picker-styles';
    style.textContent = `
      .icon-picker {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 400px;
      }
      .icon-picker__category-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.375rem;
      }
      .icon-picker__grid {
        display: grid;
        gap: 0.375rem;
      }
      .icon-picker__item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        aspect-ratio: 1;
        border: 2px solid var(--border-color);
        border-radius: var(--radius-md);
        background: var(--bg-secondary);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 0.375rem;
      }
      .icon-picker__item:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        background: var(--accent-primary-soft);
        transform: scale(1.08);
      }
      .icon-picker__item--selected {
        border-color: var(--accent-primary);
        background: var(--accent-primary-soft);
        color: var(--accent-primary);
        box-shadow: 0 0 0 3px var(--accent-primary-soft);
      }
      .icon-picker__item svg {
        width: 100%;
        height: 100%;
        max-width: 28px;
        max-height: 28px;
      }
    `;
    document.head.appendChild(style);
  }

  return {
    getSelected: () => selectedId,
    setSelected: (id) => {
      selectedId = id;
      render();
    },
    destroy: () => {
      container.innerHTML = '';
    },
  };
}
