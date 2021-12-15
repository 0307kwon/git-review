import React, { useState, VFC } from "react";
import useIntersectionObserver from "../../hook/useIntersectionObserver";
import { CodeReview } from "../../constant/types";
import Avatar from "../@common/Avatar/Avatar";
import MarkDown from "../@common/MarkDown/MarkDown";
import {
  ContentEndDiv,
  ProfileContainer,
  ReviewerAnchor,
  ReviewCardContainer,
  ReviewContent,
  ReviewURLAnchor,
} from "./ReviewCard.styles";
import { ReactComponent as MoreIcon } from "../../asset/icon/more.svg";

interface Props {
  codeReview: CodeReview;
  className?: string;
}

const ReviewCard: VFC<Props> = ({ codeReview, className }) => {
  const [isDimmedVisible, setDimmedVisible] = useState(true);
  const { observedElementRef } = useIntersectionObserver({
    callback: () => {
      setDimmedVisible(false);
    },
  });

  return (
    <ReviewCardContainer className={className}>
      <ProfileContainer>
        <ReviewerAnchor
          target="blank"
          href={`https://github.com/${codeReview.author.userName}`}
        >
          <Avatar
            imgURL={codeReview.author.avatarUrl}
            nickname={codeReview.author.userName}
          />
        </ReviewerAnchor>
        <ReviewURLAnchor target="blank" href={codeReview.url}>
          {`by ${codeReview.urlNickname}`}
        </ReviewURLAnchor>
      </ProfileContainer>
      <ReviewContent isDimmedVisible={isDimmedVisible}>
        <MarkDown>{codeReview.content}</MarkDown>
        <ContentEndDiv ref={observedElementRef}></ContentEndDiv>
        <div className="dimmed">
          <MoreIcon stroke="white" height="2.5rem" />
        </div>
      </ReviewContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
