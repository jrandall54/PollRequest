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
import { showStudentStats } from '../../components/student-stats-modal.js';

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
        // Join session first to validate name uniqueness
        await joinSession(sessionId, { uid, name: identity.name, icon: identity.icon });
        // Save profile only if join was successful
        await saveProfile(uid, { name: identity.name, icon: identity.icon });
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
      <div class="waiting-screen__name">
        ${escapeHtml(identity.name)}
      </div>
      <div class="waiting-screen__message">
        You're in! Waiting for the host to start
        <span class="waiting-dots"><span></span><span></span><span></span></span>
      </div>

      <div class="waiting-screen__actions" style="display:flex; gap:1rem; margin-top:2.5rem; justify-content:center; width: 100%; max-width: 400px; margin-inline: auto; animation: slideUp 0.5s ease-out 0.2s both;">
        <button class="btn btn--secondary" id="btn-edit-profile" style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; box-shadow: var(--shadow-sm); padding: 0.75rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          Edit Profile
        </button>
        <button class="btn btn--secondary" id="btn-view-stats" style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; box-shadow: var(--shadow-sm); padding: 0.75rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
          View Stats
        </button>
      </div>

      <div class="text-muted text-sm" style="margin-top:2rem; animation: slideUp 0.5s ease-out 0.4s both;" id="player-count-msg">
        Looking for session...
      </div>
    </div>
  `;

  document.getElementById('btn-edit-profile')?.addEventListener('click', () => {
    router.navigate(`/player/profile/${sessionId}`);
  });

  document.getElementById('btn-view-stats')?.addEventListener('click', () => {
    showStudentStats(identity.uid, identity.name, identity.icon);
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
