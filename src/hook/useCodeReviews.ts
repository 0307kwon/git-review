import { useEffect, useRef } from "react";
import { useState } from "react";
import { requestCodeReview } from "../API/githubAPI";
import {
  deleteCodeReviewIDB,
  findByKeywordInIDB,
  getAllURLsIDB,
  loadAllCodeReviewIDB,
  readReviewsInIDB,
  storeCodeReviewIDB,
} from "../API/indexedDB";
import usePullRequestURL from "../context/PullRequestURLProvider/usePullRequestURL";
import useUser from "../context/UserProvider/useUser";
import { CodeReview } from "../util/types";

const REVIEW_COUNT_PER_PAGE = 10;

const useCodeReviews = () => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    pullRequestURLs,
    isLoading: isPRLoading,
    modifyURL,
  } = usePullRequestURL();
  const user = useUser();
  const randomNumberForPagination = useRef(Math.random() * 100);
  const currentPage = useRef(1);

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

  const initialLoadReviews = async () => {
    setIsLoading(true);

    currentPage.current = 1;

    const reviews = await readReviewsInIDB({
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
      pageNumber: currentPage.current,
      randomNumber: randomNumberForPagination.current,
    });

    setCodeReview(reviews);

    setIsLoading(false);
  };

  const readAdditionalReviews = async () => {
    setIsLoading(true);

    currentPage.current++;

    const reviews = await readReviewsInIDB({
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
      pageNumber: currentPage.current,
      randomNumber: randomNumberForPagination.current,
    });

    setCodeReview([...codeReviews, ...reviews]);

    setIsLoading(false);
  };

  const syncCodeReviewsInIDB = async () => {
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
  };

  const findByKeyword = async (keyword: string) => {
    if (!keyword) return [];

    if (!keyword.replaceAll(" ", "")) {
      return [];
    }

    const filteredKeyword = keyword.trim();

    const result = await findByKeywordInIDB(filteredKeyword);

    return result;
  };

  useEffect(() => {
    const isOffline = !user.isLogin;

    if (isPRLoading) return;

    if (isOffline) {
      initialLoadReviews();
      return;
    }

    syncCodeReviewsInIDB().then(() => {
      initialLoadReviews();
    });
  }, [isPRLoading, user.isLogin]);

  return {
    data: codeReviews,
    isLoading,
    readAdditionalReviews,
    findByKeyword,
    syncCodeReviews: syncCodeReviewsInIDB,
    loadOneCodeReview,
  };
};

export default useCodeReviews;
