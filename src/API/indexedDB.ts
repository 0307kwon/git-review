import { CODE_REVIEW_IDB } from "../constant/indexedDB";
import {
  decideAlphabetOrderFromString,
  escapeRegExp,
  filterURLToPath,
} from "../util/common";
import { CodeReview } from "../util/types";
interface CursorWithValue<T> extends IDBCursorWithValue {
  update: <T>(value: T) => IDBRequest<IDBValidKey>;
  value: T;
}

const isCursorWithValue = <T>(
  cursor: IDBCursor
): cursor is CursorWithValue<T> => {
  return (cursor as IDBCursorWithValue)?.value;
};

const openCodeReviewIDB = (): Promise<IDBDatabase> => {
  const request = indexedDB.open(CODE_REVIEW_IDB.NAME, 16);

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (
        db.objectStoreNames.contains(
          CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS
        )
      ) {
        db.deleteObjectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);
      }

      const objectStore = db.createObjectStore(
        CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS,
        {
          keyPath: "id",
        }
      );

      objectStore.createIndex("author", "author.userName", { unique: false });
      objectStore.createIndex("content", "content", { unique: false });
      objectStore.createIndex("url", "url", { unique: false });

      objectStore.transaction.oncomplete = () => {
        resolve(db);
      };
    };

    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);

    request.onerror = (event) =>
      reject((event.target as IDBRequest).error?.message);
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

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }

    const codeReview: CodeReview = cursor.value;

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
    .transaction(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS, "readwrite")
    .objectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);

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

export const getAllURLsIDB = async () => {
  const db = await openCodeReviewIDB();

  const codeReviewObjectStore = db
    .transaction(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS)
    .objectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);
  const urlSet = new Set<string>();

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }
    const codeReview: CodeReview = cursor.value;

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

export const clearAllReviewIDB = async () => {
  const db = await openCodeReviewIDB();

  const transaction = db.transaction(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS,
    "readwrite"
  );
  const codeReviewObjectStore = transaction.objectStore(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS
  );

  codeReviewObjectStore.clear();

  return new Promise((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(true);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB에서 모든 리뷰를 지우는데 실패했습니다."));
  });
};

export const deleteCodeReviewIDB = async (urlPath: string) => {
  const db = await openCodeReviewIDB();

  const transaction = db.transaction(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS,
    "readwrite"
  );
  const codeReviewObjectStore = transaction.objectStore(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS
  );

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }
    const targetURL: string = cursor.value.url;

    if (targetURL.includes(urlPath)) {
      cursor.delete();
    }

    cursor.continue();
  };

  return new Promise((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(true);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB에서 codeReview를 가져오는데 실패했습니다."));
  });
};

export const ModifyCodeReviewIDB = async (
  urlPath: string,
  codeReviewToChange: Partial<CodeReview>
) => {
  const db = await openCodeReviewIDB();

  const transaction = db.transaction(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS,
    "readwrite"
  );
  const codeReviewObjectStore = transaction.objectStore(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS
  );

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }

    const targetURL: string = cursor.value.url;

    if (targetURL.includes(urlPath)) {
      cursor.update<CodeReview>({
        ...cursor.value,
        ...codeReviewToChange,
      });
    }

    cursor.continue();
  };

  return new Promise((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(true);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(
        new Error("indexedDB에 urlNickname을 수정하는 과정이 실패했습니다.")
      );
  });
};

interface FindByKeywordInIDBParam {
  keyword: string;
  pageNumber: number;
  reviewCountPerPage: number;
}

export const searchByKeywordInIDB = async ({
  keyword,
  pageNumber,
  reviewCountPerPage,
}: FindByKeywordInIDBParam) => {
  const db = await openCodeReviewIDB();

  const transaction = db.transaction(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS,
    "readwrite"
  );
  const codeReviewObjectStore = transaction.objectStore(
    CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS
  );

  const foundReviews: CodeReview[] = [];

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }
    const codeReview: CodeReview = cursor.value;

    const regex = new RegExp(`(${escapeRegExp(keyword)})`, "gi");

    if (regex.test(codeReview.plainText)) {
      codeReview.content = codeReview.content.replaceAll(regex, " _🔍$1_ ");

      foundReviews.push(codeReview);
    }

    cursor.continue();
  };

  return new Promise<CodeReview[]>((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(
        foundReviews.slice(
          (pageNumber - 1) * reviewCountPerPage,
          pageNumber * reviewCountPerPage
        )
      );
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB에서 검색 결과를 가져오는데 실패했습니다."));
  });
};

interface ReadReviewsInIDBParam {
  pageNumber: number;
  reviewCountPerPage: number;
}

export const readReviewsInIDB = async ({
  pageNumber,
  reviewCountPerPage,
}: ReadReviewsInIDBParam) => {
  if (pageNumber <= 0) {
    throw new Error("pageNumber는 1이상의 숫자여야합니다.");
  }

  const db = await openCodeReviewIDB();

  const codeReviewObjectStore = db
    .transaction(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS)
    .objectStore(CODE_REVIEW_IDB.OBJECT_STORE_NAME.CODE_REVIEWS);
  const codeReviews: CodeReview[] = [];

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }

    const codeReview: CodeReview = cursor.value;

    codeReviews.push(codeReview);
    cursor.continue();
  };

  return new Promise<CodeReview[]>((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      const sortedReviewsByLatestOrder = codeReviews.sort((a, b) => {
        if (b.createdAtInApp === a.createdAtInApp) {
          return decideAlphabetOrderFromString(a.urlNickname, b.urlNickname);
        }

        return b.createdAtInApp - a.createdAtInApp;
      });

      const paginatedResult = sortedReviewsByLatestOrder.slice(
        (pageNumber - 1) * reviewCountPerPage,
        pageNumber * reviewCountPerPage
      );

      resolve(paginatedResult);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB에서 codeReview를 가져오는데 실패했습니다."));
  });
};
