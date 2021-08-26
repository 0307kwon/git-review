import React, { VFC } from "react";
import { CodeReview } from "../../util/types";
import Avatar from "../@common/Avatar/Avatar";
import MarkDown from "../@common/MarkDown/MarkDown";
import {
  ProfileContainer,
  ReviewCardAnchor,
  ReviewCardContainer,
  ReviewContent,
} from "./ReviewCard.styles";

interface Props {
  codeReview: CodeReview;
  className?: string;
}

const ReviewCard: VFC<Props> = ({ codeReview, className }) => {
  return (
    <ReviewCardContainer className={className}>
      <ProfileContainer>
        <ReviewCardAnchor
          target="blank"
          href={`https://github.com/${codeReview.author.userName}`}
        >
          <Avatar
            imgURL={codeReview.author.avatarUrl}
            nickname={codeReview.author.userName}
          />
        </ReviewCardAnchor>
      </ProfileContainer>
      <ReviewContent>
        <MarkDown>{codeReview.content}</MarkDown>
      </ReviewContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
