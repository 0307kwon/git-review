import React from "react";
import { useEffect } from "react";
import { DUMMY_REVIEWS } from "../../constant/dummy";
import useModal from "../../context/modalProvider/useModal";
import { CodeReview } from "../../constant/types";
import ReviewDetailModal from "./ReviewDetailModal";

export default {
  component: ReviewDetailModal,
  title: "Components/ReviewDetailModal",
};

export const Primary = () => {
  const modal = useModal();

  useEffect(() => {
    modal.openModal(<ReviewDetailModal review={DUMMY_REVIEWS[0]} />);
  }, []);

  return <div></div>;
};
