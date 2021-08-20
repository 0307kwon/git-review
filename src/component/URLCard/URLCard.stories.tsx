import React from "react";
import { PullRequestURL } from "../../util/types";

import URLCard from "./URLCard";

export default {
  component: URLCard,
  title: "Components/URLCard",
};

const url: PullRequestURL = {
  nickname: "별칭",
  url: "naver.com",
};

export const Primary = () => <URLCard pullRequestURL={url} />;
