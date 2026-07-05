// ============================================================
// PollRequest — Landing Screen
// Entry point: "I'm a Teacher" / "I'm a Student"
// ============================================================

import { getUiIcon } from '../utils/constants.js';
import router from '../router.js';

export function renderLanding() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="landing-screen screen">
      <div class="landing-bg"></div>
      <div class="landing-content">
        <div class="landing-logo">
          <div class="landing-logo__icon">
            ${getUiIcon('code', 48)}
          </div>
          <h1 class="landing-logo__text">
            <span class="text-gradient">PollRequest</span>
          </h1>
          <p class="landing-logo__tagline">Interactive CS quizzes for the classroom</p>
        </div>

        <div class="landing-buttons">
          <button class="landing-btn landing-btn--teacher card card--hover" id="btn-teacher">
            <div class="landing-btn__icon" style="background: var(--accent-primary);">
              ${getUiIcon('settings', 28)}
            </div>
            <div class="landing-btn__text">
              <span class="landing-btn__title">I'm the Teacher</span>
              <span class="landing-btn__desc">Host a session or manage questions</span>
            </div>
          </button>

          <button class="landing-btn landing-btn--student card card--hover" id="btn-student">
            <div class="landing-btn__icon" style="background: var(--accent-secondary);">
              ${getUiIcon('users', 28)}
            </div>
            <div class="landing-btn__text">
              <span class="landing-btn__title">I'm a Student</span>
              <span class="landing-btn__desc">Join a session with a code</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;

  // Inject landing-specific styles
  injectLandingStyles();

  // Event listeners
  document.getElementById('btn-teacher').addEventListener('click', () => {
    router.navigate('/host/login');
  });

  document.getElementById('btn-student').addEventListener('click', () => {
    router.navigate('/player/join');
  });
}

function injectLandingStyles() {
  if (document.querySelector('#landing-styles')) return;
  const style = document.createElement('style');
  style.id = 'landing-styles';
  style.textContent = `
    .landing-screen {
      height: 100vh;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .landing-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 20% 20%, var(--accent-primary-soft) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 50%);
      z-index: 0;
    }
    .landing-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
    }
    .landing-logo {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
    .landing-logo__icon {
      color: var(--accent-primary);
      animation: float 3s ease-in-out infinite;
    }
    .landing-logo__text {
      font-size: clamp(2.5rem, 7vw, 3.5rem);
      font-weight: 900;
      letter-spacing: -0.03em;
    }
    .landing-logo__tagline {
      font-size: 1.125rem;
      color: var(--text-secondary);
    }
    .landing-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
    .landing-btn {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.5rem;
      text-align: left;
      width: 100%;
      cursor: pointer;
    }
    .landing-btn__icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }
    .landing-btn__text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .landing-btn__title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .landing-btn__desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .landing-footer {
      padding-top: 1rem;
    }
  `;
  document.head.appendChild(style);
}
