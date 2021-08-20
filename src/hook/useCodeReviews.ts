import { useEffect, useState } from "react";
import { requestCodeReview } from "../API/githubAPI";
import {
  deleteCodeReviewIDB,
  getAllURLsIDB,
  loadAllCodeReviewIDB,
  storeCodeReviewIDB,
} from "../API/indexedDB";
import useUser from "../context/user/useUser";
import { CodeReview } from "../util/types";

interface Props {
  onError: (failedURL: string[]) => void;
}

const useCodeReviews = ({ onError }: Props) => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);
  const user = useUser();

  const loadOneCodeReview = async (url: string) => {
    const codeReview = await requestCodeReview(url);

    if (codeReview.error) {
      onError([url]);
      return;
    }

    storeCodeReviewIDB(codeReview.resolvedValue);
  };

  const loadCodeReviews = async () => {
    //TODO: 로컬의 url 목록이랑 대조해서 다르면 다른 것만 추가로 긁어옴

    const upToDateURLSet = new Set(
      user.pullRequestURLs.map((pullRequestURL) => pullRequestURL.url)
    );

    const localURLs: string[] = await getAllURLsIDB();

    console.log("최신 데이터", upToDateURLSet);

    const staleURLs = localURLs.filter((url) => {
      if (upToDateURLSet.has(url)) {
        upToDateURLSet.delete(url);
        return false;
      }

      return true;
    });

    console.log("저장되어있는거", localURLs);
    console.log("업데이트해야되는 데이터", upToDateURLSet);

    //staleURLs은 무조건 db에서 삭제
    if (staleURLs.length > 0) {
      console.log("삭제해야하는 데이터", staleURLs);
      await Promise.all(
        staleURLs.map((staleURL) => deleteCodeReviewIDB(staleURL))
      );
    }

    //새로운 거 없으면 무조건 idb에서 땡겨서 로드
    if (upToDateURLSet.size === 0) {
      console.log("새로운거 없음");
      const codeReviewsInIdb = await loadAllCodeReviewIDB();

      console.log(codeReviewsInIdb);

      setCodeReview(codeReviewsInIdb);
      return;
    }

    //추가 최신 정보 로드 후 idb에 담음
    console.log("새로운거 생김", upToDateURLSet);

    const codeReviewPromises = Array.from(upToDateURLSet).map((url) =>
      requestCodeReview(url)
    );
    const codeReviews: CodeReview[] = [];
    const failedURL: string[] = [];

    (await Promise.allSettled(codeReviewPromises)).forEach((result) => {
      if (result.status === "rejected") return;

      if (result.value.error) {
        failedURL.push(result.value.endPointURL);
        return;
      }

      codeReviews.push(...result.value.resolvedValue);
    });

    if (failedURL.length > 0) {
      onError(failedURL);
    }

    await storeCodeReviewIDB(codeReviews);

    const codeReviewsInIdb = await loadAllCodeReviewIDB();

    setCodeReview(codeReviewsInIdb);
  };

  const findByKeyword = (keyword: string) => {
    if (!keyword) return [];

    //TODO: 어떻게 화면에 형광펜으로 표시해주지...?
    const result = codeReviews
      .filter((codeReview) => codeReview.plainText.includes(keyword))
      .map((codeReview) => ({
        ...codeReview,
        content: codeReview.content.replaceAll(keyword, `(요)${keyword}(고)`),
      }));

    console.log(result);

    return result;
  };

  useEffect(() => {
    if (user.pullRequestURLs.length > 0) {
      loadCodeReviews();
    }
  }, [user.pullRequestURLs]);

  return { data: codeReviews, findByKeyword, loadOneCodeReview };
};

export default useCodeReviews;
