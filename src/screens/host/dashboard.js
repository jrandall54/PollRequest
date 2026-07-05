// ============================================================
// PollRequest — Host Dashboard Screen
// Main hub: New Session, Manage Questions, Analytics
// ============================================================

import router from '../../router.js';
import { getUiIcon } from '../../utils/constants.js';
import { createThemeSwitcher } from '../../components/theme-switcher.js';
import { getAllQuestions } from '../../services/question-service.js';
import { getAllSessions } from '../../services/session-service.js';
import { getAllStudents } from '../../services/student-service.js';

export async function renderDashboard() {
  const app = document.getElementById('app');

  // Fetch counts for dashboard cards
  let questionCount = 0, sessionCount = 0, studentCount = 0;
  try {
    const [questions, sessions, students] = await Promise.all([
      getAllQuestions(),
      getAllSessions(),
      getAllStudents(),
    ]);
    questionCount = questions.length;
    sessionCount = sessions.filter(s => s.status === 'ended').length;
    studentCount = students.length;
  } catch (e) {
    console.warn('Could not load dashboard stats:', e.message);
  }

  app.innerHTML = `
    <div class="host-layout screen">
      <header class="host-header">
        <div class="host-header__brand">
          ${getUiIcon('code', 28)}
          <span class="text-gradient">PollRequest</span>
        </div>
        <div class="host-header__actions">
          <button class="btn btn--secondary" id="db-logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </header>

      <main class="host-content">
        <div class="container">
          <div style="margin-bottom:2rem;">
            <h2>Dashboard</h2>
            <p class="text-muted">Welcome back. What would you like to do?</p>
          </div>

          <div class="dashboard-grid">
            <div class="card card--hover dashboard-card" id="card-new-session">
              <div class="dashboard-card__icon" style="background:var(--accent-primary);">
                ${getUiIcon('play', 24)}
              </div>
              <div>
                <div class="dashboard-card__title">New Session</div>
                <div class="dashboard-card__desc">Start a live quiz session for your class</div>
              </div>
            </div>

            <div class="card card--hover dashboard-card" id="card-questions">
              <div class="dashboard-card__icon" style="background:var(--accent-secondary);">
                ${getUiIcon('fileText', 24)}
              </div>
              <div>
                <div class="dashboard-card__title">Manage Questions</div>
                <div class="dashboard-card__desc">${questionCount} question${questionCount !== 1 ? 's' : ''} in the bank</div>
              </div>
            </div>

            <div class="card card--hover dashboard-card" id="card-analytics">
              <div class="dashboard-card__icon" style="background:var(--success);">
                ${getUiIcon('barChart', 24)}
              </div>
              <div>
                <div class="dashboard-card__title">Analytics</div>
                <div class="dashboard-card__desc">${studentCount} student${studentCount !== 1 ? 's' : ''} tracked across ${sessionCount} session${sessionCount !== 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  // Navigation
  document.getElementById('card-new-session').addEventListener('click', () => {
    router.navigate('/host/session-setup');
  });
  document.getElementById('card-questions').addEventListener('click', () => {
    router.navigate('/host/questions');
  });
  document.getElementById('card-analytics').addEventListener('click', () => {
    router.navigate('/host/analytics');
  });
  document.getElementById('db-logout').addEventListener('click', () => {
    sessionStorage.removeItem('pollrequest_host');
    router.navigate('/');
  });
}
