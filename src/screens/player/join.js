// ============================================================
// PollRequest — Player Join Screen
// Enter join code to connect to a session
// ============================================================

import router from '../../router.js';
import { getUiIcon, getIconSvg } from '../../utils/constants.js';
import { findSessionByCode } from '../../services/session-service.js';
import { loadSavedIdentity } from '../../services/student-service.js';
import { showToast } from '../../utils/helpers.js';

export async function renderPlayerJoin() {
  const app = document.getElementById('app');

  // Check if player has an existing identity
  const saved = loadSavedIdentity();

  app.innerHTML = `
    <div class="join-screen screen">
      <button class="btn btn--ghost" id="btn-back" style="position:absolute;top:1rem;left:1rem;">
        ${getUiIcon('arrowLeft', 20)} Back
      </button>

      <div class="join-screen__logo text-gradient">PollRequest</div>
      <div class="join-screen__subtitle">Enter the session code from the screen</div>

      <div class="join-screen__form">
        <input
          type="text"
          class="join-code-input"
          id="join-code"
          placeholder="CODE"
          maxlength="6"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="characters"
          spellcheck="false"
        />
        <button class="btn btn--primary btn--lg btn--full" id="btn-join">
          Join Session
        </button>
        <div id="join-error" class="text-center" style="color:var(--error);font-size:0.875rem;min-height:1.25rem;"></div>
      </div>

      ${saved ? `
        <div style="margin-top:1.5rem;text-align:center;">
          <span class="text-muted text-sm">Rejoining as</span>
          <div class="player-badge player-badge--lg" style="margin-top:0.5rem;display:inline-flex;">
            <span class="player-badge__icon">${getIconSvgSafe(saved.icon, 24)}</span>
            <span>${escapeHtml(saved.name)}</span>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  const codeInput = document.getElementById('join-code');
  const joinBtn = document.getElementById('btn-join');
  const errorEl = document.getElementById('join-error');

  // Auto-uppercase and filter input
  codeInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    errorEl.textContent = '';
  });

  // Join session
  async function handleJoin() {
    const code = codeInput.value.trim().toUpperCase();
    if (!code || code.length < 4) {
      errorEl.textContent = 'Please enter a valid code';
      return;
    }

    joinBtn.disabled = true;
    joinBtn.innerHTML = '<div class="spinner spinner--sm"></div> Joining...';
    errorEl.textContent = '';

    try {
      const session = await findSessionByCode(code);
      if (!session) {
        errorEl.textContent = 'Session not found. Check the code and try again.';
        joinBtn.disabled = false;
        joinBtn.textContent = 'Join Session';
        return;
      }

      // Store session ID for next screens
      sessionStorage.setItem('pollrequest_session', session.id);
      sessionStorage.setItem('pollrequest_join_code', code);

      // If player has a saved identity, go straight to waiting
      if (saved) {
        router.navigate(`/player/waiting/${session.id}`);
      } else {
        router.navigate(`/player/profile/${session.id}`);
      }
    } catch (e) {
      errorEl.textContent = 'Connection error. Please try again.';
      joinBtn.disabled = false;
      joinBtn.textContent = 'Join Session';
    }
  }

  joinBtn.addEventListener('click', handleJoin);
  codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleJoin();
  });

  // Back button
  document.getElementById('btn-back').addEventListener('click', () => router.navigate('/'));

  // Focus input
  codeInput.focus();
}

function getIconSvgSafe(iconId, size) {
  try {
    return getIconSvg(iconId, size);
  } catch {
    return '';
  }
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
