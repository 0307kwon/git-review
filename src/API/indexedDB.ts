import { CODE_REVIEW_IDB } from "../constant/indexedDB";
import {
  decideAlphabetOrderFromString,
  escapeRegExp,
  filterURLToPath,
} from "../util/common";
import { CodeReview, PrUrl } from "../constant/types";

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
  const request = indexedDB.open(CODE_REVIEW_IDB.NAME, 17);

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
      reject(new Error("indexedDB?????? codeReview??? ??????????????? ??????????????????."));
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
            reject("??????");
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
  const urls: Pick<PrUrl, "url" | "nickname">[] = [];

  codeReviewObjectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursor>).result;

    if (!isCursorWithValue<CodeReview>(cursor)) {
      return;
    }
    const codeReview: CodeReview = cursor.value;

    const isAlreadyExisted = urls.some(
      (url) => url.nickname === codeReview.urlNickname
    );

    if (isAlreadyExisted) {
      cursor.continue();
      return;
    }

    urls.push({
      url: filterURLToPath(codeReview.url),
      nickname: codeReview.urlNickname,
    });
    cursor.continue();
  };

  return new Promise<Pick<PrUrl, "url" | "nickname">[]>((resolve, reject) => {
    codeReviewObjectStore.transaction.oncomplete = () => {
      resolve(urls);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB?????? codeReview??? ??????????????? ??????????????????."));
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
      reject(new Error("indexedDB?????? ?????? ????????? ???????????? ??????????????????."));
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
      reject(new Error("indexedDB?????? codeReview??? ??????????????? ??????????????????."));
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
        new Error("indexedDB??? urlNickname??? ???????????? ????????? ??????????????????.")
      );
  });
};

interface FindByInIDBParam {
  keyword?: string;
  urlNickname?: string;
  pageNumber: number;
  reviewCountPerPage: number;
}

export const searchByInIDB = async ({
  keyword = "",
  urlNickname = "",
  pageNumber,
  reviewCountPerPage,
}: FindByInIDBParam) => {
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

    const keywordRegex = new RegExp(`(${escapeRegExp(keyword) || "."})`, "gi");
    const urlNicknameRegex = new RegExp(urlNickname || ".", "g");

    if (!urlNicknameRegex.test(codeReview.urlNickname)) {
      cursor.continue();
      return;
    }

    if (!keywordRegex.test(codeReview.plainText)) {
      cursor.continue();
      return;
    }

    if (keyword !== "") {
      codeReview.content = codeReview.content.replaceAll(
        keywordRegex,
        " _????$1_ "
      );
    }

    foundReviews.push(codeReview);
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
      reject(new Error("indexedDB?????? ?????? ????????? ??????????????? ??????????????????."));
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
    throw new Error("pageNumber??? 1????????? ?????????????????????.");
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
        return decideAlphabetOrderFromString(a.urlNickname, b.urlNickname);
      });

      const paginatedResult = sortedReviewsByLatestOrder.slice(
        (pageNumber - 1) * reviewCountPerPage,
        pageNumber * reviewCountPerPage
      );

      resolve(paginatedResult);
    };
    codeReviewObjectStore.transaction.onerror = () =>
      reject(new Error("indexedDB?????? codeReview??? ??????????????? ??????????????????."));
  });
};
