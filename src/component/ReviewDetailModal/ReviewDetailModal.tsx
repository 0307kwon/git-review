import React from "react";
import { CodeReview } from "../../util/types";
import { Anchor } from "../@common/Anchor/Anchor";
import Avatar from "../@common/Avatar/Avatar";
import MarkDown from "../@common/MarkDown/MarkDown";
import CodeViewer from "../CodeViewer/CodeViewer";
import {
  ContentWrapper,
  ContentContainer,
  ProfileContainer,
} from "./ReviewDetailModal.styles";

interface Props {
  review: CodeReview;
}

const ReviewDetailModal = ({ review }: Props) => {
  return (
    <ContentContainer>
      <ProfileContainer>
        <ContentWrapper>
          <Avatar
            imgURL={review.author.avatarUrl}
            nickname={review.author.userName}
          />
          <Anchor target="blank" href={review.url}>
            코드 리뷰로 이동
          </Anchor>
        </ContentWrapper>
        {review.diffHunk && <CodeViewer diffHunk={review.diffHunk} />}
        <ContentWrapper>
          <MarkDown>{review.content}</MarkDown>
        </ContentWrapper>
      </ProfileContainer>
    </ContentContainer>
  );
};

export default ReviewDetailModal;
