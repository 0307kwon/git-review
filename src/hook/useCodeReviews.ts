import { useEffect, useState } from "react";
import { requestCodeReview } from "../API/githubAPI";
import {
  getAllURLsInIDB,
  loadAllCodeReviewIDB,
  storeCodeReviewIDB,
} from "../API/indexedDB";
import { LOCAL_STORAGE_KEY } from "../constant/common";
import useUser from "../context/user/useUser";
import { CodeReview, PullRequestURL } from "../util/types";

const useCodeReviews = () => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);
  const user = useUser();

  const loadOneCodeReview = async (url: string) => {
    const codeReview = await requestCodeReview(url);

    storeCodeReviewIDB(codeReview);
  };

  const loadCodeReviews = async () => {
    //TODO: 로컬의 url 목록이랑 대조해서 다르면 다른 것만 추가로 긁어옴

    const upToDateURLSet = new Set(
      user.pullRequestURLs.map((pullRequestURL) => pullRequestURL.url)
    );

    const localURLs: string[] = await getAllURLsInIDB();

    const staleURLs = localURLs.filter((url) => {
      if (upToDateURLSet.has(url)) {
        upToDateURLSet.delete(url);
        return false;
      }

      return true;
    });

    console.log("저장되어있는거", localURLs);

    //staleURLs은 무조건 db에서 삭제

    //새로운 거 없으면 무조건 idb에서 땡겨서 로드
    if (upToDateURLSet.size === 0) {
      console.log("새로운거 없음");
      const codeReviewsInIdb = await loadAllCodeReviewIDB();

      setCodeReview(codeReviewsInIdb);
      return;
    }

    //추가 최신 정보 로드 후 idb에 담음
    console.log("새로운거 생김", upToDateURLSet);

    const codeReviewPromises = Array.from(upToDateURLSet).map((url) =>
      requestCodeReview(url)
    );
    let codeReviews: CodeReview[] = [];

    //TODO: 하나라도 실패하면 로드에 실패함 => 수정해야함
    (await Promise.all(codeReviewPromises)).forEach((reviews) => {
      codeReviews.push(...reviews);
    });

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

    return result;
  };

  useEffect(() => {
    console.log("뭐지 왜 모르지", user.pullRequestURLs);
    if (user.pullRequestURLs) {
      loadCodeReviews();
    }
  }, [user.pullRequestURLs]);

  return { data: codeReviews, findByKeyword, loadOneCodeReview };
};

export default useCodeReviews;
