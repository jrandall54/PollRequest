// ============================================================
// PollRequest — Session Setup Screen
// Pick questions, set session name, start session
// ============================================================

import router from '../../router.js';
import { getUiIcon } from '../../utils/constants.js';
import { getAllQuestions } from '../../services/question-service.js';
import { createSession } from '../../services/session-service.js';
import { showToast } from '../../utils/helpers.js';

import { renderHostHeader } from '../../components/host-header.js';
import { hostStore } from '../../state.js';

export async function renderSessionSetup() {
  const app = document.getElementById('app');

  let questions = [];
  let headerHtml = '';
  try {
    headerHtml = await renderHostHeader();
    const courseId = hostStore.state.activeCourseId;
    questions = await getAllQuestions(courseId);
  } catch (e) {
    console.warn('Could not load questions:', e);
  }

  let selectedIds = new Set();

  const banksMap = {};
  questions.forEach(q => {
    const b = q.bank || q.category || 'Custom Questions';
    if (!banksMap[b]) banksMap[b] = [];
    banksMap[b].push(q);
  });
  const banks = Object.keys(banksMap).sort();

  app.innerHTML = `
    <div class="host-layout screen">
      ${headerHtml}
      <div class="screen-subheader" style="padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
        <button class="btn btn--ghost btn--sm" id="btn-back">
          ${getUiIcon('arrowLeft', 18)} Dashboard
        </button>
        <h3 style="margin: 0;">New Session</h3>
        <button class="btn btn--primary btn--sm" id="btn-start" disabled>
          ${getUiIcon('play', 16)} Start Session
        </button>
      </div>

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
              <button class="btn btn--ghost btn--sm" id="btn-select-none">Clear All</button>
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
              ${banks.map(bank => `
                <div class="setup-bank-group" style="margin-bottom: 1.5rem;">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border-color);">
                    <h5 style="margin:0;">${escapeHtml(bank)} <span class="text-muted text-sm" style="font-weight:normal; margin-left:0.5rem;">(${banksMap[bank].length})</span></h5>
                    <div style="display:flex; gap:0.5rem;">
                      <button class="btn btn--ghost btn--sm btn-select-bank" data-bank="${escapeHtml(bank)}">Select Bank</button>
                      <button class="btn btn--ghost btn--sm btn-clear-bank-sel" data-bank="${escapeHtml(bank)}">Clear Bank</button>
                    </div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    ${banksMap[bank].map(q => `
                      <label class="session-question-item" data-id="${q.id}" style="gap: 1rem; padding: 0.75rem 1rem;">
                        <input type="checkbox" class="question-checkbox custom-checkbox" data-bank="${escapeHtml(bank)}" value="${q.id}" />
                        <div style="flex:1;display:flex;flex-direction:column;gap:0.25rem;">
                          ${q.title ? `<span style="font-weight:700;font-size:1rem;color:var(--text-primary);">${escapeHtml(q.title)}</span>` : ''}
                          <span class="session-question-item__text" style="font-weight:${q.title ? '400' : '500'};font-size:0.95rem;color:var(--text-primary);">
                            ${escapeHtml(q.text.length > 80 ? q.text.substring(0, 80) + '...' : q.text)}
                          </span>
                          <div style="display:flex;gap:0.35rem;flex-wrap:wrap;margin-top:0.25rem;">
                            ${q.type ? `<span class="badge badge--primary" style="font-size:0.7rem;">${escapeHtml(q.type)}</span>` : ''}
                            ${(q.tags || []).map(t => `<span class="badge badge--neutral" style="font-size:0.7rem;">${escapeHtml(t)}</span>`).join('')}
                            ${q.codeSnippet ? '<span class="badge badge--neutral" style="font-size:0.7rem;">&lt;/&gt; Code</span>' : ''}
                          </div>
                        </div>
                        <div class="session-question-item__meta">
                          <span class="badge ${q.difficulty === 'easy' ? 'badge--success' : q.difficulty === 'hard' ? 'badge--error' : 'badge--warning'}">${q.difficulty || 'medium'}</span>
                          <span class="text-muted text-sm">${q.timeLimit || 30}s</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
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

  // Select all / clear all globally
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

  // Select / clear by bank
  document.querySelectorAll('.btn-select-bank').forEach(btn => {
    btn.addEventListener('click', () => {
      const bank = btn.dataset.bank;
      document.querySelectorAll(`.question-checkbox[data-bank="${escapeHtml(bank)}"]`).forEach(cb => {
        cb.checked = true;
        selectedIds.add(cb.value);
      });
      updateCount();
    });
  });

  document.querySelectorAll('.btn-clear-bank-sel').forEach(btn => {
    btn.addEventListener('click', () => {
      const bank = btn.dataset.bank;
      document.querySelectorAll(`.question-checkbox[data-bank="${escapeHtml(bank)}"]`).forEach(cb => {
        cb.checked = false;
        selectedIds.delete(cb.value);
      });
      updateCount();
    });
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
      const { id, joinCode } = await createSession(name, [...selectedIds], hostStore.state.activeCourseId);
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
