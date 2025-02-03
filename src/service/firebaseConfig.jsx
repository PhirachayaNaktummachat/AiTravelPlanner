// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgiiQV1JFEKeuk_r8NmaDQCkwvh70X2Do",
  authDomain: "ai-travel-planner-55f43.firebaseapp.com",
  projectId: "ai-travel-planner-55f43",
  storageBucket: "ai-travel-planner-55f43.firebasestorage.app",
  messagingSenderId: "741958424054",
  appId: "1:741958424054:web:a7fd8cca39dfea3eea23d7",
  measurementId: "G-3N3BVVVSK9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);