// ============================================================
// PollRequest — Firebase Configuration
// Initialize Firebase app, Firestore, and Auth
// ============================================================
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use an existing one)
// 3. Add a web app to your project
// 4. Copy the config values below
// 5. Enable Cloud Firestore (Database > Create database > Start in test mode)
// 6. Enable Anonymous Authentication (Authentication > Sign-in method > Anonymous)
//
// See SETUP.md for a detailed walkthrough with screenshots.
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// ── Replace these with your Firebase project values ─────────
const firebaseConfig = {
  apiKey: "AIzaSyCnJTr2FPLcfzzgi9L1ln-5DtZrmN06d44",
  authDomain: "pollrequest-bc2c1.firebaseapp.com",
  projectId: "pollrequest-bc2c1",
  storageBucket: "pollrequest-bc2c1.firebasestorage.app",
  messagingSenderId: "730402309554",
  appId: "1:730402309554:web:5d546b69515db5cb9150ab",
  measurementId: "G-YH15T5QFGY"
};

// ── Check if Firebase is configured ─────────────────────────
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== 'YOUR_API_KEY';
};

// ── Initialize Firebase ─────────────────────────────────────
let app, db, auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization skipped — using demo mode.', error.message);
}

// ── Connect to emulators in development (optional) ──────────
// Uncomment these lines if you're using Firebase Local Emulator Suite:
// if (location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }

export { db, auth };
export default app;
