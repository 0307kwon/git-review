import React, { ChangeEvent, useRef } from "react";
import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import Loading from "../../component/@common/Loading/Loading";
import HelpCard from "../../component/HelpCard/HelpCard";
import useCodeReviews from "../../context/CodeReviewProvider/useCodeReviews";
import useDebounce from "../../hook/useDebounce";
import ExampleReviews from "./ExampleReviews/ExampleReviews";
import {
  HomeContents,
  LoadingContainer,
  SearchContainer,
  SearchInput,
  SearchLabel,
} from "./Home.styles";
import RecentReviews from "./RecentReviews/RecentReviews";
import SearchedReviews from "./SearchedReviews/SearchedReviews";
import useSearch from "./SearchProvider/useSearch";

const Home = () => {
  const { codeReviews, isLoading } = useCodeReviews();
  const { searchedReviews, searchByNewKeyword } = useSearch();

  // TODO: 검색 패널 의존성 분리
  const searchKeyword = useRef("");
  const { registerDebounceCallback } = useDebounce({ waitingTimeMs: 250 });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchKeyword.current = event.target.value;

    registerDebounceCallback(() => {
      searchByNewKeyword(searchKeyword.current);
    });
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
          placeholder={
            codeReviews.length === 0
              ? "로그인 후 리뷰 모음을 만들어주세요!"
              : "코드 리뷰 내용을 검색할 수 있어요"
          }
          disabled={codeReviews.length === 0}
          onChange={handleChangeInput}
        />
      </SearchContainer>
      <HomeContents>
        <HelpCard searchKeyword={searchKeyword.current} />
        {(() => {
          if (codeReviews.length === 0) {
            return <ExampleReviews />;
          }

          if (searchedReviews.length > 0) {
            return <SearchedReviews />;
          }

          return <RecentReviews />;
        })()}
      </HomeContents>
    </div>
  );
};

export default Home;
