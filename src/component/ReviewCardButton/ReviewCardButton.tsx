import React, { ButtonHTMLAttributes } from "react";
import { CodeReview } from "../../constant/types";
import ReviewCard from "../ReviewCard/ReviewCard";
import { RootDiv } from "./ReviewCardButton.styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  codeReview: CodeReview;
}

const ReviewCardButton = ({ codeReview, className, ...option }: Props) => {
  return (
    <RootDiv className={className}>
      <button {...option}></button>
      <ReviewCard className="review-card" codeReview={codeReview} />
    </RootDiv>
  );
};

export default ReviewCardButton;
