import { useContext } from "react";
import { Context } from "./SearchProvider";

const useSearch = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useSearch 훅은 SearchProvider 내에서만 사용할 수 있습니다."
    );
  }

  return context;
};

export default useSearch;
