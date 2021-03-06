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
        <h2>π κ²μ κ²°κ³Όλ₯Ό μλ €λλ¦΄κ²μ!</h2>
        <p>μ°ΎμλΈ ν€μλλ νκ΄νμΌλ‘ νμλΌμ.</p>
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
          <h2>π¬ κ²μλ λ¦¬λ·°λ μ¬κΈ°κΉμ§μμ</h2>
        </SubTitleContainer>
      )}
      <ObservedElement ref={searchedReviewInfinityScroll}></ObservedElement>{" "}
    </>
  );
};

export default SearchedReviews;
