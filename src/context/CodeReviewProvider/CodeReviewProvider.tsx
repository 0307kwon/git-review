import { createContext, useEffect, useRef, useState } from "react";
import { requestCodeReview } from "../../API/githubAPI";
import {
  clearAllReviewIDB,
  deleteCodeReviewIDB,
  getAllURLsIDB,
  readReviewsInIDB,
  storeCodeReviewIDB,
} from "../../API/indexedDB";
import { REVIEW_COUNT_PER_PAGE } from "../../constant/common";
import usePullRequestURLs from "../../context/PullRequestURLProvider/usePullRequestURLs";
import useSnackbar from "../../context/snackbar/useSnackbar";
import useUser from "../../context/UserProvider/useUser";
import { isSameURLPath } from "../../util/common";
import { CodeReview } from "../../util/types";

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  codeReviews: CodeReview[];
  isLoading: boolean;
  isPageEnded: boolean;
  forcedSyncAllCodeReviewInIDB: () => Promise<void>;
  syncOnlyUpdatedCodeReviewsInIDB: () => Promise<void>;
  readAdditionalReviews: () => Promise<void>;
}

export const Context = createContext<ContextValue | null>(null);

const CodeReviewProvider = ({ children }: Props) => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    refetchURLs,
    pullRequestURLs,
    isLoading: isPRLoading,
    modifyURLs,
  } = usePullRequestURLs();
  const { isLogin } = useUser();
  const [isPageEnded, setIsPageEnded] = useState(false);
  const currentPageNumber = useRef(1);
  const snackbar = useSnackbar();

  const onError = async (failedURLs: string[]) => {
    alert(
      "한 개 이상의 URL을 불러오는데 실패했습니다.\ngithub token이 등록되어있는지 확인해보세요!"
    );

    await modifyURLs(
      failedURLs.map((url) => ({
        url,
        isFailedURL: true,
      }))
    );
    await refetchURLs();
  };

  const readAdditionalReviews = async () => {
    const reviews = await readReviewsInIDB({
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
      pageNumber: currentPageNumber.current + 1,
    });

    if (reviews.length === 0) {
      setIsPageEnded(true);

      return;
    }

    setIsPageEnded(false);

    currentPageNumber.current++;

    setCodeReview([...codeReviews, ...reviews]);
  };

  const LoadCodeReviews = async () => {
    currentPageNumber.current = 1;

    const reviews = await readReviewsInIDB({
      pageNumber: currentPageNumber.current,
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
    });

    setCodeReview(reviews);
    setIsLoading(false);
  };

  const syncCodeReviewInIDB = async (updatingURLs: string[]) => {
    const updatingCodeReviewPromises = updatingURLs.map((url) =>
      requestCodeReview(url)
    );
    const CodeReviewsToStore: CodeReview[] = [];
    const failedURLs: string[] = [];
    const urlNicknamesNotToHaveReview: string[] = [];

    (await Promise.allSettled(updatingCodeReviewPromises)).forEach((result) => {
      if (result.status === "rejected") return;

      if (result.value.error) {
        failedURLs.push(result.value.endPointURL);
        return;
      }

      const codeReviewsFromGithubURL = result.value.resolvedValue;

      if (codeReviewsFromGithubURL.length === 0) {
        urlNicknamesNotToHaveReview.push(result.value.endPointURL);

        return;
      }

      const completedCodeReviews: CodeReview[] = codeReviewsFromGithubURL.map(
        (codeReviewFromGithub) => {
          const urlNickname = pullRequestURLs.find((pullRequestURL) =>
            isSameURLPath(pullRequestURL.url, codeReviewFromGithub.url)
          )?.nickname;

          return {
            ...codeReviewFromGithub,
            urlNickname: urlNickname || "익명의 리뷰",
          };
        }
      );

      CodeReviewsToStore.push(...completedCodeReviews);
    });

    if (failedURLs.length > 0) {
      await onError(failedURLs);
    }

    if (urlNicknamesNotToHaveReview.length > 0) {
      alert(
        `다음 url에는 코드 리뷰가 존재하지 않습니다. ${urlNicknamesNotToHaveReview.map(
          (url) => `\n"${url}"`
        )}`
      );
    }

    await storeCodeReviewIDB(CodeReviewsToStore);
  };

  const forcedSyncAllCodeReviewInIDB = async () => {
    snackbar.addSnackbar(
      "progress",
      "최신 PR 목록과 동기화 중입니다",
      120 * 1000
    );
    await clearAllReviewIDB();
    await syncCodeReviewInIDB(
      pullRequestURLs.map((pullRequestURL) => pullRequestURL.url)
    );
    await LoadCodeReviews();
    snackbar.addSnackbar("success", "코드 리뷰 동기화 완료");
  };

  const syncOnlyUpdatedCodeReviewsInIDB = async () => {
    const updatingURLSet = new Set(
      pullRequestURLs.map((pullRequestURL) => pullRequestURL.url)
    );

    const urlsInIDB: string[] = (await getAllURLsIDB()).map((url) => url.url);

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
      await LoadCodeReviews();
      return;
    }

    snackbar.addSnackbar(
      "progress",
      "추가된 PR 목록과 동기화 중입니다",
      120 * 1000
    );

    await syncCodeReviewInIDB(Array.from(updatingURLSet));
    await LoadCodeReviews();

    snackbar.addSnackbar("success", "코드 리뷰 동기화 완료");
  };

  useEffect(() => {
    if (!isLogin) {
      LoadCodeReviews();
      return;
    }

    if (isPRLoading) {
      return;
    }

    syncOnlyUpdatedCodeReviewsInIDB();
  }, [isPRLoading, isLogin]);

  return (
    <Context.Provider
      value={{
        codeReviews,
        isLoading,
        isPageEnded,
        readAdditionalReviews,
        syncOnlyUpdatedCodeReviewsInIDB,
        forcedSyncAllCodeReviewInIDB,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CodeReviewProvider;
