import { CODE_REVIEW_IDB } from "../constant/indexedDB";
import { CodeReview } from "../util/types";

//TODO: 6버전으로 버전업해야함(url이라는 프로퍼티를 storage에 추가했기 때문에)
//TODO: url에 따라 검색하는 openCursor(url)을 써봐야함

const openCodeReviewIdb = (): Promise<IDBDatabase> => {
  const request = indexedDB.open(CODE_REVIEW_IDB.NAME, 6);

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

//get
export const loadIdbAllCodeReview = async (): Promise<CodeReview[]> => {
  const db = await openCodeReviewIdb();

  const codeReviewObjectStore = db
    .transaction(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS)
    .objectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);
  const codeReviews: CodeReview[] = [];
  const idbRequest = codeReviewObjectStore.openCursor();

  idbRequest.onsuccess = (event) => {
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

export const storeIdbCodeReview = async (codeReviews: CodeReview[]) => {
  const db = await openCodeReviewIdb();

  if (!db) {
    return;
  }

  const codeReviewObjectStore = db
    .transaction("codeReviews", "readwrite")
    .objectStore("codeReviews");

  codeReviews.forEach((codeReview) => {
    codeReviewObjectStore.put(codeReview);
  });
};
