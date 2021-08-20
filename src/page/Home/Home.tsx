import React, { useState, VFC } from "react";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import SearchForm from "../../component/SearchForm/SearchForm";
import useCodeReviews from "../../hook/useCodeReviews";
import { CodeReview } from "../../util/types";
import { HomeContents } from "./Home.styles";

const Home: VFC = () => {
  const { data: codeReviews, findByKeyword } = useCodeReviews({
    onError: (failedURL) => {
      alert(
        "한 개 이상의 URL을 불러오는데 실패했습니다.\n설정 페이지를 확인해주세요."
      );
      console.log(failedURL);
    },
  });
  const [searchResults, setSearchResults] = useState<CodeReview[]>([]);

  const handleSearchByKeyword = (keyword: string) => {
    setSearchResults(findByKeyword(keyword));
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearchByKeyword} />
      <HomeContents>
        {searchResults.map((searchResult) => (
          <ReviewCard
            key={searchResult.id}
            codeReview={searchResult}
            className="review-card"
          />
        ))}
      </HomeContents>
    </div>
  );
};

export default Home;
