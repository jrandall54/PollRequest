// ============================================================
// PollRequest — Application Entry Point
// Routes, initialization, and app bootstrap
// ============================================================

import './styles/index.css';
import router from './router.js';
import { isFirebaseConfigured } from './firebase.js';
import { loadSavedTheme } from './components/theme-switcher.js';

// ── Screen Imports ──────────────────────────────────────────
import { renderLanding } from './screens/landing.js';
import { renderHostLogin } from './screens/host/login.js';
import { renderDashboard } from './screens/host/dashboard.js';
import { renderSessionSetup } from './screens/host/session-setup.js';
import { renderLobby } from './screens/host/lobby.js';
import { renderHostGame } from './screens/host/game.js';
import { renderPodium } from './screens/host/podium.js';
import { renderQuestionManager } from './screens/host/question-manager.js';
import { renderAnalytics } from './screens/host/analytics.js';
import { renderPlayerJoin } from './screens/player/join.js';
import { renderProfileSetup } from './screens/player/profile-setup.js';
import { renderWaiting } from './screens/player/waiting.js';
import { renderPlayerGame } from './screens/player/game.js';

// ── Initialize ──────────────────────────────────────────────
function init() {
  // Load saved theme
  loadSavedTheme();
  createGlobalThemeSwitcher();

  // Check Firebase configuration
  if (!isFirebaseConfigured()) {
    showFirebaseWarning();
  }

  // ── Register Routes ─────────────────────────────────────

  // Landing
  router.addRoute('/', () => renderLanding());

  // Host routes
  router.addRoute('/host/login', () => renderHostLogin());
  router.addRoute('/host/dashboard', () => renderDashboard());
  router.addRoute('/host/session-setup', () => renderSessionSetup());
  router.addRoute('/host/lobby/:id', (params) => renderLobby(params));
  router.addRoute('/host/game/:id', (params) => renderHostGame(params));
  router.addRoute('/host/podium/:id', (params) => renderPodium(params));
  router.addRoute('/host/questions', () => renderQuestionManager());
  router.addRoute('/host/analytics', () => renderAnalytics());

  // Player routes
  router.addRoute('/player/join', () => renderPlayerJoin());
  router.addRoute('/player/profile/:id', (params) => renderProfileSetup(params));
  router.addRoute('/player/waiting/:id', (params) => renderWaiting(params));
  router.addRoute('/player/game/:id', (params) => renderPlayerGame(params));

  // ── Navigation Guard ────────────────────────────────────
  router.beforeEach((to) => {
    // Protect host routes (except login)
    if (to.startsWith('/host/') && to !== '/host/login') {
      const isHost = sessionStorage.getItem('pollrequest_host') === 'true';
      if (!isHost) {
        router.navigate('/host/login');
        return false;
      }
    }
    return true;
  });

  // Start routing
  router.start();
}

// ── Global Theme Switcher ───────────────────────────────────
function createGlobalThemeSwitcher() {
  const container = document.createElement('div');
  container.id = 'global-theme-switcher';
  container.style.cssText = `
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
    z-index: 99999;
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
  `;
  document.body.appendChild(container);
  
  // Use existing component logic
  import('./components/theme-switcher.js').then(({ createThemeSwitcher }) => {
    createThemeSwitcher(container);
  });
  
  // Hide on game screens
  const style = document.createElement('style');
  style.textContent = `
    body:has(.question-screen, .results-screen, .podium-screen, .player-result) #global-theme-switcher {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

// ── Firebase Warning Banner ─────────────────────────────────
function showFirebaseWarning() {
  const banner = document.createElement('div');
  banner.id = 'firebase-warning';
  banner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fef3c7;
    color: #92400e;
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    z-index: 99999;
    border-top: 2px solid #f59e0b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  `;
  banner.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <span>Firebase not configured. See <strong>SETUP.md</strong> for instructions. The app will not function until Firebase is connected.</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;font-size:1.25rem;margin-left:1rem;">&times;</button>
  `;
  document.body.appendChild(banner);
}

// ── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

// Also handle if DOM is already ready (Vite HMR)
if (document.readyState !== 'loading') {
  init();
}
