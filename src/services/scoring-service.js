// ============================================================
// PollRequest — Scoring Service
// Points calculation: base + speed bonus + streak bonus
// ============================================================

import { SCORING } from '../utils/constants.js';

/**
 * Calculate points for a single answer
 * @param {boolean} correct - Whether the answer was correct
 * @param {number} responseTimeMs - Time taken to answer in milliseconds
 * @param {number} timeLimitMs - Total time limit in milliseconds
 * @param {number} currentStreak - Current consecutive correct answers
 * @param {boolean} multiSelect - Whether this is a multi-select question
 * @param {number} correctPicks - For multi-select: how many correct choices the student picked
 * @param {number} totalCorrect - For multi-select: total number of correct choices
 * @returns {{ points: number, breakdown: object }}
 */
export function calculatePoints({
  correct,
  responseTimeMs,
  timeLimitMs,
  currentStreak = 0,
  multiSelect = false,
  correctPicks = 0,
  totalCorrect = 1,
}) {
  if (!correct && !multiSelect) {
    return {
      points: 0,
      breakdown: {
        base: 0,
        speed: 0,
        streak: 0,
        total: 0,
      },
      newStreak: 0,
    };
  }

  let basePoints = SCORING.BASE_POINTS;

  // Multi-select partial credit
  if (multiSelect) {
    if (correctPicks === 0) {
      return {
        points: 0,
        breakdown: { base: 0, speed: 0, streak: 0, total: 0 },
        newStreak: 0,
      };
    }
    basePoints = Math.round((correctPicks / totalCorrect) * SCORING.BASE_POINTS);
  }

  // Speed bonus: linear scale from MAX_SPEED_BONUS (instant) to 0 (last second)
  const timeFraction = 1 - Math.min(responseTimeMs / timeLimitMs, 1);
  const speedBonus = Math.round(SCORING.MAX_SPEED_BONUS * timeFraction);

  // Streak bonus: kicks in at 3+ correct in a row
  const newStreak = (multiSelect && correctPicks < totalCorrect)
    ? 0
    : currentStreak + 1;

  let streakBonus = 0;
  if (newStreak >= SCORING.STREAK_BONUS_MIN) {
    const streakLevel = newStreak - SCORING.STREAK_BONUS_MIN + 1;
    streakBonus = Math.min(
      streakLevel * SCORING.STREAK_BONUS_PER_LEVEL,
      SCORING.STREAK_BONUS_MAX
    );
  }

  const total = basePoints + speedBonus + streakBonus;

  return {
    points: total,
    breakdown: {
      base: basePoints,
      speed: speedBonus,
      streak: streakBonus,
      total,
    },
    newStreak,
  };
}

/**
 * Check if a student's answer is correct
 * @param {number[]} selectedChoices - Indices of selected choices
 * @param {Array<{text: string, isCorrect: boolean}>} choices - All choices
 * @param {boolean} multiSelect - Whether this is multi-select
 * @returns {{ correct: boolean, correctPicks: number, totalCorrect: number }}
 */
export function checkAnswer(selectedChoices, choices, multiSelect = false) {
  const correctIndices = choices
    .map((c, i) => (c.isCorrect ? i : -1))
    .filter(i => i !== -1);

  if (multiSelect) {
    const correctPicks = selectedChoices.filter(i => correctIndices.includes(i)).length;
    const wrongPicks = selectedChoices.filter(i => !correctIndices.includes(i)).length;
    const netCorrect = Math.max(0, correctPicks - wrongPicks);
    const allCorrect = netCorrect === correctIndices.length && wrongPicks === 0;

    return {
      correct: allCorrect,
      correctPicks: netCorrect,
      totalCorrect: correctIndices.length,
    };
  }

  // Single select
  const correct = selectedChoices.length === 1 && correctIndices.includes(selectedChoices[0]);
  return {
    correct,
    correctPicks: correct ? 1 : 0,
    totalCorrect: 1,
  };
}

/**
 * Get leaderboard from session players
 * @param {Object} players - Map of player uid to player data
 * @returns {Array} Sorted leaderboard
 */
export function getLeaderboard(players) {
  return Object.entries(players)
    .map(([uid, data]) => ({
      uid,
      name: data.name,
      icon: data.icon,
      points: data.points || 0,
    }))
    .sort((a, b) => b.points - a.points);
}
