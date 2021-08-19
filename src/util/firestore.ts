import firebase from "firebase/app";
import { myFirebase } from "./firebase";
import { UserInfo } from "./types";

const db = myFirebase.firestore();

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

export const firestoreDB = {
  users: dataPoint<UserInfo>("users"),
};
