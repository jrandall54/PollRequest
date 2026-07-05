import { getProfile } from '../services/student-service.js';
import { getIconSvg } from '../utils/constants.js';

export async function showStudentStats(uid, name, icon) {
  // Check if modal already exists
  if (document.getElementById('student-stats-modal')) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'student-stats-modal';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  `;

  // Basic skeleton while loading
  const content = document.createElement('div');
  content.className = 'screen'; // Use screen styling for standard panel look
  content.style.cssText = `
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    position: relative;
    transform: translateY(20px);
    transition: transform 0.2s ease;
    border: 1px solid var(--border-color);
  `;

  content.innerHTML = `
    <button id="btn-close-stats" style="
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 0.5rem;
    ">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div style="text-align:center;margin-bottom:2rem;">
      <div style="color:var(--accent-primary);margin-bottom:1rem;">
        ${getIconSvg(icon, 64)}
      </div>
      <h2 style="margin:0;color:var(--text-primary);font-size:1.5rem;">${escapeHtml(name)}</h2>
      <div style="color:var(--text-tertiary);font-size:0.875rem;margin-top:0.25rem;">Student Statistics</div>
    </div>
    <div id="stats-body" style="min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div class="spinner"></div>
    </div>
  `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  });

  // Close handler
  function close() {
    overlay.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 200);
  }

  document.getElementById('btn-close-stats').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Fetch stats
  try {
    const profile = await getProfile(uid);
    const stats = profile?.stats || {};
    
    const accuracy = stats.totalAnswered > 0 
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) 
      : 0;

    const statsBody = document.getElementById('stats-body');
    if (!statsBody) return; // Modal was closed while loading

    statsBody.style.display = 'block';
    statsBody.style.minHeight = 'auto';
    
    // Highlighted Stats
    statsBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <div style="font-size: 1.75rem; font-weight: 800; color: var(--accent-primary); font-family: 'JetBrains Mono', monospace;">
            ${(stats.totalPoints || 0).toLocaleString()}
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem; font-weight: 600;">Total Points</div>
        </div>
        
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <div style="font-size: 1.75rem; font-weight: 800; color: ${accuracy >= 70 ? 'var(--success)' : accuracy >= 40 ? 'var(--warning)' : 'var(--error)'}; font-family: 'JetBrains Mono', monospace;">
            ${accuracy}%
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem; font-weight: 600;">Accuracy</div>
        </div>
      </div>

      <div style="background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Questions Answered</span>
          <span style="font-weight: 600; color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">${stats.totalAnswered || 0}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Correct Answers</span>
          <span style="font-weight: 600; color: var(--success); font-family: 'JetBrains Mono', monospace;">${stats.totalCorrect || 0}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Best Streak</span>
          <span style="font-weight: 600; color: var(--warning); font-family: 'JetBrains Mono', monospace;">${stats.bestStreak || 0} 🔥</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem;">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Sessions Joined</span>
          <span style="font-weight: 600; color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">${stats.sessionsAttended || 0}</span>
        </div>
      </div>
    `;

  } catch (error) {
    console.error('Failed to load stats:', error);
    const statsBody = document.getElementById('stats-body');
    if (statsBody) {
      statsBody.innerHTML = `
        <div style="color: var(--error); text-align: center;">
          Failed to load statistics. Please try again.
        </div>
      `;
    }
  }
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
