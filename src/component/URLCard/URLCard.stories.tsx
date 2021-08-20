import React from "react";
import URLCard from "./URLCard";

export default {
  component: URLCard,
  title: "Components/URLCard",
};

export const Primary = () => <URLCard nickname="별칭" url="naver.com" />;
