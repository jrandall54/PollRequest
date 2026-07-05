// ============================================================
// PollRequest — Player Game Screen
// Answer buttons on mobile, shows results inline
// ============================================================

import router from '../../router.js';
import { getUiIcon, getIconSvg, ANSWER_COLORS, ANSWER_LABELS } from '../../utils/constants.js';
import { listenToSession, submitAnswer } from '../../services/session-service.js';
import { getQuestionsByIds } from '../../services/question-service.js';
import { calculatePoints, checkAnswer } from '../../services/scoring-service.js';
import { loadSavedIdentity } from '../../services/student-service.js';
import { renderCodeBlock } from '../../components/code-block.js';
import { userStore, sessionStore } from '../../state.js';
import { showToast } from '../../utils/helpers.js';

export async function renderPlayerGame(params) {
  const app = document.getElementById('app');
  const sessionId = params.id;

  if (!sessionId) {
    router.navigate('/player/join');
    return;
  }

  // Get player identity
  const identity = userStore.state.uid
    ? { uid: userStore.state.uid, name: userStore.state.name, icon: userStore.state.icon }
    : loadSavedIdentity();

  if (!identity) {
    router.navigate('/player/join');
    return;
  }

  let questions = [];
  let currentQIdx = -1;
  let currentView = null; // 'answering' | 'submitted' | 'result'
  let selectedChoices = new Set();
  let answerStartTime = null;
  let streak = 0;
  let hasAnswered = false;
  let timerInterval = null;

  app.innerHTML = `<div class="flex-center" style="min-height:100vh;"><div class="spinner"></div></div>`;

  // Listen to session
  const unsub = listenToSession(sessionId, async (data) => {
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

    // New question started
    if (qState === 'accepting' && qIdx !== currentQIdx) {
      currentQIdx = qIdx;
      hasAnswered = false;
      selectedChoices.clear();
      answerStartTime = Date.now();
      currentView = 'answering';
      renderAnswerView(data, qIdx);
    }

    // Timer paused/resumed
    if (qState === 'paused' && currentView === 'answering') {
      updateTimerDisplay('PAUSED', 'warning');
    }

    // Results shown
    if (qState === 'results' && currentView !== 'result') {
      currentView = 'result';
      renderResultView(data, qIdx);
    }

    // Session ended
    if (data.status === 'ended') {
      unsub();
      clearTimerInterval();
      renderEndScreen(data);
    }
  });

  function renderAnswerView(data, qIdx) {
    const question = questions[qIdx];
    if (!question) return;

    const total = questions.length;
    const isMulti = question.multiSelect;

    app.innerHTML = `
      <div class="answer-screen screen">
        <div class="answer-screen__header">
          <span class="answer-screen__question-num">Q${qIdx + 1}/${total}</span>
          <span class="answer-screen__timer-badge" id="player-timer">${question.timeLimit || 30}</span>
        </div>

        <div class="answer-screen__question">${escapeHtml(question.text)}</div>
        ${question.codeSnippetMain ? `
          <div class="dual-snippets" style="font-size: 0.85rem; margin-top: 0.5rem; margin-bottom: 1rem;">
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
          <div class="question-code-wrap" style="font-size: 0.85rem; margin-top: 0.5rem; margin-bottom: 1rem;">
            ${renderCodeBlock(question.codeSnippet, question.codeLanguage)}
          </div>
        ` : ''}
        ${isMulti ? '<div class="text-muted text-sm" style="margin-bottom:0.25rem;">Tap all correct answers</div>' : ''}

        <div class="answer-screen__buttons" id="answer-buttons">
          ${question.choices.map((c, i) => `
            <button class="answer-btn answer-btn--${ANSWER_COLORS[i]}" data-idx="${i}" id="answer-${i}">
              <span class="answer-btn__label">${ANSWER_LABELS[i]}</span>
              <span class="answer-btn__text">${escapeHtml(c.text)}</span>
            </button>
          `).join('')}
        </div>

        ${isMulti ? `
          <div class="answer-screen__submit-info">
            <button class="btn btn--primary btn--full" id="btn-submit-multi" disabled>
              Submit Answer
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Start local timer display
    startTimerDisplay(data, question.timeLimit || 30);

    // Answer button handlers
    const buttons = document.querySelectorAll('#answer-buttons .answer-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (hasAnswered) return;

        const idx = parseInt(btn.dataset.idx);

        if (isMulti) {
          // Toggle selection
          if (selectedChoices.has(idx)) {
            selectedChoices.delete(idx);
            btn.classList.remove('answer-btn--selected');
          } else {
            selectedChoices.add(idx);
            btn.classList.add('answer-btn--selected');
          }
          const submitBtn = document.getElementById('btn-submit-multi');
          if (submitBtn) submitBtn.disabled = selectedChoices.size === 0;
        } else {
          // Single select — submit immediately
          selectedChoices.add(idx);
          btn.classList.add('answer-btn--selected');
          submitPlayerAnswer(question, qIdx);
        }
      });
    });

    // Multi-select submit button
    document.getElementById('btn-submit-multi')?.addEventListener('click', () => {
      if (!hasAnswered && selectedChoices.size > 0) {
        submitPlayerAnswer(question, qIdx);
      }
    });
  }

  async function submitPlayerAnswer(question, qIdx) {
    if (hasAnswered) return;
    hasAnswered = true;
    clearTimerInterval();

    const responseTimeMs = Date.now() - answerStartTime;
    const choices = [...selectedChoices];
    const timeLimitMs = (question.timeLimit || 30) * 1000;

    // Check correctness
    const result = checkAnswer(choices, question.choices, question.multiSelect);

    // Calculate points
    const scoring = calculatePoints({
      correct: result.correct,
      responseTimeMs,
      timeLimitMs,
      currentStreak: streak,
      multiSelect: question.multiSelect,
      correctPicks: result.correctPicks,
      totalCorrect: result.totalCorrect,
    });

    streak = scoring.newStreak;

    // Disable all buttons
    document.querySelectorAll('#answer-buttons .answer-btn').forEach(btn => {
      btn.classList.add('answer-btn--disabled');
    });

    // Submit to Firestore
    try {
      await submitAnswer(sessionId, {
        questionId: question.id || `q${qIdx}`,
        questionIndex: qIdx,
        studentUid: identity.uid,
        selectedChoices: choices,
        correct: result.correct,
        responseTime: responseTimeMs,
        pointsEarned: scoring.points,
        // Snapshot data for decoupled analytics
        questionText: question.text || '',
        questionCategory: question.category || 'general',
        questionDifficulty: question.difficulty || 'medium'
      });
    } catch (e) {
      console.error('Failed to submit answer:', e);
    }

    // Show submitted state
    currentView = 'submitted';
    app.innerHTML = `
      <div class="player-result screen">
        <div class="player-result__icon ${result.correct ? 'player-result__icon--correct' : 'player-result__icon--incorrect'}">
          ${result.correct ? getUiIcon('check', 64) : getUiIcon('x', 64)}
        </div>
        <h2 class="player-result__title ${result.correct ? 'player-result__title--correct' : 'player-result__title--incorrect'}">
          ${result.correct ? 'Correct!' : 'Incorrect'}
        </h2>
        <div class="player-result__points">${scoring.points > 0 ? '+' : ''}${scoring.points.toLocaleString()}</div>
        <div class="player-result__points-label">points</div>

        ${scoring.breakdown.speed > 0 ? `<div class="text-sm text-muted">Speed bonus: +${scoring.breakdown.speed}</div>` : ''}
        ${scoring.breakdown.streak > 0 ? `
          <div class="player-result__streak">Streak: ${streak} in a row! +${scoring.breakdown.streak}</div>
        ` : ''}

        <div class="text-muted" style="margin-top:1.5rem;">Waiting for results...</div>
      </div>
    `;
  }

  function renderResultView(data, qIdx) {
    clearTimerInterval();
    const question = questions[qIdx];
    const correctChoices = (question?.choices || []).filter(c => c.isCorrect).map(c => c.text).join(' and ');
    const correctHtml = correctChoices ? `
      <div style="margin: 1.5rem 0 0 0; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border-left: 4px solid var(--success); text-align: left;">
        <div class="text-sm text-muted" style="margin-bottom: 0.25rem;">Correct Answer</div>
        <div style="font-weight: 700; color: var(--text-primary); font-size: 1.1rem;">${escapeHtml(correctChoices)}</div>
      </div>
    ` : '';

    const isLastQuestion = qIdx === questions.length - 1;
    const waitingText = isLastQuestion ? 'Waiting for final results...' : 'Next question coming up...';

    if (currentView === 'result' && document.querySelector('.player-result')) {
      // Already showing result from submit, just update the message and inject the answer
      const resultScreen = document.querySelector('.player-result');
      const waitMsgs = resultScreen.querySelectorAll('.text-muted');
      const waitMsg = waitMsgs[waitMsgs.length - 1]; // safely get the last text-muted element
      
      if (waitMsg && !document.getElementById('injected-correct')) {
        waitMsg.textContent = waitingText;
        waitMsg.insertAdjacentHTML('beforebegin', `<div id="injected-correct" style="width: 100%; max-width: 400px; margin: 0 auto;">${correctHtml}</div>`);
      }
      return;
    }

    // Player didn't answer in time
    app.innerHTML = `
      <div class="player-result screen">
        <div class="player-result__icon player-result__icon--incorrect">
          ${getUiIcon('clock', 64)}
        </div>
        <h2 class="player-result__title player-result__title--incorrect">Time's Up!</h2>
        <div class="player-result__points">+0</div>
        <div class="player-result__points-label">points</div>
        
        <div style="width: 100%; max-width: 400px; margin: 0 auto;">${correctHtml}</div>
        
        <div class="text-muted" style="margin-top:1.5rem;">${waitingText}</div>
      </div>
    `;
    streak = 0;
  }

  function renderEndScreen(data) {
    const players = data.players || {};
    const myData = players[identity.uid];
    const myPoints = myData?.points || 0;

    // Calculate rank
    const sorted = Object.entries(players)
      .map(([uid, p]) => ({ uid, points: p.points || 0 }))
      .sort((a, b) => b.points - a.points);
    const myRank = sorted.findIndex(p => p.uid === identity.uid) + 1;

    app.innerHTML = `
      <div class="player-result screen">
        <div class="player-result__icon" style="color:var(--accent-primary);">
          ${getIconSvg(identity.icon, 64)}
        </div>
        <h2 class="player-result__title" style="color:var(--text-primary);">Game Over!</h2>
        <div class="player-result__points" style="color:var(--accent-primary);">${myPoints.toLocaleString()}</div>
        <div class="player-result__points-label">total points</div>
        <div class="player-result__rank" style="margin-top:1rem;">
          You placed <strong>#${myRank}</strong> out of ${sorted.length}
        </div>
        <button class="btn btn--primary btn--lg" id="btn-done" style="margin-top:2rem;">
          Done
        </button>
      </div>
    `;

    document.getElementById('btn-done').addEventListener('click', () => {
      router.navigate('/');
    });
  }

  function startTimerDisplay(data, totalSeconds) {
    clearTimerInterval();
    const timerEl = document.getElementById('player-timer');
    if (!timerEl) return;

    function updateTimer() {
      if (!data.timerEnd || data.timerPaused) return;
      const endTime = data.timerEnd.toDate ? data.timerEnd.toDate().getTime() : data.timerEnd;
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      timerEl.textContent = remaining;

      if (remaining <= 5) {
        timerEl.className = 'answer-screen__timer-badge answer-screen__timer-badge--danger';
      } else if (remaining <= 10) {
        timerEl.className = 'answer-screen__timer-badge answer-screen__timer-badge--warning';
      }

      if (remaining <= 0) {
        clearTimerInterval();
      }
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 250);
  }

  function updateTimerDisplay(text, state) {
    const timerEl = document.getElementById('player-timer');
    if (timerEl) {
      timerEl.textContent = text;
      if (state === 'warning') {
        timerEl.className = 'answer-screen__timer-badge answer-screen__timer-badge--warning';
      }
    }
  }

  function clearTimerInterval() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  return () => {
    unsub();
    clearTimerInterval();
  };
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
