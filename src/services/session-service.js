// ============================================================
// PollRequest — Session Service
// Game session creation, joining, real-time state management
// ============================================================

import { db } from '../firebase.js';
import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc,
  onSnapshot, serverTimestamp, query, where, deleteDoc,
  writeBatch, Timestamp
} from 'firebase/firestore';
import { sessionStore } from '../state.js';
import { generateJoinCode } from '../utils/helpers.js';

const COLLECTION = 'sessions';

// Active Firestore listeners (for cleanup)
let sessionListener = null;
let responsesListener = null;

/**
 * Create a new game session
 */
export async function createSession(name, questionIds) {
  try {
    const joinCode = generateJoinCode();
    const data = {
      name: name || `Session ${new Date().toLocaleDateString()}`,
      status: 'lobby',
      joinCode,
      currentQuestionIndex: -1,
      currentQuestionState: null,
      questionIds: questionIds || [],
      timerEnd: null,
      timerPaused: false,
      timerRemaining: null,
      players: {},
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION), data);

    sessionStore.update({
      sessionId: docRef.id,
      joinCode,
      status: 'lobby',
      currentQuestionIndex: -1,
      currentQuestionState: null,
      questionIds: questionIds || [],
      players: {},
    });

    return { id: docRef.id, joinCode };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

/**
 * Find a session by join code
 */
export async function findSessionByCode(joinCode) {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('joinCode', '==', joinCode.toUpperCase()),
      where('status', 'in', ['lobby', 'active', 'reviewing'])
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error finding session:', error);
    return null;
  }
}

/**
 * Join a session as a player
 */
export async function joinSession(sessionId, player) {
  try {
    const sessionRef = doc(db, COLLECTION, sessionId);
    
    // Check for duplicate names
    const snapshot = await getDoc(sessionRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      const players = data.players || {};
      const duplicate = Object.entries(players).find(
        ([uid, p]) => uid !== player.uid && p.name.toLowerCase() === player.name.toLowerCase()
      );
      
      if (duplicate) {
        throw new Error('name_taken');
      }
    }

    await updateDoc(sessionRef, {
      [`players.${player.uid}`]: {
        name: player.name,
        icon: player.icon,
        points: 0,
        joinedAt: serverTimestamp(),
      },
    });

    sessionStore.update({ sessionId });
    return true;
  } catch (error) {
    console.error('Error joining session:', error);
    throw error;
  }
}

/**
 * Listen to session state changes in real-time
 * Returns an unsubscribe function
 */
export function listenToSession(sessionId, callback) {
  // Clean up previous listener
  if (sessionListener) {
    sessionListener();
    sessionListener = null;
  }

  const sessionRef = doc(db, COLLECTION, sessionId);
  sessionListener = onSnapshot(sessionRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    const data = { id: snapshot.id, ...snapshot.data() };

    // Update session store
    sessionStore.update({
      sessionId: data.id,
      joinCode: data.joinCode,
      status: data.status,
      currentQuestionIndex: data.currentQuestionIndex,
      currentQuestionState: data.currentQuestionState,
      questionIds: data.questionIds,
      players: data.players || {},
      timerEnd: data.timerEnd,
      timerPaused: data.timerPaused,
      timerRemaining: data.timerRemaining,
      theme: data.theme || 'light',
    });

    callback(data);
  });

  return sessionListener;
}

/**
 * Listen to responses for the current session
 */
export function listenToResponses(sessionId, callback) {
  if (responsesListener) {
    responsesListener();
    responsesListener = null;
  }

  const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
  responsesListener = onSnapshot(responsesRef, (snapshot) => {
    const responses = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(responses);
  });

  return responsesListener;
}

/**
 * Advance to the next question
 */
export async function advanceQuestion(sessionId, timeLimit) {
  try {
    const sessionRef = doc(db, COLLECTION, sessionId);
    const snapshot = await getDoc(sessionRef);
    const data = snapshot.data();

    const nextIndex = (data.currentQuestionIndex ?? -1) + 1;
    const timerEnd = Timestamp.fromDate(
      new Date(Date.now() + timeLimit * 1000)
    );

    await updateDoc(sessionRef, {
      currentQuestionIndex: nextIndex,
      currentQuestionState: 'accepting',
      timerEnd,
      timerPaused: false,
      timerRemaining: null,
    });

    return nextIndex;
  } catch (error) {
    console.error('Error advancing question:', error);
    throw error;
  }
}

/**
 * Pause the timer
 */
export async function pauseTimer(sessionId, remainingSeconds) {
  try {
    await updateDoc(doc(db, COLLECTION, sessionId), {
      timerPaused: true,
      timerRemaining: remainingSeconds,
      timerEnd: null,
    });
  } catch (error) {
    console.error('Error pausing timer:', error);
  }
}

/**
 * Resume the timer
 */
export async function resumeTimer(sessionId, remainingSeconds) {
  try {
    const timerEnd = Timestamp.fromDate(
      new Date(Date.now() + remainingSeconds * 1000)
    );
    await updateDoc(doc(db, COLLECTION, sessionId), {
      timerPaused: false,
      timerRemaining: null,
      timerEnd,
    });
  } catch (error) {
    console.error('Error resuming timer:', error);
  }
}

