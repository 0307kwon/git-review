import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA0jCpEE19Rf0YcGyOff6g6TNLGYu5W5g",
  authDomain: "git-book-6aad6.firebaseapp.com",
  projectId: "git-book-6aad6",
  storageBucket: "git-book-6aad6.appspot.com",
  messagingSenderId: "930716017192",
  appId: "1:930716017192:web:e6ed7d3a8a2c0f6c7acb1d",
  measurementId: "G-6Q07CFC3XQ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export { default as myFirebase } from "firebase/app";
