import React, { ChangeEvent, useEffect, useRef } from "react";
import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import Loading from "../../component/@common/Loading/Loading";
import HelpCard from "../../component/HelpCard/HelpCard";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import ReviewDetailModal from "../../component/ReviewDetailModal/ReviewDetailModal";
import { DUMMY_REVIEWS } from "../../constant/dummy";
import useCodeReviews from "../../context/CodeReviewProvider/useCodeReviews";
import useModal from "../../context/modalProvider/useModal";
import usePullRequestURLs from "../../context/PullRequestURLProvider/usePullRequestURLs";
import useDebounce from "../../hook/useDebounce";
import useIntersectionObserver from "../../hook/useIntersectionObserver";
import useReviewSearchEngine from "../../hook/useReviewSearchEngine";
import {
  HomeContents,
  LoadingContainer,
  ObservedElement,
  ReviewCardButton,
  SearchContainer,
  SearchInput,
  SearchLabel,
  SubTitleContainer,
} from "./Home.styles";

const Home = () => {
  const modal = useModal();
  const {
    pullRequestURLs,
    resetFailedURLs,
    refetchURLs,
  } = usePullRequestURLs();

  const {
    codeReviews,
    syncOnlyUpdatedCodeReviewsInIDB,
    readAdditionalReviews,
    isPageEnded,
    isLoading,
  } = useCodeReviews();

  const {
    searchedReviews,
    isPageEnded: isSearchPageEnded,
    searchByNewKeyword,
    readAdditionalSearchedReviews,
  } = useReviewSearchEngine();

  const {
    observedElementRef: recommendedReviewInfinityScroll,
  } = useIntersectionObserver({
    callback: readAdditionalReviews,
    observedElementDeps: [isLoading, searchedReviews.length === 0],
  });

  const {
    observedElementRef: searchedReviewInfinityScroll,
  } = useIntersectionObserver({
    callback: readAdditionalSearchedReviews,
    observedElementDeps: [isLoading, searchedReviews.length > 0],
  });

  const searchKeyword = useRef("");
  const { registerDebounceCallback } = useDebounce({ waitingTimeMs: 250 });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchKeyword.current = event.target.value;

    registerDebounceCallback(() => {
      searchByNewKeyword(searchKeyword.current);
    });
  };

  useEffect(() => {
    if (codeReviews.length === 0) return;

    if (pullRequestURLs.length === 0) return;
  }, [codeReviews, pullRequestURLs]);

  useEffect(() => {
    if (pullRequestURLs.length === 0) {
      return;
    }

    const isFailedURLExist = pullRequestURLs.some(
      (pullRequestURL) => pullRequestURL.isFailedURL
    );

    if (isFailedURLExist) {
      resetFailedURLs().then(() => {
        syncOnlyUpdatedCodeReviewsInIDB();
      });

      return;
    }

    syncOnlyUpdatedCodeReviewsInIDB();
  }, []);

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
        {searchedReviews.length === 0 && (
          <>
            <HelpCard
              searchKeyword={searchKeyword.current}
              searchResults={searchedReviews}
              codeReviews={codeReviews}
            />
            {codeReviews.length === 0 ? (
              <>
                <SubTitleContainer>
                  <h2>📒 코드 리뷰 예시를 보여드릴게요</h2>
                  <p>리뷰 모음집을 만들면 이렇게 보여져요</p>
                </SubTitleContainer>
                {DUMMY_REVIEWS.map((review) => (
                  <ReviewCardButton
                    key={review.id}
                    onClick={() => {
                      modal.openModal(<ReviewDetailModal review={review} />);
                    }}
                  >
                    <ReviewCard codeReview={review} />
                  </ReviewCardButton>
                ))}
              </>
            ) : (
              <>
                <SubTitleContainer>
                  <h2>😊 코드 리뷰를 둘러보는 건 어떠세요?</h2>
                  <p>저장된 리뷰를 랜덤으로 보여드릴게요</p>
                </SubTitleContainer>
                {codeReviews.map((review) => (
                  <ReviewCardButton
                    key={review.id}
                    onClick={() => {
                      modal.openModal(<ReviewDetailModal review={review} />);
                    }}
                  >
                    <ReviewCard codeReview={review} />
                  </ReviewCardButton>
                ))}
                {isPageEnded && (
                  <SubTitleContainer>
                    <h2>🤩 저장된 리뷰는 여기까지예요</h2>
                  </SubTitleContainer>
                )}
                <ObservedElement
                  ref={recommendedReviewInfinityScroll}
                ></ObservedElement>
              </>
            )}
          </>
        )}
        {searchedReviews.length > 0 && (
          <>
            {searchedReviews.map((searchResult) => {
              return (
                <ReviewCardButton
                  key={searchResult.id}
                  onClick={() => {
                    modal.openModal(
                      <ReviewDetailModal review={searchResult} />
                    );
                  }}
                >
                  <ReviewCard
                    codeReview={searchResult}
                    className="review-card"
                  />
                </ReviewCardButton>
              );
            })}
            {isSearchPageEnded && (
              <SubTitleContainer>
                <h2>🔬 검색된 리뷰는 여기까지예요</h2>
              </SubTitleContainer>
            )}
            <ObservedElement
              ref={searchedReviewInfinityScroll}
            ></ObservedElement>{" "}
          </>
        )}
      </HomeContents>
    </div>
  );
};

export default Home;
