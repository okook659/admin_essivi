// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Ei_oqJPSEiFnCA7aP5-X_ITjjeGQH5w",
  authDomain: "essivi-a7cde.firebaseapp.com",
  projectId: "essivi-a7cde",
  storageBucket: "essivi-a7cde.firebasestorage.app",
  messagingSenderId: "1097545022776",
  appId: "1:1097545022776:web:466e9a413eaaf0728a95cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)