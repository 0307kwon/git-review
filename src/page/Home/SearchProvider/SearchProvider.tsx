import React, { ReactNode, useRef, useState } from "react";
import { searchByInIDB } from "../../../API/indexedDB";
import { REVIEW_COUNT_PER_PAGE } from "../../../constant/common";
import { CodeReview, SearchFilter } from "../../../util/types";

interface ContextValue {
  searchedReviews: CodeReview[] | null;
  isPageEnded: boolean;
  searchBy: (filter: SearchFilter) => Promise<void>;
  readAdditionalSearchedReviews: () => Promise<void>;
}

export const Context = React.createContext<ContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const SearchProvider = ({ children }: Props) => {
  const currentFilter = useRef<SearchFilter>({
    keyword: "",
    urlNickname: "",
  });
  const [searchedReviews, setSearchedReviews] = useState<CodeReview[] | null>(
    null
  );
  const pageNumber = useRef(1);
  const [isPageEnded, setIsPageEnded] = useState(false);

  const searchBy = async (filter: SearchFilter) => {
    const keyword = filter.keyword?.replaceAll(" ", "") || "";
    const urlNickname = filter.urlNickname || "";

    if (keyword === "" && urlNickname === "") {
      setSearchedReviews(null);
      return;
    }

    currentFilter.current = filter;

    const result = await searchByInIDB({
      ...currentFilter.current,
      pageNumber: (pageNumber.current = 1),
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
    });

    setIsPageEnded(false);
    setSearchedReviews(result);
  };

  const readAdditionalSearchedReviews = async () => {
    if (searchedReviews === null) {
      return;
    }

    if (isPageEnded) {
      return;
    }

    const results = await searchByInIDB({
      ...currentFilter.current,
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
        searchBy,
        readAdditionalSearchedReviews,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default SearchProvider;
