import React, { ChangeEvent, useRef, useState } from "react";
import HelpCard from "../../component/HelpCard/HelpCard";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import useCodeReviews from "../../hook/useCodeReviews";
import SearchIcon from "../../icon/SearchIcon";
import { CodeReview } from "../../util/types";
import {
  HomeContents,
  SearchContainer,
  SearchInput,
  SearchLabel,
} from "./Home.styles";

const Home = () => {
  const { data: codeReviews, findByKeyword } = useCodeReviews();
  const [searchResults, setSearchResults] = useState<CodeReview[]>([]);
  const searchKeyword = useRef("");

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchKeyword.current = event.target.value;
    setSearchResults(findByKeyword(searchKeyword.current));
  };

  return (
    <div>
      <SearchContainer>
        <SearchIcon />
        <SearchLabel>search</SearchLabel>
        <SearchInput onChange={handleChangeInput} />
      </SearchContainer>
      <HomeContents>
        {searchResults.length === 0 && (
          <HelpCard
            searchKeyword={searchKeyword.current}
            searchResults={searchResults}
            codeReviews={codeReviews}
          />
        )}
        {/* {검색 결과 없으면 10개 보여주기} */}
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
