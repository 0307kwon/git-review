import { useContext } from "react";
import { Context } from "./PullRequestURLProvider";

const usePullRequestURLs = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "usePullRequestURLs 훅은 PullRequestURLProvider 내에서만 사용할 수 있습니다."
    );
  }

  return context;
};

export default usePullRequestURLs;
