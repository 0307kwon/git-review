import { useEffect, useRef } from "react";
import { useState } from "react";
import { requestCodeReview } from "../API/githubAPI";
import {
  deleteCodeReviewIDB,
  getAllURLsIDB,
  readReviewsInIDB,
  storeCodeReviewIDB,
} from "../API/indexedDB";
import { REVIEW_COUNT_PER_PAGE } from "../constant/common";
import usePullRequestURLs from "../context/PullRequestURLProvider/usePullRequestURLs";
import useSnackbar from "../context/snackbar/useSnackbar";
import useUser from "../context/UserProvider/useUser";
import { CodeReview } from "../util/types";

const useCodeReviews = () => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    pullRequestURLs,
    isLoading: isPRLoading,
    modifyURL,
  } = usePullRequestURLs();
  const user = useUser();
  const randomNumberForPagination = useRef(Math.random() * 100);
  const [isPageEnded, setIsPageEnded] = useState(false);
  const currentPageNumber = useRef(1);
  const snackbar = useSnackbar();

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

  const initialLoadCodeReviews = async () => {
    setIsLoading(true);

    currentPageNumber.current = 1;

    const reviews = await readReviewsInIDB({
      pageNumber: currentPageNumber.current,
      randomNumber: randomNumberForPagination.current,
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
    });

    setCodeReview(reviews);
    setIsLoading(false);
  };

  const readAdditionalReviews = async () => {
    if (isPageEnded === true) {
      return;
    }

    currentPageNumber.current++;

    const reviews = await readReviewsInIDB({
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
      pageNumber: currentPageNumber.current,
      randomNumber: randomNumberForPagination.current,
    });

    if (reviews.length === 0) {
      setIsPageEnded(true);
    }

    setCodeReview([...codeReviews, ...reviews]);
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

    snackbar.addSnackbar("progress", "새로운 PR 목록과 동기화 중입니다", 60000);
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
    snackbar.addSnackbar("success", "코드 리뷰 동기화 완료");
  };

  useEffect(() => {
    const isOffline = !user.isLogin;

    if (isOffline) {
      initialLoadCodeReviews();
      return;
    }

    if (isPRLoading) {
      return;
    }

    syncCodeReviewsInIDB().then(() => {
      initialLoadCodeReviews();
    });
  }, [isPRLoading, user.isLogin]);

  return {
    data: codeReviews,
    isLoading,
    isPageEnded,
    readAdditionalReviews,
    syncCodeReviews: syncCodeReviewsInIDB,
    loadOneCodeReview,
  };
};

export default useCodeReviews;
