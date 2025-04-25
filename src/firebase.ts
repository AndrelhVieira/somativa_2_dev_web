import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzk4SupPs3-OKWZ1q8GQMSooF75MWQOY0",
  authDomain: "somativa-2-web-dev.firebaseapp.com",
  projectId: "somativa-2-web-dev",
  storageBucket: "somativa-2-web-dev.firebasestorage.app",
  messagingSenderId: "362463432645",
  appId: "1:362463432645:web:fcb98ed4f198e06dd585ac",
  measurementId: "G-XFKY97G75X",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
