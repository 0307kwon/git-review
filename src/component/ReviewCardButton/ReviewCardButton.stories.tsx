import React from "react";
import { DUMMY_REVIEWS } from "../../constant/dummy";

import ReviewCardButton from "./ReviewCardButton";

export default {
  component: ReviewCardButton,
  title: "Components/ReviewCardButton",
};

export const Primary = () => (
  <ReviewCardButton
    onClick={() => {
      console.log("하하");
    }}
    codeReview={DUMMY_REVIEWS[0]}
  />
);
