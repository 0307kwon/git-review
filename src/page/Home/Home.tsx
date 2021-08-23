import React, { ChangeEvent, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import Loading from "../../component/@common/Loading/Loading";
import HelpCard from "../../component/HelpCard/HelpCard";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import useCodeReviews from "../../hook/useCodeReviews";
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
  const {
    data: codeReviews,
    readAdditionalReviews,
    isLoading,
    findByKeyword,
  } = useCodeReviews();
  const [searchResults, setSearchResults] = useState<CodeReview[]>([]);
  const searchKeyword = useRef("");

  const handleChangeInput = async (event: ChangeEvent<HTMLInputElement>) => {
    searchKeyword.current = event.target.value;
    const foundReviews = await findByKeyword(searchKeyword.current);
    setSearchResults(foundReviews);
  };

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
        <SearchInput
          type="search"
          placeholder="코드 리뷰 내용을 검색할 수 있어요"
          onChange={handleChangeInput}
        />
      </SearchContainer>
      <HomeContents>
        {searchResults.length === 0 && (
          <>
            <HelpCard
              searchKeyword={searchKeyword.current}
              searchResults={searchResults}
              codeReviews={codeReviews}
            />
            {codeReviews.length > 0 && (
              <>
                <SubTitleContainer>
                  <h2>😊 코드 리뷰를 둘러보는 건 어떠세요?</h2>
                  <p>저장된 리뷰를 랜덤으로 보여드릴게요</p>
                </SubTitleContainer>
                {codeReviews.map((review) => (
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
