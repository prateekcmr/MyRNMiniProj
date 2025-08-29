// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDJGTQcf6ADo8gtvn67hcGV6xIAVVGbej8",
  authDomain: "umsaug2025.firebaseapp.com",
  projectId: "umsaug2025",
  storageBucket: "umsaug2025.firebasestorage.app",
  messagingSenderId: "1014676598814",
  appId: "1:1014676598814:android:07a998126cc0837da3fe0f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);