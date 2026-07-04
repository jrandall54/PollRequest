// ============================================================
// PollRequest — Session Setup Screen
// Pick questions, set session name, start session
// ============================================================

import router from '../../router.js';
import { getUiIcon } from '../../utils/constants.js';
import { getAllQuestions } from '../../services/question-service.js';
import { createSession } from '../../services/session-service.js';
import { showToast } from '../../utils/helpers.js';

export async function renderSessionSetup() {
  const app = document.getElementById('app');

  let questions = [];
  try {
    questions = await getAllQuestions();
  } catch (e) {
    console.warn('Could not load questions:', e);
  }

  let selectedIds = new Set();

  app.innerHTML = `
    <div class="host-layout screen">
      <header class="host-header">
        <button class="btn btn--ghost btn--sm" id="btn-back">
          ${getUiIcon('arrowLeft', 18)} Dashboard
        </button>
        <h3>New Session</h3>
        <button class="btn btn--primary" id="btn-start" disabled>
          ${getUiIcon('play', 18)} Start Session
        </button>
      </header>

      <main class="host-content">
        <div class="session-setup container">
          <div class="input-group" style="margin-bottom:1.5rem;">
            <label for="session-name">Session Name</label>
            <input class="input" id="session-name" placeholder="e.g., Week 3 - Loops" value="Session ${new Date().toLocaleDateString()}" />
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
            <h4>Select Questions <span class="badge badge--primary" id="selected-count">0 selected</span></h4>
            <div style="display:flex;gap:0.5rem;">
              <button class="btn btn--ghost btn--sm" id="btn-select-all">Select All</button>
              <button class="btn btn--ghost btn--sm" id="btn-select-none">Clear</button>
            </div>
          </div>

          ${questions.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state__icon">${getUiIcon('fileText', 48)}</div>
              <div class="empty-state__title">No questions yet</div>
              <div class="empty-state__text">Add questions from the Question Manager first.</div>
              <button class="btn btn--primary" id="btn-go-questions" style="margin-top:1rem;">
                Go to Question Manager
              </button>
            </div>
          ` : `
            <div class="session-setup__question-list" id="question-list">
              ${questions.map((q, i) => `
                <label class="session-question-item" data-id="${q.id}">
                  <input type="checkbox" class="question-checkbox" value="${q.id}" style="width:1.25rem;height:1.25rem;accent-color:var(--accent-primary);" />
                  <span class="session-question-item__text">
                    ${escapeHtml(q.text.length > 80 ? q.text.substring(0, 80) + '...' : q.text)}
                  </span>
                  <div class="session-question-item__meta">
                    <span class="badge badge--neutral">${q.category || 'general'}</span>
                    <span class="badge ${q.difficulty === 'easy' ? 'badge--success' : q.difficulty === 'hard' ? 'badge--error' : 'badge--warning'}">${q.difficulty || 'medium'}</span>
                    <span class="text-muted text-sm">${q.timeLimit || 30}s</span>
                  </div>
                </label>
              `).join('')}
            </div>
          `}
        </div>
      </main>
    </div>
  `;

  const startBtn = document.getElementById('btn-start');
  const countBadge = document.getElementById('selected-count');

  function updateCount() {
    countBadge.textContent = `${selectedIds.size} selected`;
    startBtn.disabled = selectedIds.size === 0;
  }

  // Checkbox handling
  document.querySelectorAll('.question-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) selectedIds.add(cb.value);
      else selectedIds.delete(cb.value);
      updateCount();
    });
  });

  // Select all / clear
  document.getElementById('btn-select-all')?.addEventListener('click', () => {
    document.querySelectorAll('.question-checkbox').forEach(cb => {
      cb.checked = true;
      selectedIds.add(cb.value);
    });
    updateCount();
  });

  document.getElementById('btn-select-none')?.addEventListener('click', () => {
    document.querySelectorAll('.question-checkbox').forEach(cb => {
      cb.checked = false;
    });
    selectedIds.clear();
    updateCount();
  });

  // Start session
  startBtn.addEventListener('click', async () => {
    const name = document.getElementById('session-name').value.trim();
    if (selectedIds.size === 0) {
      showToast('Select at least one question', 'warning');
      return;
    }

    startBtn.disabled = true;
    startBtn.innerHTML = '<div class="spinner spinner--sm"></div> Creating...';

    try {
      const { id, joinCode } = await createSession(name, [...selectedIds]);
      router.navigate(`/host/lobby/${id}`);
    } catch (e) {
      showToast('Failed to create session: ' + e.message, 'error');
      startBtn.disabled = false;
      startBtn.innerHTML = `${getUiIcon('play', 18)} Start Session`;
    }
  });

  // Navigation
  document.getElementById('btn-back').addEventListener('click', () => {
    router.navigate('/host/dashboard');
  });
  document.getElementById('btn-go-questions')?.addEventListener('click', () => {
    router.navigate('/host/questions');
  });
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text;
  return el.innerHTML;
}
