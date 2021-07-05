import React from "react";
import { VFC } from "react";
import { CodeReview } from "../../util/types";
import {
  ProfileContainer,
  ProfileImg,
  ReviewCardContainer,
  ReviewContent,
} from "./ReviewCard.styles";

interface Props {
  codeReview: CodeReview;
}

const ReviewCard: VFC<Props> = ({ codeReview }) => {
  return (
    <ReviewCardContainer>
      <ProfileContainer>
        <ProfileImg imgURL={codeReview.author.avatarURL} />
        <span>{codeReview.author.userName}</span>
      </ProfileContainer>
      <ReviewContent>{codeReview.content}</ReviewContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
