import React, { VFC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeReview } from "../../util/types";
import Avatar from "../@common/Avatar/Avatar";
import MarkDown from "../@common/MarkDown/MarkDown";
import {
  ProfileContainer,
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
        <Avatar
          imgURL={codeReview.author.avatarUrl}
          nickname={codeReview.author.userName}
        />
      </ProfileContainer>
      <ReviewContent>
        <MarkDown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  style={vs}
                  customStyle={{
                    background: "transparent",
                    border: "none",
                  }}
                  codeTagProps={{
                    className: "pre-code",
                  }}
                  children={String(children).replace(/\n$/, "")}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {codeReview.content}
        </MarkDown>
      </ReviewContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
