import React from "react";
import URLCardTemplate from "./URLCardTemplate";

export default {
  component: URLCardTemplate,
  title: "Components/URLCardTemplate",
};

export const Primary = () => (
  <URLCardTemplate>
    {{
      title: <span>별칭</span>,
      content: <span>URL</span>,
    }}
  </URLCardTemplate>
);
