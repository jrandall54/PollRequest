// ============================================================
// PollRequest — Podium Screen
// Final top 3 celebration with confetti
// ============================================================

import router from '../../router.js';
import { getIconSvg } from '../../utils/constants.js';
import { getLeaderboard } from '../../services/scoring-service.js';
import { endSession, listenToSession, cleanupListeners } from '../../services/session-service.js';
import { updateStudentStats, getProfile } from '../../services/student-service.js';
import { launchConfetti } from '../../components/confetti.js';

export async function renderPodium(params) {
  const app = document.getElementById('app');
  const sessionId = params.id;

  if (!sessionId) {
    router.navigate('/host/dashboard');
    return;
  }

  app.innerHTML = `<div class="flex-center" style="min-height:100vh;"><div class="spinner spinner--lg"></div></div>`;

  // Get session data
  let sessionData = null;
  const unsub = listenToSession(sessionId, (data) => {
    if (!sessionData && data) {
      sessionData = data;
      unsub();
      showPodium(data);
    }
  });

  async function showPodium(data) {
    const leaderboard = getLeaderboard(data.players || {});
    const top3 = leaderboard.slice(0, 3);

    // End the session
    try {
      await endSession(sessionId);
    } catch (e) {
      console.warn('Could not end session:', e);
    }

    app.innerHTML = `
      <div class="podium-screen screen">
        <h1 class="podium-title text-gradient">Final Results</h1>

        ${top3.length > 0 ? `
          <div class="podium-container">
            ${top3.map((p, i) => {
              const place = i + 1;
              return `
                <div class="podium-place podium-place--${place}">
                  <div class="podium-place__avatar">
                    ${getIconSvg(p.icon, place === 1 ? 40 : 32)}
                  </div>
                  <div class="podium-place__name">${escapeHtml(p.name)}</div>
                  <div class="podium-place__points">${p.points.toLocaleString()} pts</div>
                  <div class="podium-place__pedestal">${place}</div>
                </div>
              `;
            }).join('')}
          </div>

          ${leaderboard.length > 3 ? `
            <div style="margin-top:2.5rem;width:100%;max-width:500px;">
              <h4 style="margin-bottom:0.75rem;text-align:center;color:var(--text-secondary);">Everyone Else</h4>
              <div class="leaderboard-list">
                ${leaderboard.slice(3, 10).map((p, i) => `
                  <div class="leaderboard-row" style="animation-delay:${(i + 3) * 0.1}s">
                    <div class="leaderboard-row__rank">${i + 4}</div>
                    <div class="leaderboard-row__player">
                      <span class="leaderboard-row__icon">${getIconSvg(p.icon, 20)}</span>
                      <span class="leaderboard-row__name">${escapeHtml(p.name)}</span>
                    </div>
                    <span class="leaderboard-row__points">${p.points.toLocaleString()}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        ` : `
          <div class="empty-state">
            <div class="empty-state__title">No players participated</div>
          </div>
        `}

        <button class="btn btn--primary btn--lg" id="btn-back-dashboard" style="margin-top:3rem;">
          Back to Dashboard
        </button>
      </div>
    `;

    // Launch confetti celebration
    if (top3.length > 0) {
      setTimeout(() => launchConfetti(), 800);
    }

    document.getElementById('btn-back-dashboard').addEventListener('click', () => {
      cleanupListeners();
      router.navigate('/host/dashboard');
    });
  }

  return () => {
    cleanupListeners();
  };
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
