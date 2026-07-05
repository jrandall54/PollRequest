// ============================================================
// PollRequest — Import Service
// Parse and import questions from Markdown and JSON files
// ============================================================

import { parseQuestionMarkdown, validateQuestion } from '../utils/markdown-parser.js';
import { batchImportQuestions } from './question-service.js';

/**
 * Import questions from a file (File object from input element)
 * @param {File} file
 * @returns {{ imported: number, skipped: number, errors: string[] }}
 */
export async function importFromFile(file, courseId = null) {
  const content = await file.text();
  const ext = file.name.split('.').pop().toLowerCase();

  let parsed = [];

  if (ext === 'md' || ext === 'markdown') {
    parsed = parseQuestionMarkdown(content);
  } else if (ext === 'json') {
    parsed = parseJsonQuestions(content);
  } else {
    throw new Error(`Unsupported file type: .${ext}. Use .md or .json`);
  }

  // Validate all questions
  const valid = [];
  const errors = [];
  let skipped = 0;

  parsed.forEach((q, i) => {
    const result = validateQuestion(q);
    if (result.valid) {
      if (courseId) q.courseId = courseId;
      q.bank = file.name; // Assign the filename as the sub-bank
      valid.push(q);
    } else {
      skipped++;
      errors.push(`Question ${i + 1}: ${result.errors.join(', ')}`);
    }
  });

  // Batch import valid questions
  if (valid.length > 0) {
    await batchImportQuestions(valid, courseId);
    
    // Update managed course types if there are any new ones
    if (courseId && courseId !== 'default') {
      try {
        const { getCourseById, updateCourse } = await import('./course-service.js');
        const course = await getCourseById(courseId);
        if (course) {
          const courseTypes = course.questionTypes || ['Predict Output', 'Select All That Apply', 'True / False', 'Conceptual'];
          let changed = false;
          valid.forEach(q => {
            if (q.type && !courseTypes.includes(q.type)) {
              courseTypes.push(q.type);
              changed = true;
            }
          });
          if (changed) {
            courseTypes.sort();
            await updateCourse(courseId, { questionTypes: courseTypes });
          }
        }
      } catch (e) {
        console.warn('Failed to update course types during import', e);
      }
    }
  }

  return {
    imported: valid.length,
    skipped,
    errors,
  };
}

/**
 * Parse JSON question file content
 */
function parseJsonQuestions(content) {
  try {
    const data = JSON.parse(content);
    const questions = Array.isArray(data) ? data : [data];

    return questions.map(q => ({
      text: q.text || '',
      codeSnippet: q.codeSnippet || null,
      codeSnippetMain: q.codeSnippetMain || null,
      codeLanguage: q.codeLanguage || null,
      choices: (q.choices || []).map(c => ({
        text: c.text || '',
        isCorrect: c.isCorrect || false,
      })),
      multiSelect: q.multiSelect || false,
      timeLimit: q.timeLimit || 30,
      explanation: q.explanation || null,
      category: q.category || 'general',
      difficulty: q.difficulty || 'medium',
    }));
  } catch (error) {
    throw new Error('Invalid JSON format: ' + error.message);
  }
}
