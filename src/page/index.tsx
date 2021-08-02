import React, { useEffect, useState } from "react";
import { VFC } from "react";
import Search from "../component/Search/Search";
import { CodeReview } from "../util/types";
import { HomeContents } from "./index.styles";
import myGitBookSetting from "../myGitBookSetting.json";
import { requestCodeReview } from "../service/pullRequest";
import ReviewCard from "../component/ReviewCard/ReviewCard";
import { loadIdbAllCodeReview } from "../database/indexedDB";

const Home: VFC = () => {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);

  useEffect(() => {
    loadCodeReview();
  }, []);

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

  return (
    <div>
      <Search />
      <HomeContents>
        {codeReviews.map((codeReview) => (
          <ReviewCard
            key={codeReview.id}
            codeReview={codeReview}
            className="review-card"
          />
        ))}
      </HomeContents>
    </div>
  );
};

export default Home;
