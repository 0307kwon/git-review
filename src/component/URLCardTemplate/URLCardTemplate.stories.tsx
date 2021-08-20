import React from "react";
import { PullRequestURL } from "../../util/types";

import URLCardTemplate from "./URLCardTemplate";

export default {
  component: URLCardTemplate,
  title: "Components/URLCardTemplate",
};

const url: PullRequestURL = {
  nickname: "별칭",
  url: "naver.com",
};

export const Primary = () => (
  <URLCardTemplate>
    {{
      title: <span>별칭</span>,
      content: <span>URL</span>,
    }}
  </URLCardTemplate>
);
