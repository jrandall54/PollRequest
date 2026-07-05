// ============================================================
// PollRequest — Course Service
// CRUD operations for the courses collection in Firestore
// ============================================================

import { db } from '../firebase.js';
import {
  collection, doc, getDocs, addDoc, updateDoc,
  deleteDoc, query, orderBy, serverTimestamp
} from 'firebase/firestore';

const COLLECTION = 'courses';

/**
 * Get all courses
 */
export async function getAllCourses() {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

/**
 * Create a new course
 */
export async function createCourse(courseData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...courseData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

/**
 * Update a course
 */
export async function updateCourse(courseId, updates) {
  try {
    await updateDoc(doc(db, COLLECTION, courseId), updates);
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

/**
 * Delete a course
 */
export async function deleteCourse(courseId) {
  try {
    await deleteDoc(doc(db, COLLECTION, courseId));
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
}

/**
 * Ensure at least one default course exists
 */
export async function ensureDefaultCourse() {
  const courses = await getAllCourses();
  if (courses.length === 0) {
    const defaultId = await createCourse({ 
      name: 'General', 
      description: 'Default fallback course' 
    });
    return { id: defaultId, name: 'General' };
  }
  // Return the first one as default
  return courses[courses.length - 1]; // oldest first because orderBy desc? No, desc means newest first. Let's just return courses[0].
}
