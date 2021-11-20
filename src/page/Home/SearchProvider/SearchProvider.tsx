import React, { ReactNode, useRef, useState } from "react";
import { searchByKeywordInIDB } from "../../../API/indexedDB";
import { REVIEW_COUNT_PER_PAGE } from "../../../constant/common";
import { CodeReview } from "../../../util/types";

interface ContextValue {
  searchedReviews: CodeReview[] | null;
  isPageEnded: boolean;
  searchByNewKeyword: (keyword: string) => Promise<void>;
  readAdditionalSearchedReviews: () => Promise<void>;
}

export const Context = React.createContext<ContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const SearchProvider = ({ children }: Props) => {
  const [searchedReviews, setSearchedReviews] = useState<CodeReview[] | null>(
    null
  );
  const currentKeyword = useRef("");
  const pageNumber = useRef(1);
  const [isPageEnded, setIsPageEnded] = useState(false);

  const searchByNewKeyword = async (keyword: string) => {
    if (keyword === "") {
      setSearchedReviews(null);
      return;
    }

    if (keyword.replaceAll(" ", "") === "") {
      setSearchedReviews(null);
      return;
    }

    const filteredKeyword = keyword.trim();

    setIsPageEnded(false);

    const result = await searchByKeywordInIDB({
      keyword: (currentKeyword.current = filteredKeyword),
      pageNumber: (pageNumber.current = 1),
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
    });

    setSearchedReviews(result);
  };

  const readAdditionalSearchedReviews = async () => {
    if (searchedReviews === null) {
      return;
    }

    if (isPageEnded) {
      return;
    }

    const results = await searchByKeywordInIDB({
      keyword: currentKeyword.current,
      pageNumber: (pageNumber.current += 1),
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
    });

    if (results.length === 0) {
      setIsPageEnded(true);
      return;
    }

    setSearchedReviews([...searchedReviews, ...results]);
  };

  return (
    <Context.Provider
      value={{
        searchedReviews,
        isPageEnded,
        searchByNewKeyword,
        readAdditionalSearchedReviews,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default SearchProvider;