/**
 * Show results for current question
 */
export async function showResults(sessionId) {
  try {
    await updateDoc(doc(db, COLLECTION, sessionId), {
      currentQuestionState: 'results',
      timerEnd: null,
      timerPaused: false,
    });
  } catch (error) {
    console.error('Error showing results:', error);
  }
}

/**
 * Submit a student's answer
 */
export async function submitAnswer(sessionId, answerData) {
  try {
    const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
    await addDoc(responsesRef, {
      questionId: answerData.questionId,
      questionIndex: answerData.questionIndex,
      studentUid: answerData.studentUid,
      selectedChoices: answerData.selectedChoices,
      correct: answerData.correct,
      responseTime: answerData.responseTime,
      pointsEarned: answerData.pointsEarned,
      questionText: answerData.questionText || '',
      questionCategory: answerData.questionCategory || 'general',
      questionDifficulty: answerData.questionDifficulty || 'medium',
      answeredAt: serverTimestamp(),
    });

    // Update player points in the session
    const sessionRef = doc(db, COLLECTION, sessionId);
    const snapshot = await getDoc(sessionRef);
    const players = snapshot.data().players || {};
    const playerData = players[answerData.studentUid];
    if (playerData) {
      await updateDoc(sessionRef, {
        [`players.${answerData.studentUid}.points`]:
          (playerData.points || 0) + answerData.pointsEarned,
      });
    }

    return true;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}

/**
 * End a session
 */
export async function endSession(sessionId) {
  try {
    await updateDoc(doc(db, COLLECTION, sessionId), {
      status: 'ended',
      currentQuestionState: null,
      timerEnd: null,
    });
  } catch (error) {
    console.error('Error ending session:', error);
  }
}

/**
 * Update the session theme
 */
export async function updateSessionTheme(sessionId, theme) {
  try {
    await updateDoc(doc(db, COLLECTION, sessionId), { theme });
  } catch (error) {
    console.error('Error updating theme:', error);
  }
}

/**
 * Get all past sessions (for analytics)
 */
export async function getAllSessions() {
  try {
    const q = query(collection(db, COLLECTION));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }
}

/**
 * Get responses for a specific session
 */
export async function getSessionResponses(sessionId) {
  try {
    const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
    const snapshot = await getDocs(responsesRef);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
}

/**
 * Cleanup all listeners
 */
export function cleanupListeners() {
  if (sessionListener) {
    sessionListener();
    sessionListener = null;
  }
  if (responsesListener) {
    responsesListener();
    responsesListener = null;
  }
}

/**
 * Delete a session and its responses
 */
export async function deleteSession(sessionId) {
  const { deleteDoc } = await import('firebase/firestore');
  try {
    const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
    const snapshot = await getDocs(responsesRef);
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, COLLECTION, sessionId, 'responses', d.id)));
    await Promise.all(deletePromises);
    await deleteDoc(doc(db, COLLECTION, sessionId));
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
}

/**
 * Delete all sessions and their responses
 */
export async function deleteAllSessions() {
  const { deleteDoc } = await import('firebase/firestore');
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    for (const sessionDoc of snapshot.docs) {
      const sessionId = sessionDoc.id;
      const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
      const responsesSnap = await getDocs(responsesRef);
      const deletePromises = responsesSnap.docs.map(d => deleteDoc(doc(db, COLLECTION, sessionId, 'responses', d.id)));
      await Promise.all(deletePromises);
      await deleteDoc(doc(db, COLLECTION, sessionId));
    }
  } catch (error) {
    console.error('Error deleting all sessions:', error);
    throw error;
  }
}

/**
 * Delete a specific question's historical analytics across all sessions
 */
export async function deleteQuestionAnalytics(questionId) {
  const { deleteDoc } = await import('firebase/firestore');
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    for (const sessionDoc of snapshot.docs) {
      const sessionId = sessionDoc.id;
      const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
      const q = query(responsesRef, where('questionId', '==', questionId));
      const responsesSnap = await getDocs(q);
      const deletePromises = responsesSnap.docs.map(d => deleteDoc(doc(db, COLLECTION, sessionId, 'responses', d.id)));
      await Promise.all(deletePromises);
    }
  } catch (error) {
    console.error('Error deleting question analytics:', error);
    throw error;
  }
}

/**
 * Delete all questions' historical analytics across all sessions
 */
export async function deleteAllQuestionAnalytics() {
  const { deleteDoc } = await import('firebase/firestore');
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    for (const sessionDoc of snapshot.docs) {
      const sessionId = sessionDoc.id;
      const responsesRef = collection(db, COLLECTION, sessionId, 'responses');
      const responsesSnap = await getDocs(responsesRef);
      const deletePromises = responsesSnap.docs.map(d => deleteDoc(doc(db, COLLECTION, sessionId, 'responses', d.id)));
      await Promise.all(deletePromises);
    }
  } catch (error) {
    console.error('Error deleting all question analytics:', error);
    throw error;
  }
}
