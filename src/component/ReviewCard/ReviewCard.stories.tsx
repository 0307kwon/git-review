import React from "react";
import { CodeReview } from "../../util/types";

import ReviewCard from "./ReviewCard";

export default {
  component: ReviewCard,
  title: "Components/ReviewCard",
};

const dummyCodeReview: CodeReview = {
  id: 1,
  url: "naver.com",
  author: {
    avatarUrl:
      "https://images.chosun.com/resizer/u9nJRxs0BbtjygJ4HzKukecXnOk=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UVBJZL3RXAB36BDSHVM3MW2WNY.jpg",
    userName: "미키",
  },
  content: "이 코드는 별로네요;",
};

export const Primary = () => <ReviewCard codeReview={dummyCodeReview} />;
