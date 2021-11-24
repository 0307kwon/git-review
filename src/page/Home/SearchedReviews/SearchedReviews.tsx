import React from "react";
import ReviewDetailModal from "../../../component/ReviewDetailModal/ReviewDetailModal";
import useCodeReviews from "../../../context/CodeReviewProvider/useCodeReviews";
import useModal from "../../../context/modalProvider/useModal";
import useIntersectionObserver from "../../../hook/useIntersectionObserver";
import { StyledReviewCardButton, SubTitleContainer } from "../Common.styles";
import { ObservedElement } from "../Home.styles";
import useSearch from "../SearchProvider/useSearch";

const SearchedReviews = () => {
  const modal = useModal();
  const {
    searchedReviews,
    isPageEnded: isSearchPageEnded,
    readAdditionalSearchedReviews,
  } = useSearch();
  const { isLoading } = useCodeReviews();
  const {
    observedElementRef: searchedReviewInfinityScroll,
  } = useIntersectionObserver({
    callback: readAdditionalSearchedReviews,
    observedElementDeps: [isLoading, searchedReviews],
  });

  return (
    <>
      <SubTitleContainer>
        <h2>🔍 검색 결과를 알려드릴게요!</h2>
        <p>찾아낸 키워드는 형광펜으로 표시돼요.</p>
      </SubTitleContainer>
      {searchedReviews?.map((searchResult) => {
        return (
          <StyledReviewCardButton
            codeReview={searchResult}
            key={searchResult.id}
            onClick={() => {
              modal.openModal(<ReviewDetailModal review={searchResult} />);
            }}
          />
        );
      })}
      {isSearchPageEnded && (
        <SubTitleContainer>
          <h2>🔬 검색된 리뷰는 여기까지예요</h2>
        </SubTitleContainer>
      )}
      <ObservedElement ref={searchedReviewInfinityScroll}></ObservedElement>{" "}
    </>
  );
};

export default SearchedReviews;
