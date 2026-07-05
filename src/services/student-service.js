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
 * Create or update a student profile
 */
export async function saveProfile(uid, profileData) {
  try {
    const docRef = doc(db, COLLECTION, uid);
    const existing = await getDoc(docRef);

    if (existing.exists()) {
      await updateDoc(docRef, {
        name: profileData.name,
        icon: profileData.icon,
        lastSeen: serverTimestamp(),
      });
    } else {
      await setDoc(docRef, {
        name: profileData.name,
        icon: profileData.icon,
        createdAt: serverTimestamp(),
        lastSeen: serverTimestamp(),
        stats: {
          totalAnswered: 0,
          totalCorrect: 0,
          totalPoints: 0,
          averageResponseTime: 0,
          currentStreak: 0,
          bestStreak: 0,
          sessionsAttended: 0,
        },
      });
    }

    // Update local state
    userStore.update({
      uid,
      name: profileData.name,
      icon: profileData.icon,
      isAuthenticated: true,
    });

    // Save to localStorage for quick return
    localStorage.setItem('pollrequest_uid', uid);
    localStorage.setItem('pollrequest_name', profileData.name);
    localStorage.setItem('pollrequest_icon', profileData.icon);

    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
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
export async function updateStudentStats(uid, sessionStats) {
  try {
    const profile = await getProfile(uid);
    if (!profile) return;

    const stats = profile.stats || {};
    const newTotalAnswered = (stats.totalAnswered || 0) + sessionStats.answered;
    const newTotalCorrect = (stats.totalCorrect || 0) + sessionStats.correct;
    const newTotalPoints = (stats.totalPoints || 0) + sessionStats.points;
    const newSessionsAttended = (stats.sessionsAttended || 0) + 1;

    // Running average for response time
    const oldTotal = (stats.averageResponseTime || 0) * (stats.totalAnswered || 0);
    const newAvg = newTotalAnswered > 0
      ? (oldTotal + sessionStats.totalResponseTime) / newTotalAnswered
      : 0;

    await updateDoc(doc(db, COLLECTION, uid), {
      'stats.totalAnswered': newTotalAnswered,
      'stats.totalCorrect': newTotalCorrect,
      'stats.totalPoints': newTotalPoints,
      'stats.averageResponseTime': Math.round(newAvg),
      'stats.sessionsAttended': newSessionsAttended,
      'stats.currentStreak': sessionStats.finalStreak || 0,
      'stats.bestStreak': Math.max(stats.bestStreak || 0, sessionStats.bestStreak || 0),
      lastSeen: serverTimestamp(),
    });
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
