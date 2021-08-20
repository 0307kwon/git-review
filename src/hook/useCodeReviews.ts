import { useEffect } from "react";
import { useState } from "react";
import { requestCodeReview } from "../API/githubAPI";
import {
  deleteCodeReviewIDB,
  getAllURLsIDB,
  loadAllCodeReviewIDB,
  storeCodeReviewIDB,
} from "../API/indexedDB";
import usePullRequestURL from "../context/PullRequestURLProvider/usePullRequestURL";
import { CodeReview } from "../util/types";

const useCodeReviews = () => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);
  const { pullRequestURLs, modifyURL } = usePullRequestURL();

  const onError = (failedURLs: string[]) => {
    alert(
      "한 개 이상의 URL을 불러오는데 실패했습니다.\n설정 페이지를 확인해주세요."
    );

    Promise.all(
      failedURLs.map((failedURL) =>
        modifyURL({
          url: failedURL,
          isFailedURL: true,
        })
      )
    );
  };

  const loadOneCodeReview = async (url: string) => {
    const codeReview = await requestCodeReview(url);

    if (codeReview.error) {
      onError([url]);
      return;
    }

    storeCodeReviewIDB(codeReview.resolvedValue);
  };

  const loadCodeReviewFromIDB = async () => {
    const codeReviewsInIdb = await loadAllCodeReviewIDB();

    setCodeReview(codeReviewsInIdb);
  };

  const syncCodeReviews = async () => {
    const updatingURLSet = new Set(
      pullRequestURLs.map((pullRequestURL) => pullRequestURL.url)
    );

    const urlsInIDB: string[] = await getAllURLsIDB();

    const staleURLsInIDB = urlsInIDB.filter((url) => {
      if (updatingURLSet.has(url)) {
        updatingURLSet.delete(url);
        return false;
      }

      return true;
    });

    if (staleURLsInIDB.length > 0) {
      await Promise.all(
        staleURLsInIDB.map((staleURL) => deleteCodeReviewIDB(staleURL))
      );
    }

    if (updatingURLSet.size === 0) {
      loadCodeReviewFromIDB();
      return;
    }

    const updatingCodeReviewPromises = Array.from(updatingURLSet).map((url) =>
      requestCodeReview(url)
    );
    const additionalCodeReviews: CodeReview[] = [];
    const failedURLs: string[] = [];

    (await Promise.allSettled(updatingCodeReviewPromises)).forEach((result) => {
      if (result.status === "rejected") return;

      if (result.value.error) {
        failedURLs.push(result.value.endPointURL);
        return;
      }

      additionalCodeReviews.push(...result.value.resolvedValue);
    });

    if (failedURLs.length > 0) {
      onError(failedURLs);
    }

    await storeCodeReviewIDB(additionalCodeReviews);

    const codeReviewsInIdb = await loadAllCodeReviewIDB();

    setCodeReview(codeReviewsInIdb);
  };

  const findByKeyword = (keyword: string) => {
    if (!keyword) return [];

    if (!keyword.replaceAll(" ", "")) {
      return [];
    }

    const filteredKeyword = keyword.trim();

    const result = codeReviews
      .filter((codeReview) => codeReview.plainText.includes(filteredKeyword))
      .map((codeReview) => ({
        ...codeReview,
        content: codeReview.content.replaceAll(
          filteredKeyword,
          ` _🔍${filteredKeyword}_ `
        ),
      }));

    return result;
  };

  useEffect(() => {
    const isOffline = pullRequestURLs.length === 0;

    if (isOffline) {
      loadCodeReviewFromIDB();
      return;
    }

    syncCodeReviews();
  }, [pullRequestURLs]);

  return {
    data: codeReviews,
    findByKeyword,
    syncCodeReviews,
    loadOneCodeReview,
  };
};

export default useCodeReviews;
