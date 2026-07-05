// ============================================================
// PollRequest — Question Service
// CRUD operations for the questions collection in Firestore
// ============================================================

import { db } from '../firebase.js';
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, serverTimestamp, writeBatch, documentId
} from 'firebase/firestore';
import { DEFAULT_TIME_LIMIT } from '../utils/constants.js';
import { generateId } from '../utils/helpers.js';

const COLLECTION = 'questions';

/**
 * Get all questions
 */
export async function getAllQuestions() {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

/**
 * Get a single question by ID
 */
export async function getQuestion(questionId) {
  try {
    const docRef = doc(db, COLLECTION, questionId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
}

/**
 * Get multiple questions by IDs
 */
export async function getQuestionsByIds(questionIds) {
  if (!questionIds.length) return [];
  try {
    // Firestore 'in' queries max 30 items, so we batch
    const results = [];
    for (let i = 0; i < questionIds.length; i += 30) {
      const batch = questionIds.slice(i, i + 30);
      const q = query(collection(db, COLLECTION), where(documentId(), 'in', batch));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach(d => results.push({ id: d.id, ...d.data() }));
    }
    // Preserve original order
    const map = new Map(results.map(r => [r.id, r]));
    return questionIds.map(id => map.get(id)).filter(Boolean);
  } catch (error) {
    console.error('Error fetching questions by IDs:', error);
    return [];
  }
}

/**
 * Get questions filtered by category
 */
export async function getQuestionsByCategory(category) {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching questions by category:', error);
    return [];
  }
}

/**
 * Get unique categories from all questions
 */
export async function getCategories() {
  const questions = await getAllQuestions();
  const categories = new Set(questions.map(q => q.category).filter(Boolean));
  return [...categories].sort();
}

/**
 * Create a new question
 */
export async function createQuestion(questionData) {
  try {
    const data = {
      text: questionData.text || '',
      codeSnippet: questionData.codeSnippet || null,
      codeSnippetMain: questionData.codeSnippetMain || null,
      codeLanguage: questionData.codeLanguage || null,
      choices: questionData.choices || [],
      multiSelect: questionData.multiSelect || false,
      timeLimit: questionData.timeLimit || DEFAULT_TIME_LIMIT,
      explanation: questionData.explanation || null,
      category: questionData.category || 'general',
      difficulty: questionData.difficulty || 'medium',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, COLLECTION), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

/**
 * Update an existing question
 */
export async function updateQuestion(questionId, updates) {
  try {
    const docRef = doc(db, COLLECTION, questionId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
}

/**
 * Delete a question
 */
export async function deleteQuestion(questionId) {
  try {
    await deleteDoc(doc(db, COLLECTION, questionId));
    return true;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
}

/**
 * Delete all questions (used for clearing the bank)
 */
export async function deleteAllQuestions() {
  try {
    const questions = await getAllQuestions();
    if (!questions.length) return 0;
    
    // Firestore batches have a limit of 500 operations
    const chunks = [];
    for (let i = 0; i < questions.length; i += 500) {
      chunks.push(questions.slice(i, i + 500));
    }
    
    for (const chunk of chunks) {
      const batch = writeBatch(db);
      chunk.forEach(q => {
        batch.delete(doc(db, COLLECTION, q.id));
      });
      await batch.commit();
    }
    
    return questions.length;
  } catch (error) {
    console.error('Error deleting all questions:', error);
    throw error;
  }
}

/**
 * Batch import questions (from parsed Markdown/JSON)
 */
export async function batchImportQuestions(questions) {
  try {
    const batch = writeBatch(db);
    const refs = [];

    questions.forEach(q => {
      const ref = doc(collection(db, COLLECTION));
      batch.set(ref, {
        text: q.text || '',
        codeSnippet: q.codeSnippet || null,
        codeSnippetMain: q.codeSnippetMain || null,
        codeLanguage: q.codeLanguage || null,
        choices: q.choices || [],
        multiSelect: q.multiSelect || false,
        timeLimit: q.timeLimit || DEFAULT_TIME_LIMIT,
        explanation: q.explanation || null,
        category: q.category || 'general',
        difficulty: q.difficulty || 'medium',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      refs.push(ref.id);
    });

    await batch.commit();
    return refs;
  } catch (error) {
    console.error('Error batch importing questions:', error);
    throw error;
  }
}

/**
 * Export all questions as JSON
 */
export async function exportQuestionsAsJson() {
  const questions = await getAllQuestions();
  return questions.map(q => ({
    text: q.text,
    codeSnippet: q.codeSnippet,
    codeSnippetMain: q.codeSnippetMain,
    codeLanguage: q.codeLanguage,
    choices: q.choices,
    multiSelect: q.multiSelect,
    timeLimit: q.timeLimit,
    explanation: q.explanation,
    category: q.category,
    difficulty: q.difficulty,
  }));
}
