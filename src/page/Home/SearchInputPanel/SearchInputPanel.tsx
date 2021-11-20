import React, { ChangeEvent, useRef } from "react";
import { ReactComponent as SearchIcon } from "../../../asset/icon/search.svg";
import useCodeReviews from "../../../context/CodeReviewProvider/useCodeReviews";
import useDebounce from "../../../hook/useDebounce";
import useSearch from "../SearchProvider/useSearch";
import {
  SearchInput,
  SearchInputWrapper,
  SearchLabel,
} from "./SearchInputPanel.styles";

const SearchInputPanel = () => {
  const searchKeyword = useRef("");
  const { searchByNewKeyword } = useSearch();
  const { codeReviews } = useCodeReviews();

  const { registerDebounceCallback } = useDebounce({ waitingTimeMs: 250 });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchKeyword.current = event.target.value;

    registerDebounceCallback(() => {
      searchByNewKeyword(searchKeyword.current);
    });
  };

  return (
    <div>
      <SearchInputWrapper>
        <SearchIcon />
        <SearchLabel>search</SearchLabel>
        <SearchInput
          type="search"
          placeholder={
            codeReviews.length === 0
              ? "로그인 후 리뷰 모음을 만들어주세요!"
              : "코드 리뷰 내용을 검색할 수 있어요"
          }
          disabled={codeReviews.length === 0}
          onChange={handleChangeInput}
        />
      </SearchInputWrapper>
    </div>
  );
};

export default SearchInputPanel;
