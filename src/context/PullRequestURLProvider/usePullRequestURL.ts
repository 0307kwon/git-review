import { useContext, useEffect } from "react";
import { Context } from "./PullRequestURLProvider";

const usePullRequestURL = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "usePullRequestURL 훅은 PullRequestURLProvider 내에서만 사용할 수 있습니다."
    );
  }

  return context;
};

export default usePullRequestURL;
