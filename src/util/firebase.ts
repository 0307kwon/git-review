import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Profile, PullRequestURL } from "./types";

var firebaseConfig = {
  apiKey: "AIzaSyDTFo4T2WV0fTHj8CJnn25TGMcy1-mGZD8",
  authDomain: "git-review.firebaseapp.com",
  projectId: "git-review",
  storageBucket: "git-review.appspot.com",
  messagingSenderId: "1045910106450",
  appId: "1:1045910106450:web:84b7a3bfb666d2d87d8a8b",
  measurementId: "G-JFS45YMJC7",
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
  "user/pullRequestURLs": dataPoint<{ [url: string]: PullRequestURL }>(
    `users/${uid}/user`
  ).doc("pull-request-urls"),
});

export { default as myFirebase } from "firebase/app";
