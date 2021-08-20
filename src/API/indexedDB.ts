import { CODE_REVIEW_IDB } from "../constant/indexedDB";
import { filterURLToPath } from "../util/common";
import { CodeReview } from "../util/types";

const openCodeReviewIDB = (): Promise<IDBDatabase> => {
  const request = indexedDB.open(CODE_REVIEW_IDB.NAME, 7);

  return new Promise((resolve, rejects) => {
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // db.deleteObjectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);

      const objectStore = db.createObjectStore(
        CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS,
        {
          keyPath: "id",
        }
      );

      objectStore.createIndex("author", "author.userName", { unique: false });
      objectStore.createIndex("content", "content", { unique: false });
      objectStore.createIndex("url", "url", { unique: false });

      resolve(db);
    };

    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
    request.onerror = (event) =>
      rejects(new Error((event.target as IDBRequest).error?.message));
  });
};

export const loadAllCodeReviewIDB = async (): Promise<CodeReview[]> => {
  const db = await openCodeReviewIDB();

  const codeReviewObjectStore = db
    .transaction(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS)
    .objectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);
  const codeReviews: CodeReview[] = [];

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!cursor) {
      return;
    }
    const codeReview: CodeReview = (cursor as IDBCursorWithValue).value;

    codeReviews.push(codeReview);
    cursor.continue();
  };

  return new Promise((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(codeReviews);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB에서 codeReview를 가져오는데 실패했습니다."));
  });
};

export const storeCodeReviewIDB = async (codeReviews: CodeReview[]) => {
  const db = await openCodeReviewIDB();

  if (!db) {
    return;
  }

  const codeReviewObjectStore = db
    .transaction("codeReviews", "readwrite")
    .objectStore("codeReviews");

  await Promise.all(
    codeReviews.map(
      (codeReview) =>
        new Promise((resolve, reject) => {
          const updateRequest = codeReviewObjectStore.put(codeReview);

          updateRequest.onsuccess = () => {
            resolve(true);
          };

          updateRequest.onerror = () => {
            reject("에러");
          };
        })
    )
  );
};

export const getAllURLsInIDB = async () => {
  const db = await openCodeReviewIDB();

  const codeReviewObjectStore = db
    .transaction(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS)
    .objectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);
  const urlSet = new Set<string>();

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!cursor) {
      return;
    }
    const codeReview: CodeReview = (cursor as IDBCursorWithValue).value;

    urlSet.add(filterURLToPath(codeReview.url));
    cursor.continue();
  };

  return new Promise<string[]>((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(Array.from(urlSet));
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB에서 codeReview를 가져오는데 실패했습니다."));
  });
};
