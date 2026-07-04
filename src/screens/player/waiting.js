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
      <div class="waiting-screen__name">${escapeHtml(identity.name)}</div>
      <div class="waiting-screen__message">
        You're in! Waiting for the host to start
        <span class="waiting-dots"><span></span><span></span><span></span></span>
      </div>
      <div class="text-muted text-sm" style="margin-top:2rem;" id="player-count-msg">
        Looking for session...
      </div>
    </div>
  `;

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
