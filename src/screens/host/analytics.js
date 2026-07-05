// ============================================================
// PollRequest — Analytics Dashboard Screen
// Tabs: Students | Questions | Sessions | Export
// ============================================================

import router from '../../router.js';
import { getUiIcon, getIconSvg, ANSWER_LABELS } from '../../utils/constants.js';
import {
  getStudentAnalytics, getQuestionAnalytics, getSessionSummaries,
  exportStudentsCsv, exportQuestionsCsv, exportSessionsCsv, exportAllDataJson
} from '../../services/analytics-service.js';
import { deleteStudent, deleteAllStudents } from '../../services/student-service.js';
import { deleteSession, deleteAllSessions, getSessionResponses } from '../../services/session-service.js';
import { deleteQuestion, deleteAllQuestions, getAllQuestions } from '../../services/question-service.js';
import { formatPercent, formatDate, showToast } from '../../utils/helpers.js';
import { showModal } from '../../components/modal.js';

export async function renderAnalytics() {
  const app = document.getElementById('app');
  let activeTab = 'students';

  app.innerHTML = `
    <div class="host-layout screen">
      <header class="host-header">
        <button class="btn btn--ghost btn--sm" id="btn-back">
          ${getUiIcon('arrowLeft', 18)} Dashboard
        </button>
        <h3>Analytics</h3>
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn--danger btn--sm" id="btn-wipe-database">
            ${getUiIcon('trash', 16)} Wipe Data
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-export-csv">
            ${getUiIcon('download', 16)} Export CSV
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-export-json">
            ${getUiIcon('download', 16)} Export All
          </button>
        </div>
      </header>

      <main class="host-content">
        <div class="analytics-layout container">
          <div class="tabs" style="margin-bottom:1.5rem;">
            <button class="tab tab--active" data-tab="students">Students</button>
            <button class="tab" data-tab="questions">Questions</button>
            <button class="tab" data-tab="sessions">Sessions</button>
          </div>
          <div id="analytics-content">
            <div class="flex-center" style="padding:3rem;"><div class="spinner"></div></div>
          </div>
        </div>
      </main>
    </div>
  `;

  document.getElementById('btn-back').addEventListener('click', () => router.navigate('/host/dashboard'));

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      activeTab = tab.dataset.tab;
      loadTab(activeTab);
    });
  });

  document.getElementById('btn-wipe-database').addEventListener('click', () => {
    showModal({
      title: 'Wipe Entire Database?',
      content: '<p>Are you absolutely sure? This will delete ALL students, sessions, and questions from the database. This action cannot be undone.</p><p style="margin-top:1rem;color:var(--error);"><strong>We highly recommend exporting all data to JSON first.</strong></p>',
      buttons: [
        { text: 'Cancel', class: 'btn--ghost', close: true },
        {
          text: 'Wipe Everything',
          class: 'btn--danger',
          onClick: async () => {
            try {
              app.innerHTML = '<div class="flex-center screen"><div class="spinner"></div></div>';
              await deleteAllStudents();
              await deleteAllSessions();
              await deleteAllQuestions();
              showToast('Database wiped', 'success');
              router.navigate('/host/dashboard');
            } catch (e) {
              showToast('Failed to wipe data: ' + e.message, 'error');
              router.navigate('/host/analytics');
            }
          }
        }
      ]
    });
  });

  document.getElementById('btn-export-csv').addEventListener('click', async () => {
    try {
      if (activeTab === 'students') await exportStudentsCsv();
      else if (activeTab === 'questions') await exportQuestionsCsv();
      else await exportSessionsCsv();
      showToast('CSV exported', 'success');
    } catch (e) {
      showToast('Export failed: ' + e.message, 'error');
    }
  });

  document.getElementById('btn-export-json').addEventListener('click', async () => {
    try {
      await exportAllDataJson();
      showToast('Full data exported as JSON', 'success');
    } catch (e) {
      showToast('Export failed: ' + e.message, 'error');
    }
  });

  let currentData = [];
  let currentSort = { col: null, asc: true };

  loadTab('students');

  async function loadTab(tab) {
    const container = document.getElementById('analytics-content');
    container.innerHTML = '<div class="flex-center" style="padding:3rem;"><div class="spinner"></div></div>';
    currentSort = { col: null, asc: true };

    try {
      if (tab === 'students') {
        currentData = await getStudentAnalytics();
        renderStudentsTab(container);
      } else if (tab === 'questions') {
        currentData = await getQuestionAnalytics();
        currentData.sort((a, b) => {
          const catA = a.category || '';
          const catB = b.category || '';
          if (catA !== catB) return catA.localeCompare(catB);
          return a.correctRate - b.correctRate;
        });
        renderQuestionsTab(container);
      } else {
        currentData = await getSessionSummaries();
        renderSessionsTab(container);
      }
    } catch (e) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state__title">Could not load data</div><div class="empty-state__text">${e.message}</div></div>`;
    }
  }

  function setupSorting(container, generateHtmlFn, tbodyId) {
    container.querySelectorAll('th[data-sort]').forEach(th => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (currentSort.col === col) {
          currentSort.asc = !currentSort.asc;
        } else {
          currentSort.col = col;
          currentSort.asc = true;
        }

        currentData.sort((a, b) => {
          let valA = a[col];
          let valB = b[col];
          if (typeof valA === 'string') valA = valA.toLowerCase();
          if (typeof valB === 'string') valB = valB.toLowerCase();
          
          if (valA < valB) return currentSort.asc ? -1 : 1;
          if (valA > valB) return currentSort.asc ? 1 : -1;
          return 0;
        });

        // Update headers visual
        container.querySelectorAll('th[data-sort]').forEach(h => {
          h.textContent = h.textContent.replace(' ↑', '').replace(' ↓', '').replace(' ↕', '') + (h === th ? (currentSort.asc ? ' ↑' : ' ↓') : ' ↕');
        });

        document.getElementById(tbodyId).innerHTML = generateHtmlFn(currentData);
        if (tbodyId === 'sessions-tbody') attachSessionRowListeners();
      });
    });
  }

  function renderStudentsTab(container) {
    if (currentData.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state__title">No student data yet</div><div class="empty-state__text">Run a session first to start collecting data.</div></div>';
      return;
    }

    container.innerHTML = `
      <div class="analytics-stats-row">
        <div class="card stat-card"><div class="stat-card__value">${currentData.length}</div><div class="stat-card__label">Total Students</div></div>
        <div class="card stat-card"><div class="stat-card__value">${Math.round(currentData.reduce((s, st) => s + st.accuracy, 0) / currentData.length)}%</div><div class="stat-card__label">Avg Accuracy</div></div>
        <div class="card stat-card"><div class="stat-card__value">${Math.round(currentData.reduce((s, st) => s + st.avgResponseTime, 0) / currentData.length / 1000)}s</div><div class="stat-card__label">Avg Response Time</div></div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
        <button class="btn btn--danger btn--sm" id="btn-clear-students">${getUiIcon('trash', 16)} Clear All Students</button>
      </div>
      <div class="table-wrap">
        <table class="table sortable-table">
          <thead>
            <tr>
              <th data-sort="name">Student ↕</th>
              <th data-sort="accuracy">Accuracy ↕</th>
              <th data-sort="totalAnswered">Answered ↕</th>
              <th data-sort="totalPoints">Points ↕</th>
              <th data-sort="avgResponseTime">Avg Time ↕</th>
              <th data-sort="sessionsAttended">Sessions ↕</th>
              <th data-sort="bestStreak">Best Streak ↕</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="students-tbody">
            ${generateStudentsRows(currentData)}
          </tbody>
        </table>
      </div>
    `;
    setupSorting(container.querySelector('.sortable-table'), generateStudentsRows, 'students-tbody');

    document.getElementById('btn-clear-students').addEventListener('click', () => {
      showModal({
        title: 'Clear All Students?',
        content: 'Are you sure you want to delete all student profiles? This will not delete past sessions.',
        buttons: [
          { text: 'Cancel', class: 'btn--ghost', close: true },
          {
            text: 'Clear Students', class: 'btn--danger',
            onClick: async () => {
              await deleteAllStudents();
              showToast('Students cleared', 'success');
              loadTab('students');
            }
          }
        ]
      });
    });

    attachDeleteListeners('students-tbody', async (id) => {
      await deleteStudent(id);
      showToast('Student deleted', 'success');
      loadTab('students');
    });
  }

  function generateStudentsRows(data) {
    return data.map(s => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="color:var(--accent-primary);">${getIconSvg(s.icon, 32)}</span>
            <strong>${escapeHtml(s.name)}</strong>
          </div>
        </td>
        <td>
          <div class="progress" style="width:80px;display:inline-block;vertical-align:middle;margin-right:0.5rem;">
            <div class="progress__fill" style="width:${s.accuracy}%;background:${s.accuracy >= 70 ? 'var(--success)' : s.accuracy >= 40 ? 'var(--warning)' : 'var(--error)'}"></div>
          </div>
          ${s.accuracy}%
        </td>
        <td>${s.totalCorrect} / ${s.totalAnswered}</td>
        <td>${s.totalPoints.toLocaleString()}</td>
        <td>${(s.avgResponseTime / 1000).toFixed(1)}s</td>
        <td>${s.sessionsAttended}</td>
        <td>${s.bestStreak}</td>
        <td>
          <button class="btn btn--icon btn--ghost btn-delete-row" data-id="${s.uid}" title="Delete Student">
            <span style="color:var(--error);">${getUiIcon('trash', 16)}</span>
          </button>
        </td>
      </tr>
    `).join('');
  }

  function renderQuestionsTab(container) {
    if (currentData.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state__title">No question data yet</div></div>';
      return;
    }

      <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
        <button class="btn btn--danger btn--sm" id="btn-clear-questions">${getUiIcon('trash', 16)} Clear All Questions</button>
      </div>
      <div class="table-wrap">
        <table class="table sortable-table">
          <thead>
            <tr>
              <th data-sort="text" style="width:40%;">Question ↕</th>
              <th data-sort="category">Category ↕</th>
              <th data-sort="difficulty">Difficulty ↕</th>
              <th data-sort="totalAttempts">Attempts ↕</th>
              <th data-sort="correctRate">Correct Rate ↕</th>
              <th data-sort="avgResponseTime">Avg Time ↕</th>
              <th data-sort="mostCommonWrongAnswer">Most Common Distractor ↕</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="questions-tbody">
            ${generateQuestionsRows(currentData)}
          </tbody>
        </table>
      </div>
    `;
    setupSorting(container.querySelector('.sortable-table'), generateQuestionsRows, 'questions-tbody');

    document.getElementById('btn-clear-questions').addEventListener('click', () => {
      showModal({
        title: 'Clear All Questions?',
        content: 'Are you sure you want to delete all questions? This will permanently remove them from the Question Bank.',
        buttons: [
          { text: 'Cancel', class: 'btn--ghost', close: true },
          {
            text: 'Clear Questions', class: 'btn--danger',
            onClick: async () => {
              await deleteAllQuestions();
              showToast('Questions cleared', 'success');
              loadTab('questions');
            }
          }
        ]
      });
    });

    attachDeleteListeners('questions-tbody', async (id) => {
      await deleteQuestion(id);
      showToast('Question deleted', 'success');
      loadTab('questions');
    });
  }

  function generateQuestionsRows(data) {
    return data.map(q => {
      let distractorStr = '-';
      if (q.mostCommonWrongAnswer) {
        distractorStr = q.mostCommonWrongAnswer.split(',').map(idx => ANSWER_LABELS[parseInt(idx)]).join(' & ');
      }
      return `
        <tr>
          <td style="font-weight:500;">${escapeHtml(q.text.length > 50 ? q.text.substring(0, 50) + '...' : q.text)}</td>
          <td><span class="badge badge--primary">${q.category || 'general'}</span></td>
          <td><span class="badge ${q.difficulty === 'easy' ? 'badge--success' : q.difficulty === 'hard' ? 'badge--error' : 'badge--warning'}">${q.difficulty}</span></td>
          <td>${q.totalAttempts}</td>
          <td>
            <span class="${q.correctRate >= 70 ? '' : q.correctRate >= 40 ? 'text-bold' : ''}" style="color:${q.correctRate >= 70 ? 'var(--success)' : q.correctRate >= 40 ? 'var(--warning)' : 'var(--error)'}">
              ${q.correctRate}%
            </span>
          </td>
          <td>${(q.avgResponseTime / 1000).toFixed(1)}s</td>
          <td><span style="font-weight:700;color:var(--error);">${distractorStr}</span></td>
          <td>
            <button class="btn btn--icon btn--ghost btn-delete-row" data-id="${q.id}" title="Delete Question">
              <span style="color:var(--error);">${getUiIcon('trash', 16)}</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderSessionsTab(container) {
    if (currentData.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state__title">No sessions yet</div></div>';
      return;
    }

    container.innerHTML = `
      <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
        <button class="btn btn--danger btn--sm" id="btn-clear-sessions">${getUiIcon('trash', 16)} Clear All Sessions</button>
      </div>
      <div class="table-wrap">
        <table class="table sortable-table" style="width:100%;">
          <thead>
            <tr>
              <th data-sort="name">Session ↕</th>
              <th data-sort="status">Status ↕</th>
              <th data-sort="date">Date ↕</th>
              <th data-sort="playerCount">Players ↕</th>
              <th data-sort="questionCount">Questions ↕</th>
              <th data-sort="classAccuracy">Accuracy ↕</th>
              <th data-sort="avgScore">Avg Score ↕</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="sessions-tbody">
            ${generateSessionsRows(currentData)}
          </tbody>
        </table>
      </div>
    `;
    setupSorting(container.querySelector('.sortable-table'), generateSessionsRows, 'sessions-tbody');
    attachSessionRowListeners();

    document.getElementById('btn-clear-sessions').addEventListener('click', () => {
      showModal({
        title: 'Clear All Sessions?',
        content: 'Are you sure you want to delete all past sessions? Their data will be lost.',
        buttons: [
          { text: 'Cancel', class: 'btn--ghost', close: true },
          {
            text: 'Clear Sessions', class: 'btn--danger',
            onClick: async () => {
              await deleteAllSessions();
              showToast('Sessions cleared', 'success');
              loadTab('sessions');
            }
          }
        ]
      });
    });

    attachDeleteListeners('sessions-tbody', async (id) => {
      await deleteSession(id);
      showToast('Session deleted', 'success');
      loadTab('sessions');
    }, '.btn-delete-row-session');
  }

  function generateSessionsRows(data) {
    return data.map(s => `
      <tr class="session-row" data-id="${s.id}" style="cursor:pointer;" title="Click to expand question details">
        <td style="font-weight:600;display:flex;align-items:center;gap:0.5rem;" class="session-expand-cell">
          <svg class="expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s;"><polyline points="9 18 15 12 9 6"></polyline></svg>
          ${escapeHtml(s.name)}
        </td>
        <td><span class="badge ${s.status === 'ended' ? 'badge--success' : 'badge--warning'}">${s.status}</span></td>
        <td>${formatDate(s.date)}</td>
        <td>${s.playerCount}</td>
        <td>${s.questionCount}</td>
        <td>${s.classAccuracy}%</td>
        <td>${s.avgScore.toLocaleString()}</td>
        <td>
          <button class="btn btn--icon btn--ghost btn-delete-row-session" data-id="${s.id}" title="Delete Session" style="position:relative;z-index:2;">
            <span style="color:var(--error);">${getUiIcon('trash', 16)}</span>
          </button>
        </td>
      </tr>
      <tr class="session-details-row" id="details-${s.id}" style="display:none;background:var(--bg-tertiary);">
        <td colspan="8" style="padding:1.5rem;">
          <div class="flex-center spinner-container"><div class="spinner spinner--sm"></div></div>
          <div class="details-content" style="display:none;"></div>
        </td>
      </tr>
    `).join('');
  }

  function attachSessionRowListeners() {
    document.querySelectorAll('.session-row').forEach(row => {
      row.addEventListener('click', async (e) => {
        if (e.target.closest('.btn-delete-row-session')) return; // ignore delete button clicks

        const sessionId = row.dataset.id;
        const detailsRow = document.getElementById(`details-${sessionId}`);
        const icon = row.querySelector('.expand-icon');
        
        if (detailsRow.style.display === 'none') {
          detailsRow.style.display = 'table-row';
          icon.style.transform = 'rotate(90deg)';
          
          const contentDiv = detailsRow.querySelector('.details-content');
          const spinner = detailsRow.querySelector('.spinner-container');
          
          if (contentDiv.innerHTML === '') {
            try {
              const responses = await getSessionResponses(sessionId);
              const allQs = await getAllQuestions();
              const qMap = new Map(allQs.map(q => [q.id, q]));
              
              // Group responses by question index
              const byQuestion = {};
              responses.forEach(r => {
                if (!byQuestion[r.questionId]) {
                  byQuestion[r.questionId] = { q: qMap.get(r.questionId), attempts: 0, correct: 0 };
                }
                byQuestion[r.questionId].attempts++;
                if (r.correct) byQuestion[r.questionId].correct++;
              });
              
              const qRows = Object.values(byQuestion).map(({q, attempts, correct}) => {
                const rate = attempts > 0 ? Math.round((correct/attempts)*100) : 0;
                return `
                  <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-color);">
                    <div style="flex:1;">${escapeHtml(q ? q.text : 'Unknown Question')}</div>
                    <div style="width:100px;text-align:right;">
                      <span style="color:${rate >= 70 ? 'var(--success)' : rate >= 40 ? 'var(--warning)' : 'var(--error)'};font-weight:600;">${rate}%</span>
                    </div>
                  </div>
                `;
              }).join('');

              contentDiv.innerHTML = qRows || '<div class="text-muted">No questions answered in this session.</div>';
              spinner.style.display = 'none';
              contentDiv.style.display = 'block';
            } catch (e) {
              spinner.style.display = 'none';
              contentDiv.innerHTML = '<div class="text-error">Failed to load details</div>';
              contentDiv.style.display = 'block';
            }
          }
        } else {
          detailsRow.style.display = 'none';
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });
  }

  function attachDeleteListeners(tbodyId, deleteFn, btnClass = '.btn-delete-row') {
    document.getElementById(tbodyId)?.addEventListener('click', (e) => {
      const btn = e.target.closest(btnClass);
      if (btn) {
        e.stopPropagation();
        const id = btn.dataset.id;
        showModal({
          title: 'Confirm Delete',
          content: 'Are you sure you want to delete this row?',
          buttons: [
            { text: 'Cancel', class: 'btn--ghost', close: true },
            {
              text: 'Delete', class: 'btn--danger',
              onClick: async () => {
                await deleteFn(id);
              }
            }
          ]
        });
      }
    });
  }
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
