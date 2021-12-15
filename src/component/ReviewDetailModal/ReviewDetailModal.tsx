import React, { useEffect, useRef } from "react";
import { CodeReview } from "../../constant/types";
import Avatar from "../@common/Avatar/Avatar";
import MarkDown from "../@common/MarkDown/MarkDown";
import CodeViewer from "../CodeViewer/CodeViewer";
import { ReviewURLAnchor } from "../ReviewCard/ReviewCard.styles";
import {
  ContentContainer,
  ContentWrapper,
  MarkDownWrapper,
  ProfileWrapper,
} from "./ReviewDetailModal.styles";

interface Props {
  review: CodeReview;
}

const ReviewDetailModal = ({ review }: Props) => {
  return (
    <ContentContainer>
      {review.code && (
        <CodeViewer
          filePath={review.code.path}
          diffHunk={review.code.diffHunk}
        />
      )}
      <ContentWrapper>
        <ProfileWrapper>
          <Avatar
            imgURL={review.author.avatarUrl}
            nickname={review.author.userName}
          />
          <ReviewURLAnchor target="blank" href={review.url}>
            {`by ${review.urlNickname}`}
          </ReviewURLAnchor>
        </ProfileWrapper>
        <MarkDownWrapper>
          <MarkDown>{review.content}</MarkDown>
        </MarkDownWrapper>
      </ContentWrapper>
    </ContentContainer>
  );
};

export default ReviewDetailModal;
