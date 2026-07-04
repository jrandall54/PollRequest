// ============================================================
// PollRequest — Theme Switcher Component
// Dropdown to switch between the 3 visual themes
// ============================================================

import { THEMES } from '../utils/constants.js';

/**
 * Create a theme switcher dropdown
 * @param {HTMLElement} container
 * @param {object} options
 */
export function createThemeSwitcher(container, options = {}) {
  const { onChange = () => {} } = options;

  const current = document.documentElement.getAttribute('data-theme') || 'light';

  container.innerHTML = `
    <div class="theme-switcher">
      <select class="select" id="theme-select" style="min-width:160px;">
        ${THEMES.map(t => `
          <option value="${t.id}" ${t.id === current ? 'selected' : ''}>
            ${t.name}
          </option>
        `).join('')}
      </select>
    </div>
  `;

  const select = container.querySelector('#theme-select');
  select.addEventListener('change', (e) => {
    const theme = e.target.value;
    applyTheme(theme);
    onChange(theme);
  });
}

/**
 * Apply a theme to the document
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('pollrequest_theme', theme);
}

/**
 * Load saved theme from localStorage
 */
export function loadSavedTheme() {
  const saved = localStorage.getItem('pollrequest_theme');
  if (saved) {
    applyTheme(saved);
    return saved;
  }
  return 'light';
}
