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
        ${saved ? `
          <button class="btn btn--primary btn--lg btn--full" id="btn-join-saved">
            Continue as ${escapeHtml(saved.name)}
          </button>
          <button class="btn btn--secondary btn--lg btn--full" id="btn-join-new" style="margin-top:0.75rem;">
            Join as someone else
          </button>
        ` : `
          <button class="btn btn--primary btn--lg btn--full" id="btn-join">
            Join Session
          </button>
        `}
        <div id="join-error" class="text-center" style="color:var(--error);font-size:0.875rem;min-height:1.25rem;margin-top:0.5rem;"></div>
      </div>
    </div>
  `;

  const codeInput = document.getElementById('join-code');
  const errorEl = document.getElementById('join-error');

  // Auto-uppercase and filter input
  codeInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    errorEl.textContent = '';
  });

  // Join session
  async function handleJoin(mode = 'default') {
    const code = codeInput.value.trim().toUpperCase();
    if (!code || code.length < 4) {
      errorEl.textContent = 'Please enter a valid code';
      return;
    }

    const btns = document.querySelectorAll('.join-screen__form .btn');
    btns.forEach(b => {
      b.disabled = true;
      if (b.classList.contains('btn--primary')) {
        b.innerHTML = '<div class="spinner spinner--sm"></div> Joining...';
      }
    });
    errorEl.textContent = '';

    try {
      const session = await findSessionByCode(code);
      if (!session) {
        errorEl.textContent = 'Session not found. Check the code and try again.';
        renderButtons(); // restore buttons
        return;
      }

      // Store session ID for next screens
      sessionStorage.setItem('pollrequest_session', session.id);
      sessionStorage.setItem('pollrequest_join_code', code);

      if (mode === 'saved') {
        router.navigate(`/player/waiting/${session.id}`);
      } else if (mode === 'new') {
        // Clear cached identity locally to force a new one
        localStorage.removeItem('pollrequest_uid');
        localStorage.removeItem('pollrequest_name');
        localStorage.removeItem('pollrequest_icon');
        // We do NOT clear userStore here because it will be handled by profile-setup / waiting logic,
        // but we can just route to profile screen to set up a new identity
        router.navigate(`/player/profile/${session.id}`);
      } else {
        router.navigate(`/player/profile/${session.id}`);
      }
    } catch (e) {
      errorEl.textContent = 'Connection error. Please try again.';
      renderButtons();
    }
  }

  function renderButtons() {
    if (saved) {
      const btnSaved = document.getElementById('btn-join-saved');
      if (btnSaved) {
        btnSaved.disabled = false;
        btnSaved.textContent = `Continue as ${saved.name}`;
      }
      const btnNew = document.getElementById('btn-join-new');
      if (btnNew) {
        btnNew.disabled = false;
      }
    } else {
      const btnJoin = document.getElementById('btn-join');
      if (btnJoin) {
        btnJoin.disabled = false;
        btnJoin.textContent = 'Join Session';
      }
    }
  }

  if (saved) {
    document.getElementById('btn-join-saved').addEventListener('click', () => handleJoin('saved'));
    document.getElementById('btn-join-new').addEventListener('click', () => handleJoin('new'));
  } else {
    document.getElementById('btn-join').addEventListener('click', () => handleJoin('default'));
  }

  codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleJoin(saved ? 'saved' : 'default');
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
