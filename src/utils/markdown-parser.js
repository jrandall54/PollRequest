// ============================================================
// PollRequest — Markdown Parser
// Parses the custom question markdown format into objects
// ============================================================

import { DEFAULT_TIME_LIMIT } from './constants.js';

/**
 * Parse a markdown string containing multiple questions
 * @param {string} markdown - Raw markdown content
 * @returns {Array} Array of parsed question objects
 */
export function parseQuestionMarkdown(markdown) {
  const questions = [];

  // Split by "## Question" headers
  const sections = markdown.split(/^## Question/gm).filter(s => s.trim());

  for (const section of sections) {
    try {
      const question = parseSingleQuestion(section);
      if (question && question.text && question.choices.length >= 2) {
        questions.push(question);
      }
    } catch (error) {
      console.warn('Skipping malformed question section:', error.message);
    }
  }

  return questions;
}

/**
 * Parse a single question section
 */
function parseSingleQuestion(section) {
  const lines = section.split('\n');
  const question = {
    title: null,
    type: 'Predict Output',
    tags: [],
    text: '',
    codeSnippet: null,
    codeLanguage: null,
    choices: [],
    multiSelect: false,
    timeLimit: DEFAULT_TIME_LIMIT,
    explanation: null,
    category: 'general',
    difficulty: 'medium',
  };

  let mode = 'meta'; // 'meta', 'text', 'code', 'choices', 'explanation'
  let codeLines = [];
  let textLines = [];
  let explanationLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // ── Parse metadata (key: value at the start) ──
    if (mode === 'meta') {
      const metaMatch = trimmed.match(/^(\w+)\s*:\s*(.+)$/);
      if (metaMatch) {
        const [, key, value] = metaMatch;
        switch (key.toLowerCase()) {
          case 'title': question.title = value.trim(); break;
          case 'type': question.type = value.trim(); break;
          case 'tags': question.tags = value.split(',').map(t => t.trim()).filter(Boolean); break;
          case 'category': question.category = value.trim(); break;
          case 'difficulty': question.difficulty = value.trim().toLowerCase(); break;
          case 'timelimit': question.timeLimit = parseInt(value) || DEFAULT_TIME_LIMIT; break;
          case 'multiselect': question.multiSelect = value.trim().toLowerCase() === 'true'; break;
        }
        continue;
      }
      // If we hit a non-meta line, switch to text mode
      if (trimmed) mode = 'text';
      else continue;
    }

    // ── Code block detection ──
    if (trimmed.startsWith('```') && mode !== 'code') {
      mode = 'code';
      const lang = trimmed.slice(3).trim();
      if (lang) question.codeLanguage = lang;
      codeLines = [];
      continue;
    }

    if (trimmed.startsWith('```') && mode === 'code') {
      question.codeSnippet = codeLines.join('\n');
      mode = 'text';
      continue;
    }

    if (mode === 'code') {
      codeLines.push(line); // Preserve indentation in code
      continue;
    }

    // ── Choice detection ──
    const choiceMatch = trimmed.match(/^- \[([ xX])\]\s+(.+)$/);
    if (choiceMatch) {
      mode = 'choices';
      const isCorrect = choiceMatch[1].toLowerCase() === 'x';
      question.choices.push({
        text: choiceMatch[2].trim(),
        isCorrect,
      });
      continue;
    }

    // ── Explanation detection (blockquote) ──
    if (trimmed.startsWith('> Explanation:') || trimmed.startsWith('>Explanation:')) {
      mode = 'explanation';
      explanationLines.push(trimmed.replace(/^>\s*Explanation:\s*/, ''));
      continue;
    }

    if (mode === 'explanation' && trimmed.startsWith('>')) {
      explanationLines.push(trimmed.replace(/^>\s*/, ''));
      continue;
    }

    if (mode === 'explanation' && !trimmed.startsWith('>')) {
      mode = 'text';
    }

    // ── Section divider ──
    if (trimmed === '---') {
      break;
    }

    // ── Text content ──
    if (mode === 'text' && trimmed) {
      textLines.push(trimmed);
    }
  }

  // Build question text from collected text lines
  question.text = textLines.join(' ').trim();

  // Build explanation
  if (explanationLines.length > 0) {
    question.explanation = explanationLines.join(' ').trim();
  }

  // Auto-detect multiSelect if multiple correct answers
  const correctCount = question.choices.filter(c => c.isCorrect).length;
  if (correctCount > 1) {
    question.multiSelect = true;
  }

  return question;
}

/**
 * Validate a parsed question object
 * @param {Object} question
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateQuestion(question) {
  const errors = [];

  if (!question.text || question.text.trim().length === 0) {
    errors.push('Question text is required');
  }

  if (!question.choices || question.choices.length < 2) {
    errors.push('At least 2 choices are required');
  }

  if (question.choices && question.choices.length > 6) {
    errors.push('Maximum 6 choices allowed');
  }

  const correctCount = question.choices?.filter(c => c.isCorrect).length || 0;
  if (correctCount === 0) {
    errors.push('At least one correct answer is required');
  }

  if (question.timeLimit && (question.timeLimit < 5 || question.timeLimit > 120)) {
    errors.push('Time limit must be between 5 and 120 seconds');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
