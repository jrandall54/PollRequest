// ============================================================
// PollRequest — Host Lobby Screen
// Shows the join code on projector, lists joined students
// ============================================================

import router from '../../router.js';
import { getUiIcon, getIconSvg } from '../../utils/constants.js';
import { listenToSession, advanceQuestion } from '../../services/session-service.js';
import { getQuestionsByIds } from '../../services/question-service.js';
import { sessionStore } from '../../state.js';

export async function renderLobby(params) {
  const app = document.getElementById('app');
  const sessionId = params.id;

  if (!sessionId) {
    router.navigate('/host/dashboard');
    return;
  }

  app.innerHTML = `
    <div class="lobby-screen screen">
      <div style="position:absolute;top:1.5rem;right:1.5rem;">
        <button class="btn btn--ghost btn--sm" id="btn-end-lobby">
          ${getUiIcon('x', 18)} End
        </button>
      </div>

      <h2 style="color:var(--text-secondary);font-size:1.25rem;font-weight:600;">Join at</h2>
      <div class="lobby-url" id="lobby-url">Loading...</div>

      <div style="color:var(--text-secondary);font-size:1.25rem;">Enter code</div>
      <div class="lobby-code" id="lobby-code">------</div>

      <div class="lobby-player-count" id="player-count">
        Waiting for students to join...
      </div>

      <div class="lobby-players" id="player-list"></div>

      <button class="btn btn--primary btn--xl" id="btn-start-game" style="margin-top:2rem;" disabled>
        ${getUiIcon('play', 22)} Start Game
      </button>
    </div>
  `;

  const codeEl = document.getElementById('lobby-code');
  const urlEl = document.getElementById('lobby-url');
  const countEl = document.getElementById('player-count');
  const listEl = document.getElementById('player-list');
  const startBtn = document.getElementById('btn-start-game');
  let questions = [];

  // Set the URL display
  const baseUrl = window.location.origin + window.location.pathname;
  urlEl.textContent = baseUrl;

  // Listen to session
  const unsubscribe = listenToSession(sessionId, async (data) => {
    if (!data) return;

    codeEl.textContent = data.joinCode || '------';

    const players = data.players || {};
    const count = Object.keys(players).length;
    countEl.textContent = `${count} student${count !== 1 ? 's' : ''} joined`;
    startBtn.disabled = count === 0;

    // Render player list
    listEl.innerHTML = Object.entries(players).map(([uid, p]) => `
      <div class="lobby-player">
        <span class="lobby-player__icon">${getIconSvg(p.icon, 20)}</span>
        <span>${escapeHtml(p.name)}</span>
      </div>
    `).join('');

    // Preload questions
    if (data.questionIds && questions.length === 0) {
      try {
        questions = await getQuestionsByIds(data.questionIds);
      } catch (e) {
        console.warn('Could not preload questions:', e);
      }
    }
  });

  // Start game button
  startBtn.addEventListener('click', async () => {
    if (questions.length === 0 && sessionStore.state.questionIds?.length > 0) {
      questions = await getQuestionsByIds(sessionStore.state.questionIds);
    }
    if (questions.length === 0) return;

    try {
      await advanceQuestion(sessionId, questions[0]?.timeLimit || 30);
      router.navigate(`/host/game/${sessionId}`);
    } catch (e) {
      console.error('Failed to start game:', e);
    }
  });

  // End lobby
  document.getElementById('btn-end-lobby').addEventListener('click', () => {
    unsubscribe();
    router.navigate('/host/dashboard');
  });

  // Return cleanup function
  return () => unsubscribe();
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text;
  return el.innerHTML;
}
