import { useRef, useState } from "react";
import { searchByInIDB } from "../API/indexedDB";
import { REVIEW_COUNT_PER_PAGE } from "../constant/common";
import { CodeReview } from "../util/types";

const useReviewSearchEngine = () => {
  const [searchedReviews, setSearchedReviews] = useState<CodeReview[]>([]);
  const currentKeyword = useRef("");
  const pageNumber = useRef(1);
  const [isPageEnded, setIsPageEnded] = useState(false);

  const searchByNewKeyword = async (keyword: string) => {
    if (!keyword) {
      setSearchedReviews([]);
      return;
    }

    if (!keyword.replaceAll(" ", "")) {
      setSearchedReviews([]);
      return;
    }

    const filteredKeyword = keyword.trim();

    setIsPageEnded(false);

    const result = await searchByInIDB({
      keyword: (currentKeyword.current = filteredKeyword),
      pageNumber: (pageNumber.current = 1),
      reviewCountPerPage: REVIEW_COUNT_PER_PAGE,
    });

    setSearchedReviews(result);
  };

  const readAdditionalSearchedReviews = async () => {
    if (isPageEnded) {
      return;
    }

    const results = await searchByInIDB({
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

  return {
    searchedReviews,
    isPageEnded,
    searchByNewKeyword,
    readAdditionalSearchedReviews,
  };
};

export default useReviewSearchEngine;
