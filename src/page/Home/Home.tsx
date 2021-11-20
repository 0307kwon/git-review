import React from "react";
import Loading from "../../component/@common/Loading/Loading";
import HelpCard from "../../component/HelpCard/HelpCard";
import useCodeReviews from "../../context/CodeReviewProvider/useCodeReviews";
import ExampleReviews from "./ExampleReviews/ExampleReviews";
import { HomeContents, LoadingContainer } from "./Home.styles";
import RecentReviews from "./RecentReviews/RecentReviews";
import SearchedReviews from "./SearchedReviews/SearchedReviews";
import SearchInputPanel from "./SearchInputPanel/SearchInputPanel";
import useSearch from "./SearchProvider/useSearch";

const Home = () => {
  const { codeReviews, isLoading } = useCodeReviews();
  const { searchedReviews } = useSearch();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <div>
      <SearchInputPanel />
      <HomeContents>
        <HelpCard />
        {(() => {
          if (codeReviews.length === 0) {
            return <ExampleReviews />;
          }

          if (searchedReviews === null) {
            return <RecentReviews />;
          }

          if (searchedReviews.length > 0) {
            return <SearchedReviews />;
          }
        })()}
      </HomeContents>
    </div>
  );
};

export default Home;
