// ============================================================
// PollRequest — Player Waiting Screen
// "You're in!" screen while waiting for the host to start
// ============================================================

import router from '../../router.js';
import { getIconSvg } from '../../utils/constants.js';
import { listenToSession, joinSession } from '../../services/session-service.js';
import { loadSavedIdentity, initAuth, saveProfile } from '../../services/student-service.js';
import { userStore } from '../../state.js';
import { showToast } from '../../utils/helpers.js';

export async function renderWaiting(params) {
  const app = document.getElementById('app');
  const sessionId = params.id;

  if (!sessionId) {
    router.navigate('/player/join');
    return;
  }

  // Get or restore player identity
  let identity = null;
  if (userStore.state.name && userStore.state.icon) {
    identity = { uid: userStore.state.uid, name: userStore.state.name, icon: userStore.state.icon };
    try {
      await joinSession(sessionId, identity);
    } catch (e) {
      console.warn('Could not join session:', e);
      if (e.message === 'name_taken') {
        router.navigate(`/player/profile/${sessionId}?error=name_taken`);
        return;
      }
    }
  } else {
    identity = loadSavedIdentity();
    if (identity) {
      try {
        const uid = await initAuth();
        identity.uid = uid;
        await saveProfile(uid, { name: identity.name, icon: identity.icon });
        await joinSession(sessionId, { uid, name: identity.name, icon: identity.icon });
      } catch (e) {
        console.warn('Could not rejoin session:', e);
        if (e.message === 'name_taken') {
          router.navigate(`/player/profile/${sessionId}?error=name_taken`);
          return;
        }
      }
    }
  }

  if (!identity) {
    router.navigate(`/player/profile/${sessionId}`);
    return;
  }

  app.innerHTML = `
    <div class="waiting-screen screen">
      <div class="waiting-screen__icon">
        ${getIconSvg(identity.icon, 80)}
      </div>
      <div class="waiting-screen__name" style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
        ${escapeHtml(identity.name)}
        <button id="btn-edit-profile" style="background:none;border:none;color:var(--text-tertiary);cursor:pointer;padding:0.25rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      </div>
      <div class="waiting-screen__message">
        You're in! Waiting for the host to start
        <span class="waiting-dots"><span></span><span></span><span></span></span>
      </div>
      <div class="text-muted text-sm" style="margin-top:2rem;" id="player-count-msg">
        Looking for session...
      </div>
    </div>
  `;

  document.getElementById('btn-edit-profile')?.addEventListener('click', () => {
    router.navigate(`/player/profile/${sessionId}`);
  });

  // Listen to session for game start
  const unsub = listenToSession(sessionId, (data) => {
    if (!data) {
      showToast('Session not found', 'error');
      router.navigate('/player/join');
      unsub();
      return;
    }

    // Update player count
    const count = Object.keys(data.players || {}).length;
    const countEl = document.getElementById('player-count-msg');
    if (countEl) {
      countEl.textContent = `${count} player${count !== 1 ? 's' : ''} connected`;
    }

    // If game has started, navigate to answer screen
    if (data.currentQuestionState === 'accepting' || data.currentQuestionState === 'paused') {
      unsub();
      router.navigate(`/player/game/${sessionId}`);
    }
  });

  return () => unsub();
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
