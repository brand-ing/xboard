// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEQFkPibz05tO8GayDPlXMGCRCWN7VMnc",
  authDomain: "xboard-e6b0c.firebaseapp.com",
  projectId: "xboard-e6b0c",
  storageBucket: "xboard-e6b0c.firebasestorage.app",
  messagingSenderId: "1049067345459",
  appId: "1:1049067345459:web:77291d83f41920d4eeb546",
  measurementId: "G-6FHFP6K051"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);