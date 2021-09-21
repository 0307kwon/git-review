import React, { useRef, useEffect } from "react";
import { CodeReview } from "../../util/types";
import Avatar from "../@common/Avatar/Avatar";
import MarkDown from "../@common/MarkDown/MarkDown";
import CodeViewer from "../CodeViewer/CodeViewer";
import { ReviewURLAnchor } from "../ReviewCard/ReviewCard.styles";
import {
  ContentContainer,
  ProfileWrapper,
  MarkDownWrapper,
  ContentWrapper,
  CodeViewerContainer,
} from "./ReviewDetailModal.styles";

interface Props {
  review: CodeReview;
}

const ReviewDetailModal = ({ review }: Props) => {
  const codeViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeViewerRef.current) {
      codeViewerRef.current.scrollTo(0, codeViewerRef.current.scrollHeight);
    }
  }, [codeViewerRef]);

  return (
    <ContentContainer>
      {review.code && (
        <CodeViewerContainer ref={codeViewerRef}>
          <CodeViewer
            fileExtension={review.code.path.match(/\.([^.]+)$/)?.[1]}
            diffHunk={review.code.diffHunk}
          />
        </CodeViewerContainer>
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
