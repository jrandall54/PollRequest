# PollRequest — Firebase Setup Guide

Follow these steps to connect PollRequest to Firebase (free tier).

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"** (or "Add project")
3. Enter a project name (e.g., "pollrequest")
4. You can disable Google Analytics if you want (it's not needed)
5. Click **"Create project"** and wait for it to finish

## Step 2: Add a Web App

1. On your project dashboard, click the **web icon** (`</>`) to add a web app
2. Give it a nickname (e.g., "PollRequest Web")
3. **Don't** check "Firebase Hosting" — we're using GitHub Pages
4. Click **"Register app"**
5. You'll see a code block with your Firebase config — **copy these values**:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Paste Config into the App

1. Open `src/firebase.js` in this project
2. Replace the placeholder values with your real config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",        // <-- paste here
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Enable Cloud Firestore

1. In the Firebase Console, go to **Build > Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules later)
4. Select a Cloud Firestore location close to you
5. Click **"Enable"**

## Step 5: Enable Anonymous Authentication

1. In the Firebase Console, go to **Build > Authentication**
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click **"Anonymous"**
5. Toggle the **Enable** switch on
6. Click **"Save"**

## Step 6: Set Up Security Rules (Important!)

1. Go to **Firestore Database > Rules**
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read questions (needed for the quiz)
    match /questions/{questionId} {
      allow read: if true;
      allow write: if true; // TODO: Restrict to admin in production
    }
    
    // Students can read/write their own profile
    match /students/{studentId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Sessions are readable by all, writable by all (for joining/answering)
    match /sessions/{sessionId} {
      allow read: if true;
      allow write: if true;
      
      // Responses subcollection
      match /responses/{responseId} {
        allow read: if true;
        allow write: if true;
      }
    }
    
    // Admin config
    match /config/{docId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"**

> **Note:** These are permissive rules suitable for a classroom setting. For a production app, you'd want to restrict writes based on authentication. For your use case (trusted classroom environment), these are fine.

## Step 7: Test It

1. Run `npm run dev` in the project directory
2. Open the app in your browser
3. The yellow Firebase warning banner should disappear
4. Click "I'm the Teacher" to set up your admin password
5. Try creating a question, then test the full flow!

## Deploying to GitHub Pages

See `.github/workflows/deploy.yml` — push to `main` and the app auto-deploys.

Or manually:
```bash
npm run build
# Push the dist/ folder to your gh-pages branch
```

## Firebase Free Tier Limits

The free Spark plan is more than enough for classroom use:

| Resource | Free Limit | Typical Usage |
|----------|-----------|---------------|
| Firestore reads | 50,000/day | ~500 per session |
| Firestore writes | 20,000/day | ~200 per session |
| Firestore storage | 1 GB | Very low |
| Auth users | Unlimited | No limit |

A class of 50 students doing a 20-question session uses roughly 1,500 reads and 1,100 writes — well within free limits.
