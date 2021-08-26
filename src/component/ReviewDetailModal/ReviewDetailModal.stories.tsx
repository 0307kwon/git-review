import React from "react";
import { useEffect } from "react";
import useModal from "../../context/modalProvider/useModal";
import { CodeReview } from "../../util/types";
import ReviewDetailModal from "./ReviewDetailModal";

export default {
  component: ReviewDetailModal,
  title: "Components/ReviewDetailModal",
};

const review: CodeReview = {
  author: {
    avatarUrl: "https://avatars.githubusercontent.com/u/6455767?v=4",
    userName: "유저네임",
  },
  id: 1,
  content: "조금 더 벌리면 어떨까요?\r\nMODAL: 100 정도로?",
  plainText: "코드 리뷰예요",
  diffHunk:
    '@@ -0,0 +1,11 @@\n+module.exports = {\n+  "stories": [\n+    "../src/**/*.stories.mdx",\n+    "../src/**/*.stories.@(js|jsx|ts|tsx)"\n+  ],\n+  "addons": [\n+    "@storybook/addon-links",\n+    "@storybook/addon-essentials",\n+    "@storybook/preset-create-react-app"\n+  ]\n+}',
  url:
    "https://github.com/woowacourse/react-subway-map/pull/21#discussion_r644791054",
};

export const Primary = () => {
  const modal = useModal();

  useEffect(() => {
    modal.openModal(<ReviewDetailModal review={review} />);
  }, []);

  return <div></div>;
};
