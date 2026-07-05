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
export async function getAllQuestions(courseId = null) {
  try {
    let q;
    if (courseId) {
      q = query(collection(db, COLLECTION), where('courseId', '==', courseId));
    } else {
      q = query(collection(db, COLLECTION));
    }
    const snapshot = await getDocs(q);
    const questions = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return questions.sort((a, b) => {
      const ta = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const tb = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return tb - ta;
    });
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
 * Get questions filtered by bank
 */
export async function getQuestionsByBank(courseId, bankName) {
  try {
    const questions = await getAllQuestions(courseId);
    return questions.filter(q => (q.bank || q.category || 'Custom Questions') === bankName);
  } catch (error) {
    console.error('Error fetching questions by bank:', error);
    return [];
  }
}

/**
 * Get unique banks from all questions
 */
export async function getBanks(courseId = null) {
  const questions = await getAllQuestions(courseId);
  const banks = new Set(questions.map(q => q.bank || q.category).filter(Boolean));
  return [...banks].sort();
}

/**
 * Create a new question
 */
export async function createQuestion(questionData, courseId = null) {
  try {
    const data = {
      courseId: courseId || 'General',
      bank: questionData.bank || 'Custom Questions',
      title: questionData.title || null,
      type: questionData.type || 'Predict Output',
      tags: Array.isArray(questionData.tags) ? questionData.tags : [],
      text: questionData.text || '',
      codeSnippet: questionData.codeSnippet || null,
      codeSnippetMain: questionData.codeSnippetMain || null,
      codeLanguage: questionData.codeLanguage || null,
      choices: questionData.choices || [],
      multiSelect: questionData.multiSelect || false,
      timeLimit: questionData.timeLimit || DEFAULT_TIME_LIMIT,
      explanation: questionData.explanation || null,
      difficulty: questionData.difficulty || 'medium',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
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
 * Delete a specific question
 */
export async function deleteQuestion(questionId) {
  try {
    const docRef = doc(db, COLLECTION, questionId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
}

/**
 * Delete an entire bank of questions
 */
export async function deleteBank(courseId, bankName) {
  try {
    const questions = await getAllQuestions(courseId);
    const bankQs = questions.filter(q => (q.bank || q.category || 'Custom Questions') === bankName);
    
    const batch = writeBatch(db);
    bankQs.forEach(q => {
      const docRef = doc(db, COLLECTION, q.id);
      batch.delete(docRef);
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error deleting bank:', error);
    throw error;
  }
}

/**
 * Delete all questions (used for clearing the bank)
 */
export async function deleteAllQuestions(courseId = null) {
  try {
    const questions = await getAllQuestions(courseId);
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
export async function batchImportQuestions(questions, courseId = null) {
  try {
    const batch = writeBatch(db);
    const refs = [];

    questions.forEach(q => {
      const ref = doc(collection(db, COLLECTION));
      batch.set(ref, {
        courseId: q.courseId || courseId || 'General',
        bank: q.bank || 'Imported Questions',
        title: q.title || null,
        type: q.type || 'Predict Output',
        tags: Array.isArray(q.tags) ? q.tags : [],
        text: q.text || '',
        codeSnippet: q.codeSnippet || null,
        codeSnippetMain: q.codeSnippetMain || null,
        codeLanguage: q.codeLanguage || null,
        choices: q.choices || [],
        multiSelect: q.multiSelect || false,
        timeLimit: q.timeLimit || DEFAULT_TIME_LIMIT,
        explanation: q.explanation || null,
        difficulty: q.difficulty || 'medium',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
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
export async function exportQuestionsAsJson(courseId = null) {
  const questions = await getAllQuestions(courseId);
  return questions.map(q => ({
    title: q.title || null,
    type: q.type || 'Predict Output',
    tags: Array.isArray(q.tags) ? q.tags : [],
    text: q.text,
    codeSnippet: q.codeSnippet,
    codeSnippetMain: q.codeSnippetMain,
    codeLanguage: q.codeLanguage,
    choices: q.choices,
    multiSelect: q.multiSelect,
    timeLimit: q.timeLimit,
    explanation: q.explanation,
    bank: q.bank || q.category || 'Custom Questions',
    difficulty: q.difficulty,
  }));
}
