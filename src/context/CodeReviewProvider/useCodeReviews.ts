import { useContext } from "react";
import { Context } from "./CodeReviewProvider";

const useCodeReviews = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useCodeReviews 훅은 CodeReviewProvider 내에서만 사용할 수 있습니다."
    );
  }

  return context;
};

export default useCodeReviews;
