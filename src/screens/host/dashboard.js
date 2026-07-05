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

import { renderHostHeader } from '../../components/host-header.js';
import { hostStore } from '../../state.js';

export async function renderDashboard() {
  const app = document.getElementById('app');
  
  // Wait for header HTML to resolve
  const headerHtml = await renderHostHeader();

  // Fetch counts for dashboard cards
  let questionCount = 0, sessionCount = 0, studentCount = 0;
  try {
    const courseId = hostStore.state.activeCourseId;
    const [questions, sessions, students] = await Promise.all([
      getAllQuestions(courseId),
      getAllSessions(courseId),
      getAllStudents(courseId),
    ]);
    questionCount = questions.length;
    sessionCount = sessions.filter(s => s.status === 'ended').length;
    studentCount = students.length;
  } catch (e) {
    console.warn('Could not load dashboard stats:', e.message);
  }

  app.innerHTML = `
    <div class="host-layout screen">
      ${headerHtml}

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
}
