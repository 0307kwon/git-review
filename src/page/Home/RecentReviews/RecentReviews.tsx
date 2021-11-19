import React, { useEffect } from "react";
import ReviewCard from "../../../component/ReviewCard/ReviewCard";
import ReviewDetailModal from "../../../component/ReviewDetailModal/ReviewDetailModal";
import useCodeReviews from "../../../context/CodeReviewProvider/useCodeReviews";
import useModal from "../../../context/modalProvider/useModal";
import usePullRequestURLs from "../../../context/PullRequestURLProvider/usePullRequestURLs";
import useIntersectionObserver from "../../../hook/useIntersectionObserver";
import { ReviewCardButton, SubTitleContainer } from "../Common.styles";
import { ObservedElement } from "../Home.styles";

const RecentReviews = () => {
  const modal = useModal();
  const {
    codeReviews,
    syncOnlyUpdatedCodeReviewsInIDB,
    readAdditionalReviews,
    isPageEnded,
    isLoading,
  } = useCodeReviews();
  const { pullRequestURLs, resetFailedURLs } = usePullRequestURLs();
  const {
    observedElementRef: recommendedReviewInfinityScroll,
  } = useIntersectionObserver({
    callback: readAdditionalReviews,
    observedElementDeps: [isLoading, codeReviews],
  });

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

  return (
    <>
      <SubTitleContainer>
        <h2>😊 코드 리뷰를 둘러보는 건 어떠세요?</h2>
        <p>저장된 리뷰를 최신순으로 보여 드릴게요</p>
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
      <ObservedElement ref={recommendedReviewInfinityScroll}></ObservedElement>
    </>
  );
};

export default RecentReviews;
