import { useEffect, useState } from "react";
import { requestCodeReview } from "../API/githubAPI";
import { loadIdbAllCodeReview } from "../API/indexedDB";
import myGitBookSetting from "../myGitBookSetting.json";
import { CodeReview } from "../util/types";

const useCodeReviews = () => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);

  const loadCodeReview = async () => {
    const codeReviewsInIdb = await loadIdbAllCodeReview();

    if (codeReviewsInIdb.length > 0) {
      setCodeReview(codeReviewsInIdb);
      return;
    }

    //codeReview를 가져와서 컴포넌트 state에 set해야함
    const codeReviewPromises = myGitBookSetting.url.map((url) =>
      requestCodeReview(url)
    );
    let codeReviews: CodeReview[] = [];

    //TODO: 하나라도 실패하면 로드에 실패함 => 수정해야함
    (await Promise.all(codeReviewPromises)).forEach((reviews) => {
      codeReviews.push(...reviews);
    });

    setCodeReview(codeReviews);
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
    loadCodeReview();
  }, []);

  return { data: codeReviews, findByKeyword };
};

export default useCodeReviews;
