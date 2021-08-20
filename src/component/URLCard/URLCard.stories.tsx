import React from "react";
import { myFirebase } from "../../util/firebase";
import { PullRequestURL } from "../../util/types";
import URLCard from "./URLCard";

export default {
  component: URLCard,
  title: "Components/URLCard",
};

const pullRequestURL: PullRequestURL = {
  isFailedURL: false,
  nickname: "하하",
  url: "naver.com",
  modificationTime: myFirebase.firestore.Timestamp.now(),
};

export const Primary = () => <URLCard pullRequestURL={pullRequestURL} />;
