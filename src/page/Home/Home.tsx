import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Loading from "../../component/@common/Loading/Loading";
import HelpCard from "../../component/HelpCard/HelpCard";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import useCodeReviews from "../../hook/useCodeReviews";
import SearchIcon from "../../icon/SearchIcon";
import { getRandomNumber } from "../../util/common";
import { CodeReview } from "../../util/types";
import {
  HomeContents,
  LoadingContainer,
  SearchContainer,
  SearchInput,
  SearchLabel,
  SubTitleContainer,
} from "./Home.styles";

const Home = () => {
  const { data: codeReviews, isLoading, findByKeyword } = useCodeReviews();
  const [searchResults, setSearchResults] = useState<CodeReview[]>([]);
  const searchKeyword = useRef("");
  const [recommendedReviews, setRecommendedReviews] = useState<CodeReview[]>(
    []
  );

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchKeyword.current = event.target.value;
    setSearchResults(findByKeyword(searchKeyword.current));
  };

  const getRecommendedReviews = (numberOfReviews: number) => {
    if (codeReviews.length <= numberOfReviews) {
      return codeReviews;
    }

    const randomNumberSet = new Set<number>();

    while (randomNumberSet.size < numberOfReviews) {
      randomNumberSet.add(getRandomNumber(0, codeReviews.length - 1));
    }

    return Array.from(randomNumberSet).map((number) => codeReviews[number]);
  };

  useEffect(() => {
    if (codeReviews.length === 0) return;

    if (recommendedReviews.length > 0) return;

    const reviews = getRecommendedReviews(10);

    setRecommendedReviews(reviews);
  }, [codeReviews.length]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <div>
      <SearchContainer>
        <SearchIcon />
        <SearchLabel>search</SearchLabel>
        <SearchInput onChange={handleChangeInput} />
      </SearchContainer>
      <HomeContents>
        {searchResults.length === 0 && (
          <>
            <HelpCard
              searchKeyword={searchKeyword.current}
              searchResults={searchResults}
              codeReviews={codeReviews}
            />
            {recommendedReviews.length > 0 && (
              <>
                <SubTitleContainer>
                  <h2>😊 이런 코드 리뷰는 어떠세요?</h2>
                  <p>오늘의 추천 리뷰 입니다</p>
                </SubTitleContainer>
                {recommendedReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    codeReview={review}
                    className="review-card"
                  />
                ))}
              </>
            )}
          </>
        )}
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
