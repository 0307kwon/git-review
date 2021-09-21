import React from "react";
import { DUMMY_REVIEWS } from "../../constant/dummy";

import ReviewCard from "./ReviewCard";

export default {
  component: ReviewCard,
  title: "Components/ReviewCard",
};

export const Primary = () => <ReviewCard codeReview={DUMMY_REVIEWS[0]} />;
