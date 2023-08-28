// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6j2D-RkR8tdJcaV9srbhqq0GC0prNCBI",
  authDomain: "icecreamwebsite-984e7.firebaseapp.com",
  databaseURL: "https://icecreamwebsite-984e7-default-rtdb.firebaseio.com",
  projectId: "icecreamwebsite-984e7",
  storageBucket: "icecreamwebsite-984e7.appspot.com",
  messagingSenderId: "279566080262",
  appId: "1:279566080262:web:53aa0466ca0a81c72a2687",
  measurementId: "G-3M6M3K8B8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
export { app, auth, database };