// ============================================================
// PollRequest — Analytics Dashboard Screen
// Tabs: Students | Questions | Sessions | Export
// ============================================================

import router from '../../router.js';
import { getUiIcon, getIconSvg } from '../../utils/constants.js';
import {
  getStudentAnalytics, getQuestionAnalytics, getSessionSummaries,
  exportStudentsCsv, exportQuestionsCsv, exportSessionsCsv, exportAllDataJson
} from '../../services/analytics-service.js';
import { formatPercent, formatDate, showToast } from '../../utils/helpers.js';

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
          <button class="btn btn--secondary btn--sm" id="btn-export-csv">
            ${getUiIcon('download', 16)} Export CSV
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-export-json">
            ${getUiIcon('download', 16)} Export All (JSON)
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

  // Navigation
  document.getElementById('btn-back').addEventListener('click', () => router.navigate('/host/dashboard'));

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      activeTab = tab.dataset.tab;
      loadTab(activeTab);
    });
  });

  // Export buttons
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

  // Load initial tab
  loadTab('students');

  async function loadTab(tab) {
    const container = document.getElementById('analytics-content');
    container.innerHTML = '<div class="flex-center" style="padding:3rem;"><div class="spinner"></div></div>';

    try {
      if (tab === 'students') {
        const students = await getStudentAnalytics();
        renderStudentsTab(container, students);
      } else if (tab === 'questions') {
        const questions = await getQuestionAnalytics();
        renderQuestionsTab(container, questions);
      } else {
        const sessions = await getSessionSummaries();
        renderSessionsTab(container, sessions);
      }
    } catch (e) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state__title">Could not load data</div><div class="empty-state__text">${e.message}</div></div>`;
    }
  }

  function renderStudentsTab(container, students) {
    if (students.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state__title">No student data yet</div><div class="empty-state__text">Run a session first to start collecting data.</div></div>';
      return;
    }

    container.innerHTML = `
      <div class="analytics-stats-row">
        <div class="card stat-card"><div class="stat-card__value">${students.length}</div><div class="stat-card__label">Total Students</div></div>
        <div class="card stat-card"><div class="stat-card__value">${Math.round(students.reduce((s, st) => s + st.accuracy, 0) / students.length)}%</div><div class="stat-card__label">Avg Accuracy</div></div>
        <div class="card stat-card"><div class="stat-card__value">${Math.round(students.reduce((s, st) => s + st.avgResponseTime, 0) / students.length / 1000)}s</div><div class="stat-card__label">Avg Response Time</div></div>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Accuracy</th>
              <th>Answered</th>
              <th>Points</th>
              <th>Avg Time</th>
              <th>Sessions</th>
              <th>Best Streak</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span style="color:var(--accent-primary);">${getIconSvg(s.icon, 20)}</span>
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
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderQuestionsTab(container, questions) {
    if (questions.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state__title">No question data yet</div></div>';
      return;
    }

    container.innerHTML = `
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th style="width:40%;">Question</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Attempts</th>
              <th>Correct Rate</th>
              <th>Avg Time</th>
            </tr>
          </thead>
          <tbody>
            ${questions.map(q => `
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
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderSessionsTab(container, sessions) {
    if (sessions.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state__title">No sessions yet</div></div>';
      return;
    }

    container.innerHTML = `
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Session</th>
              <th>Status</th>
              <th>Date</th>
              <th>Players</th>
              <th>Questions</th>
              <th>Accuracy</th>
              <th>Avg Score</th>
            </tr>
          </thead>
          <tbody>
            ${sessions.map(s => `
              <tr>
                <td style="font-weight:600;">${escapeHtml(s.name)}</td>
                <td><span class="badge ${s.status === 'ended' ? 'badge--success' : 'badge--warning'}">${s.status}</span></td>
                <td>${formatDate(s.date)}</td>
                <td>${s.playerCount}</td>
                <td>${s.questionCount}</td>
                <td>${s.classAccuracy}%</td>
                <td>${s.avgScore.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
