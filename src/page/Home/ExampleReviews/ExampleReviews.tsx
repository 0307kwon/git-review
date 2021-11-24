import React from "react";
import ReviewDetailModal from "../../../component/ReviewDetailModal/ReviewDetailModal";
import { DUMMY_REVIEWS } from "../../../constant/dummy";
import useModal from "../../../context/modalProvider/useModal";
import { StyledReviewCardButton, SubTitleContainer } from "../Common.styles";

const ExampleReviews = () => {
  const modal = useModal();

  return (
    <>
      <SubTitleContainer>
        <h2>📒 코드 리뷰 예시를 보여드릴게요</h2>
        <p>리뷰 모음집을 만들면 이렇게 보여져요</p>
      </SubTitleContainer>
      {DUMMY_REVIEWS.map((review) => (
        <StyledReviewCardButton
          codeReview={review}
          key={review.id}
          onClick={() => {
            modal.openModal(<ReviewDetailModal review={review} />);
          }}
        />
      ))}
    </>
  );
};

export default ExampleReviews;
