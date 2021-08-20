import React, { useState } from "react";
import HelpCard from "../../component/HelpCard/HelpCard";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import SearchForm from "../../component/SearchForm/SearchForm";
import useCodeReviews from "../../hook/useCodeReviews";
import { CodeReview } from "../../util/types";
import { HomeContents } from "./Home.styles";

const Home = () => {
  const { data: codeReviews, findByKeyword } = useCodeReviews();
  const [searchResults, setSearchResults] = useState<CodeReview[]>([]);

  const handleSearchByKeyword = (keyword: string) => {
    setSearchResults(findByKeyword(keyword));
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearchByKeyword} />
      <HomeContents>
        {searchResults.length === 0 && <HelpCard />}
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
