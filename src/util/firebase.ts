import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Profile, PullRequestURLs } from "./types";

//firebase initialize
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

//firestore
const db = firebase.firestore();

const firestoreConverter = <
  T
>(): firebase.firestore.FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot): T => {
    const data = snapshot.data();

    return data as T;
  },
});

const dataPoint = <T>(collectionKey: string) => {
  return db.collection(collectionKey).withConverter(firestoreConverter<T>());
};

export const firestoreDB = (uid: string) => ({
  "user/profile": dataPoint<Profile>(`users/${uid}/user`).doc("profile"),
  "user/pullRequestURLs": dataPoint<PullRequestURLs>(`users/${uid}/user`).doc(
    "pull-request-urls"
  ),
});

export { default as myFirebase } from "firebase/app";
