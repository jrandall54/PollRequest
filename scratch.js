import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnJTr2FPLcfzzgi9L1ln-5DtZrmN06d44",
  authDomain: "pollrequest-bc2c1.firebaseapp.com",
  projectId: "pollrequest-bc2c1",
  storageBucket: "pollrequest-bc2c1.firebasestorage.app",
  messagingSenderId: "730402309554",
  appId: "1:730402309554:web:5d546b69515db5cb9150ab",
  measurementId: "G-YH15T5QFGY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const sessions = await getDocs(collection(db, 'sessions'));
    sessions.docs.forEach(d => {
      const data = d.data();
      console.log(d.id, "qIds length:", data.questionIds?.length, "idx:", data.currentQuestionIndex, "state:", data.currentQuestionState);
    });
  } catch(e) {
    console.error(e);
  }
}
test();
