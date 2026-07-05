// ============================================================
// PollRequest — Student Service
// Student profile management and anonymous authentication
// ============================================================

import { db, auth } from '../firebase.js';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc, getDocs,
  collection, query, where, serverTimestamp
} from 'firebase/firestore';
import { userStore } from '../state.js';

const COLLECTION = 'students';

/**
 * Initialize authentication — sign in anonymously
 * Returns the user's UID
 */
export async function initAuth() {
  return new Promise((resolve, reject) => {
    // Check if already signed in
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
      } else {
        try {
          const result = await signInAnonymously(auth);
          resolve(result.user.uid);
        } catch (error) {
          console.error('Auth error:', error);
          reject(error);
        }
      }
    });
  });
}

/**
 * Force a new anonymous authentication (used when creating a totally new identity 
 * to avoid inheriting stats from the previous anonymous session)
 */
export async function forceNewIdentity() {
  await auth.signOut();
  const result = await signInAnonymously(auth);
  return result.user.uid;
}

/**
 * Get the current user's profile from Firestore
 */
export async function getProfile(uid) {
  try {
    const docRef = doc(db, COLLECTION, uid);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { uid: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}



/**
 * Try to reclaim a profile (match name + icon from a different device)
 */
export async function reclaimProfile(name, icon) {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('name', '==', name),
      where('icon', '==', icon)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Found a matching profile
      const existingProfile = snapshot.docs[0];
      return { uid: existingProfile.id, ...existingProfile.data() };
    }
    return null;
  } catch (error) {
    console.error('Error reclaiming profile:', error);
    return null;
  }
}

/**
 * Load saved identity from localStorage (auto-login)
 */
export function loadSavedIdentity() {
  const uid = localStorage.getItem('pollrequest_uid');
  const name = localStorage.getItem('pollrequest_name');
  const icon = localStorage.getItem('pollrequest_icon');

  if (uid && name && icon) {
    return { uid, name, icon };
  }
  return null;
}

/**
 * Clear the local cached identity and force sign out
 * This ensures the next login gets a brand new Anonymous UID
 * WARNING: If logged in as a Host, this will sign them out of their Host account too.
 */
export async function clearLocalIdentity() {
  localStorage.removeItem('pollrequest_uid');
  localStorage.removeItem('pollrequest_name');
  localStorage.removeItem('pollrequest_icon');
  
  try {
    await auth.signOut();
  } catch (e) {
    console.error('Error signing out:', e);
  }
}

/**
 * Clear saved identity (logout)
 */
export function clearSavedIdentity() {
  localStorage.removeItem('pollrequest_uid');
  localStorage.removeItem('pollrequest_name');
  localStorage.removeItem('pollrequest_icon');
  userStore.reset();
}

/**
 * Get all student profiles (for analytics)
 */
export async function getAllStudents() {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs.map(d => ({ uid: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

/**
 * Update a student's aggregated stats after a session
 */
export async function updateStudentStats(uid, sessionStats, courseId = 'General') {
  try {
    const ref = doc(db, COLLECTION, uid);
    const snap = await getDoc(ref);
    const profile = snap.exists() ? snap.data() : { uid, stats: {}, courseStats: {} };

    const calculateNewStats = (oldStats) => {
      const stats = oldStats || {};
      const newTotalAnswered = (stats.totalAnswered || 0) + sessionStats.answered;
      const newTotalCorrect = (stats.totalCorrect || 0) + sessionStats.correct;
      const newTotalPoints = (stats.totalPoints || 0) + sessionStats.points;
      const newSessionsAttended = (stats.sessionsAttended || 0) + 1;

      const oldTotal = (stats.averageResponseTime || 0) * (stats.totalAnswered || 0);
      const newAvg = newTotalAnswered > 0
        ? (oldTotal + sessionStats.totalResponseTime) / newTotalAnswered
        : 0;

      return {
        totalAnswered: newTotalAnswered,
        totalCorrect: newTotalCorrect,
        totalPoints: newTotalPoints,
        averageResponseTime: Math.round(newAvg),
        sessionsAttended: newSessionsAttended,
        currentStreak: sessionStats.finalStreak || 0,
        bestStreak: Math.max(stats.bestStreak || 0, sessionStats.bestStreak || 0),
      };
    };

    const newOverallStats = calculateNewStats(profile.stats);
    
    const courseStatsMap = profile.courseStats || {};
    const newCourseStats = calculateNewStats(courseStatsMap[courseId]);

    await setDoc(ref, {
      uid,
      name: sessionStats.name || profile.name || 'Unknown',
      icon: sessionStats.icon || profile.icon || 'ghost',
      stats: newOverallStats,
      courseStats: {
        [courseId]: newCourseStats
      },
      lastSeen: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating student stats:', error);
  }
}

/**
 * Delete a single student
 */
export async function deleteStudent(uid) {
  const { deleteDoc } = await import('firebase/firestore');
  try {
    await deleteDoc(doc(db, COLLECTION, uid));
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
}

/**
 * Delete all students
 */
export async function deleteAllStudents() {
  const { deleteDoc } = await import('firebase/firestore');
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const promises = snapshot.docs.map(d => deleteDoc(doc(db, COLLECTION, d.id)));
    await Promise.all(promises);
  } catch (error) {
    console.error('Error deleting all students:', error);
    throw error;
  }
}
