// ============================================================
// PollRequest — Analytics Service
// Aggregation, queries, and data export for teacher analytics
// ============================================================

import { getAllSessions, getSessionResponses } from './session-service.js';
import { getAllStudents } from './student-service.js';
import { getAllQuestions } from './question-service.js';
import { arrayToCsv, downloadFile } from '../utils/helpers.js';

/**
 * Get comprehensive per-student analytics
 */
export async function getStudentAnalytics(courseId = 'all') {
  const students = await getAllStudents();
  return students
    .map(s => {
      const stats = courseId === 'all' ? s.stats : (s.courseStats?.[courseId] || {});
      return {
        uid: s.uid,
        name: s.name,
        icon: s.icon,
        accuracy: stats.totalAnswered > 0
          ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
          : 0,
        totalAnswered: stats.totalAnswered || 0,
        totalCorrect: stats.totalCorrect || 0,
        totalPoints: stats.totalPoints || 0,
        avgResponseTime: stats.averageResponseTime || 0,
        sessionsAttended: stats.sessionsAttended || 0,
        currentStreak: stats.currentStreak || 0,
        bestStreak: stats.bestStreak || 0,
        lastSeen: s.lastSeen,
      };
    })
    .filter(s => s.totalAnswered > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

/**
 * Get per-question analytics (Decoupled from Question Bank)
 */
export async function getQuestionAnalytics(courseId = 'all') {
  const sessions = await getAllSessions(courseId === 'all' ? null : courseId);

  // Collect all responses across all sessions
  const allResponses = [];
  for (const session of sessions) {
    if (session.status === 'ended') {
      const responses = await getSessionResponses(session.id);
      allResponses.push(...responses);
    }
  }

  // Build a master list of all unique questions ever played
  const questionMap = new Map();
  allResponses.forEach(r => {
    const existing = questionMap.get(r.questionId);
    if (!existing || (r.questionChoices && r.questionChoices.length > 0 && (!existing.choices || existing.choices.length === 0))) {
      questionMap.set(r.questionId, {
        id: r.questionId,
        text: r.questionText || 'Unknown Question',
        title: r.questionTitle || null,
        type: r.questionType || 'Predict Output',
        tags: r.questionTags || [],
        bank: r.questionBank || 'Custom Questions',
        difficulty: r.questionDifficulty || 'medium',
        choices: r.questionChoices || [],
        codeSnippet: r.questionCodeSnippet || null,
        explanation: r.questionExplanation || null,
      });
    }
  });

  const uniqueQuestions = Array.from(questionMap.values());

  return uniqueQuestions.map(q => {
    const qResponses = allResponses.filter(r => r.questionId === q.id);
    const totalAttempts = qResponses.length;
    const correctCount = qResponses.filter(r => r.correct).length;
    const avgTime = totalAttempts > 0
      ? Math.round(qResponses.reduce((sum, r) => sum + (r.responseTime || 0), 0) / totalAttempts)
      : 0;

    // Find most common wrong answer index (legacy)
    const wrongAnswers = qResponses
      .filter(r => !r.correct)
      .map(r => r.selectedChoices?.join(','));
    const wrongCounts = {};
    wrongAnswers.forEach(a => {
      if (a !== undefined) wrongCounts[a] = (wrongCounts[a] || 0) + 1;
    });
    const mostCommonWrong = Object.entries(wrongCounts)
      .sort(([, a], [, b]) => b - a)[0];

    // Find most common wrong answer TEXT (new)
    const wrongAnswersText = qResponses
      .filter(r => !r.correct)
      .map(r => r.selectedChoiceTexts?.join(' & '));
    const wrongCountsText = {};
    wrongAnswersText.forEach(a => {
      if (a) wrongCountsText[a] = (wrongCountsText[a] || 0) + 1;
    });
    const mostCommonWrongText = Object.entries(wrongCountsText)
      .sort(([, a], [, b]) => b - a)[0];

    // Calculate choice distribution
    const choiceDistribution = {};
    if (q.choices) {
      q.choices.forEach(c => choiceDistribution[c.text] = 0);
    }
    qResponses.forEach(r => {
      if (r.selectedChoiceTexts && r.selectedChoiceTexts.length > 0) {
        r.selectedChoiceTexts.forEach(txt => {
          choiceDistribution[txt] = (choiceDistribution[txt] || 0) + 1;
        });
      } else if (r.selectedChoices && q.choices && q.choices.length > 0) { // Legacy fallback
        r.selectedChoices.forEach(idx => {
          const txt = q.choices[idx]?.text;
          if (txt) {
             choiceDistribution[txt] = (choiceDistribution[txt] || 0) + 1;
          }
        });
      }
    });

    return {
      id: q.id,
      text: q.text,
      title: q.title,
      type: q.type,
      tags: q.tags,
      bank: q.bank,
      difficulty: q.difficulty,
      codeSnippet: q.codeSnippet,
      explanation: q.explanation,
      choices: q.choices,
      choiceDistribution,
      totalAttempts,
      correctRate: totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0,
      avgResponseTime: avgTime,
      mostCommonWrongAnswer: mostCommonWrong ? mostCommonWrong[0] : null,
      mostCommonWrongAnswerText: mostCommonWrongText ? mostCommonWrongText[0] : null,
    };
  }).sort((a, b) => a.correctRate - b.correctRate); // Hardest first
}

/**
 * Get session summaries
 */
export async function getSessionSummaries(courseId = 'all') {
  const sessions = await getAllSessions(courseId === 'all' ? null : courseId);
  const summaries = [];

  for (const session of sessions) {
    const playerCount = Object.keys(session.players || {}).length;
    const responses = await getSessionResponses(session.id);
    const correctCount = responses.filter(r => r.correct).length;
    const totalResponses = responses.length;

    summaries.push({
      id: session.id,
      name: session.name,
      status: session.status,
      date: session.createdAt,
      playerCount,
      questionCount: session.questionIds?.length || 0,
      totalResponses,
      classAccuracy: totalResponses > 0
        ? Math.round((correctCount / totalResponses) * 100)
        : 0,
      avgScore: playerCount > 0
        ? Math.round(
            Object.values(session.players || {}).reduce((s, p) => s + (p.points || 0), 0)
            / playerCount
          )
        : 0,
    });
  }

  return summaries.sort((a, b) => {
    const dateA = a.date?.toDate?.() || new Date(a.date || 0);
    const dateB = b.date?.toDate?.() || new Date(b.date || 0);
    return dateB - dateA;
  });
}

/**
 * Get trend data (accuracy over time)
 */
export async function getTrendData() {
  const summaries = await getSessionSummaries();
  return summaries
    .filter(s => s.status === 'ended' && s.totalResponses > 0)
    .reverse() // Chronological order
    .map((s, index) => ({
      session: index + 1,
      name: s.name,
      accuracy: s.classAccuracy,
      avgScore: s.avgScore,
      playerCount: s.playerCount,
      date: s.date,
    }));
}

/**
 * Export student data as CSV
 */
export async function exportStudentsCsv() {
  const students = await getStudentAnalytics();
  const csv = arrayToCsv(students, [
    'name', 'accuracy', 'totalAnswered', 'totalCorrect',
    'totalPoints', 'avgResponseTime', 'sessionsAttended',
    'bestStreak',
  ]);
  downloadFile(csv, `pollrequest-students-${Date.now()}.csv`);
}

/**
 * Export question data as CSV
 */
export async function exportQuestionsCsv() {
  const questions = await getQuestionAnalytics();
  const csv = arrayToCsv(questions, [
    'title', 'text', 'type', 'bank', 'tags', 'difficulty', 'totalAttempts',
    'correctRate', 'avgResponseTime',
  ]);
  downloadFile(csv, `pollrequest-questions-${Date.now()}.csv`);
}

/**
 * Export session data as CSV
 */
export async function exportSessionsCsv() {
  const sessions = await getSessionSummaries();
  const csv = arrayToCsv(sessions, [
    'name', 'status', 'playerCount', 'questionCount',
    'totalResponses', 'classAccuracy', 'avgScore',
  ]);
  downloadFile(csv, `pollrequest-sessions-${Date.now()}.csv`);
}

/**
 * Export all data as JSON
 */
export async function exportAllDataJson() {
  const [students, questions, sessions] = await Promise.all([
    getStudentAnalytics(),
    getQuestionAnalytics(),
    getSessionSummaries(),
  ]);

  const data = { students, questions, sessions, exportedAt: new Date().toISOString() };
  downloadFile(JSON.stringify(data, null, 2), `pollrequest-data-${Date.now()}.json`, 'application/json');
}
