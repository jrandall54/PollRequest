// ============================================================
// PollRequest — Host Game Screen
// Controls question display, timer, results, and leaderboard
// This is the main projector view during a live session
// ============================================================

import router from '../../router.js';
import { getUiIcon, getIconSvg, ANSWER_COLORS, ANSWER_LABELS } from '../../utils/constants.js';
import { listenToSession, listenToResponses, advanceQuestion, pauseTimer, resumeTimer, showResults, endSession } from '../../services/session-service.js';
import { getQuestionsByIds } from '../../services/question-service.js';
import { getLeaderboard } from '../../services/scoring-service.js';
import { renderCodeBlock } from '../../components/code-block.js';
import { createTimer } from '../../components/timer.js';
import { renderBarChart } from '../../components/bar-chart.js';
import { launchConfetti } from '../../components/confetti.js';
import { sessionStore } from '../../state.js';

export async function renderHostGame(params) {
  const app = document.getElementById('app');
  const sessionId = params.id;

  if (!sessionId) {
    router.navigate('/host/dashboard');
    return;
  }

  let questions = [];
  let responses = [];
  let timer = null;
  let currentView = null; // 'question' | 'results' | 'leaderboard'

  app.innerHTML = `<div class="flex-center" style="min-height:100vh;"><div class="spinner spinner--lg"></div></div>`;

  // Listen for responses
  const unsubResponses = listenToResponses(sessionId, (allResponses) => {
    responses = allResponses;
    updateResponseCount();
  });

  // Listen to session state
  const unsubSession = listenToSession(sessionId, async (data) => {
    if (!data) return;

    // Load questions once
    if (questions.length === 0 && data.questionIds) {
      try {
        questions = await getQuestionsByIds(data.questionIds);
      } catch (e) {
        console.warn('Could not load questions:', e);
      }
    }

    const qIdx = data.currentQuestionIndex ?? 0;
    const qState = data.currentQuestionState;

    if (qState === 'accepting' || qState === 'paused') {
      if (currentView !== 'question') {
        currentView = 'question';
        renderQuestionView(data, qIdx);
      }
      // Handle timer sync
      if (qState === 'paused' && timer) {
        timer.pause();
      }
    } else if (qState === 'results') {
      if (currentView !== 'results') {
        currentView = 'results';
        renderResultsView(data, qIdx);
      }
    }
  });

  function renderQuestionView(data, qIdx) {
    const question = questions[qIdx];
    if (!question) return;

    const total = questions.length;
    const isMulti = question.multiSelect;

    app.innerHTML = `
      <div class="question-screen screen">
        <div class="question-screen__header">
          <div class="question-screen__progress">
            Question ${qIdx + 1} of ${total}
            ${question.category ? `<span class="badge badge--primary question-screen__category" style="margin-left:0.5rem;">${question.category}</span>` : ''}
          </div>
          <div style="display:flex;align-items:center;gap:1rem;">
            <span class="text-muted text-sm" id="response-count">0 / 0 answered</span>
            <div id="timer-container"></div>
          </div>
        </div>

        <div class="question-screen__body">
          <div class="question-text">${escapeHtml(question.text)}</div>

          ${question.codeSnippetMain ? `
            <div class="dual-snippets">
              <div>
                <div class="text-sm text-muted" style="margin-bottom:0.25rem;">// Class Definition</div>
                <div class="question-code-wrap" style="height:100%;">
                  ${renderCodeBlock(question.codeSnippet, question.codeLanguage)}
                </div>
              </div>
              <div>
                <div class="text-sm text-muted" style="margin-bottom:0.25rem;">// Main Method</div>
                <div class="question-code-wrap" style="height:100%;">
                  ${renderCodeBlock(question.codeSnippetMain, question.codeLanguage)}
                </div>
              </div>
            </div>
          ` : question.codeSnippet ? `
            <div class="question-code-wrap">
              ${renderCodeBlock(question.codeSnippet, question.codeLanguage)}
            </div>
          ` : ''}

          ${isMulti ? '<div class="text-center text-muted text-sm" style="margin-bottom:0.5rem;">Select all that apply</div>' : ''}

          <div class="question-answers-grid ${question.choices.length <= 3 ? 'question-answers-grid--single-col' : ''}">
            ${question.choices.map((c, i) => `
              <div class="answer-btn answer-btn--${ANSWER_COLORS[i]} answer-btn--projector answer-btn--disabled">
                <span class="answer-btn__label">${ANSWER_LABELS[i]}</span>
                <span class="answer-btn__text">${escapeHtml(c.text)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;justify-content:center;gap:1rem;padding:1rem;">
          <button class="btn btn--secondary" id="btn-pause">
            ${getUiIcon('pause', 18)} Pause
          </button>
          <button class="btn btn--primary" id="btn-show-results">
            Skip to Results
          </button>
        </div>
      </div>
    `;

    // Create timer
    const timerContainer = document.getElementById('timer-container');
    timer = createTimer(timerContainer, {
      totalSeconds: question.timeLimit || 30,
      size: 'normal',
      onComplete: () => {
        showResults(sessionId);
      },
    });

    // Handle timer state based on session data
    if (data.timerPaused) {
      timer.startFromRemaining(data.timerRemaining || question.timeLimit);
      timer.pause();
      updatePauseButton(true);
    } else if (data.timerEnd) {
      const remaining = Math.max(0, (data.timerEnd.toDate().getTime() - Date.now()) / 1000);
      if (remaining > 0) {
        timer.startFromRemaining(remaining);
      } else {
        showResults(sessionId);
      }
    } else {
      timer.start();
    }

    // Pause / Resume
    let isPaused = data.timerPaused || false;
    document.getElementById('btn-pause').addEventListener('click', async () => {
      if (isPaused) {
        const remaining = timer.getRemaining();
        await resumeTimer(sessionId, remaining);
        timer.resume();
        isPaused = false;
      } else {
        const remaining = timer.getRemaining();
        await pauseTimer(sessionId, remaining);
        timer.pause();
        isPaused = true;
      }
      updatePauseButton(isPaused);
    });

    // Skip to results
    document.getElementById('btn-show-results').addEventListener('click', () => {
      if (timer) timer.stop();
      showResults(sessionId);
    });

    updateResponseCount();
  }

  function updatePauseButton(isPaused) {
    const btn = document.getElementById('btn-pause');
    if (!btn) return;
    btn.innerHTML = isPaused
      ? `${getUiIcon('play', 18)} Resume`
      : `${getUiIcon('pause', 18)} Pause`;
  }

  function updateResponseCount() {
    const el = document.getElementById('response-count');
    if (!el) return;
    const qIdx = sessionStore.state.currentQuestionIndex ?? 0;
    const question = questions[qIdx];
    if (!question) return;

    const qResponses = responses.filter(r => r.questionIndex === qIdx);
    const playerCount = Object.keys(sessionStore.state.players || {}).length;
    el.textContent = `${qResponses.length} / ${playerCount} answered`;
  }

  function renderResultsView(data, qIdx) {
    const question = questions[qIdx];
    if (!question) return;
    if (timer) timer.stop();

    const total = questions.length;
    const isLast = qIdx >= total - 1;
    const qResponses = responses.filter(r => r.questionIndex === qIdx);

    // Build answer distribution data
    const distribution = question.choices.map((c, i) => {
      const count = qResponses.filter(r => r.selectedChoices?.includes(i)).length;
      return {
        label: ANSWER_LABELS[i],
        value: count,
        color: ANSWER_COLORS[i],
        isCorrect: c.isCorrect,
      };
    });

    const correctCount = qResponses.filter(r => r.correct).length;
    const totalResponses = qResponses.length;
    const accuracy = totalResponses > 0 ? Math.round((correctCount / totalResponses) * 100) : 0;

    // Get leaderboard
    const leaderboard = getLeaderboard(data.players || {});

    app.innerHTML = `
      <div class="results-screen screen">
        <div style="width:100%;max-width:1100px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h2>Results - Question ${qIdx + 1}</h2>
            <span class="badge ${accuracy >= 70 ? 'badge--success' : accuracy >= 40 ? 'badge--warning' : 'badge--error'}">
              ${accuracy}% correct
            </span>
          </div>

          <div class="question-text" style="font-size:1.25rem;margin-bottom:1rem;text-align:left;">
            ${escapeHtml(question.text)}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;">
            <div>
              <h4 style="margin-bottom:1rem;">Answer Distribution</h4>
              <div id="results-chart"></div>
              
              <div class="correct-answer-callout" style="margin-top:1.5rem;padding:1rem;background:var(--success-soft);color:var(--success);border-radius:var(--radius-md);border:1px solid var(--success);">
                <strong style="font-size:1rem;display:flex;align-items:center;gap:0.5rem;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Correct Answer:
                </strong>
                <div style="margin-top:0.5rem;font-size:1.1rem;font-weight:700;">
                  ${question.choices.filter(c => c.isCorrect).map(c => escapeHtml(c.text)).join(' <span style="opacity:0.5;margin:0 0.5rem;">and</span> ')}
                </div>
              </div>
            </div>

            <div>
              <h4 style="margin-bottom:1rem;">Leaderboard</h4>
              <div class="leaderboard-list" id="results-leaderboard">
                ${leaderboard.slice(0, 5).map((p, i) => `
                  <div class="leaderboard-row" style="animation-delay:${i * 0.1}s">
                    <div class="leaderboard-row__rank ${i < 3 ? 'leaderboard-row__rank--' + (i + 1) : ''}">${i + 1}</div>
                    <div class="leaderboard-row__player">
                      <span class="leaderboard-row__icon">${getIconSvg(p.icon, 24)}</span>
                      <span class="leaderboard-row__name">${escapeHtml(p.name)}</span>
                    </div>
                    <span class="leaderboard-row__points">${p.points.toLocaleString()}</span>
                  </div>
                `).join('')}
                ${leaderboard.length === 0 ? '<div class="text-muted text-center" style="padding:1rem;">No responses yet</div>' : ''}
              </div>
            </div>
          </div>

          ${question.explanation ? `
            <div class="results-explanation" style="margin-top:1rem;">
              <strong>Explanation:</strong> ${escapeHtml(question.explanation)}
            </div>
          ` : ''}

          <div style="display:flex;justify-content:center;gap:1rem;margin-top:1rem;">
            ${isLast ? `
              <button class="btn btn--primary btn--xl" id="btn-final-podium">
                ${getUiIcon('trophy', 22)} Show Final Results
              </button>
            ` : `
              <button class="btn btn--primary btn--xl" id="btn-next-question">
                Next Question ${getUiIcon('skip', 22)}
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    // Render bar chart
    const chartContainer = document.getElementById('results-chart');
    renderBarChart(chartContainer, { data: distribution });

    // Next question
    document.getElementById('btn-next-question')?.addEventListener('click', async () => {
      const nextQ = questions[qIdx + 1];
      if (nextQ) {
        await advanceQuestion(sessionId, nextQ.timeLimit || 30);
      }
    });

    // Final podium
    document.getElementById('btn-final-podium')?.addEventListener('click', () => {
      router.navigate(`/host/podium/${sessionId}`);
    });
  }

  // Return cleanup
  return () => {
    unsubSession();
    unsubResponses();
    if (timer) timer.destroy();
  };
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
