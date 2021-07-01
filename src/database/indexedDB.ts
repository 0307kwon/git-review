import { CodeReview } from "../util/types";

const request = indexedDB.open("codeReview", 5);
console.log("뭐지");

request.onerror = (event) => {
  console.log("에러");
};

request.onsuccess = (event) => {
  console.log("성공");
};

request.onupgradeneeded = (event) => {
  const db = (event.target as IDBOpenDBRequest).result;
  db.deleteObjectStore("codeReviews");
  const objectStore = db.createObjectStore("codeReviews", { keyPath: "id" });

  objectStore.createIndex("author", "author.userName", { unique: false });
  objectStore.createIndex("content", "content", { unique: false });
};

//get
export const getIDBAllCodeReview = () => {
  const db = request.result;
  const codeReviewObjectStore = db
    .transaction("codeReviews")
    .objectStore("codeReviews");
  const codeReview = [];

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;
    if (cursor) {
      console.log(cursor);
      cursor.continue();
    }
  };
};

//set
export const setIDBCodeReview = (codeReviews: CodeReview[]) => {
  const db = request.result;

  if (!db) {
    return;
  }
  const codeReviewObjectStore = db
    .transaction("codeReviews", "readwrite")
    .objectStore("codeReviews");

  codeReviews.forEach((codeReview) => {
    codeReviewObjectStore.put(codeReview);
    console.log("일단 put 실행됨");
  });
};
