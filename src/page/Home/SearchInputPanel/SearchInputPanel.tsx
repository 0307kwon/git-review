import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { getAllURLsIDB } from "../../../API/indexedDB";
import { ReactComponent as SearchIcon } from "../../../asset/icon/search.svg";
import Select from "../../../component/@common/Select/Select";
import useCodeReviews from "../../../context/CodeReviewProvider/useCodeReviews";
import usePullRequestURLs from "../../../context/PullRequestURLProvider/usePullRequestURLs";
import useDebounce from "../../../hook/useDebounce";
import { SearchFilter } from "../../../util/types";
import useSearch from "../SearchProvider/useSearch";
import {
  SearchInput,
  SearchInputWrapper,
  SearchLabel,
  URLNicknameSelectionWrapper,
} from "./SearchInputPanel.styles";

const EXAMPLE_URL_NICKNAMES = ["리뷰 별칭 1", "리뷰 별칭 2"];

const SearchInputPanel = () => {
  const searchFilter = useRef<SearchFilter>({
    keyword: "",
    urlNickname: "",
  });
  const { searchBy } = useSearch();
  const { codeReviews } = useCodeReviews();
  const { pullRequestURLs } = usePullRequestURLs();
  const [urlNicknames, setURLNickNames] = useState<string[]>([]);

  const { registerDebounceCallback } = useDebounce({ waitingTimeMs: 250 });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchFilter.current = {
      ...searchFilter.current,
      keyword: event.target.value,
    };

    registerDebounceCallback(() => {
      searchBy(searchFilter.current);
    });
  };

  const handleChangeUrlNickname = (value: string) => {
    searchFilter.current = {
      ...searchFilter.current,
      urlNickname: value === "전체보기" ? "" : value,
    };

    searchBy(searchFilter.current);
  };

  useEffect(() => {
    if (codeReviews.length === 0) {
      setURLNickNames([]);
      return;
    }

    if (urlNicknames.length !== pullRequestURLs.length) {
      getAllURLsIDB().then((urls) => {
        const nicknames = urls.map(({ nickname }) => nickname);

        setURLNickNames(nicknames);
      });
    }
  }, [codeReviews, pullRequestURLs]);

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
      <URLNicknameSelectionWrapper>
        <Select
          width="400px"
          labelText="PR 별칭으로 필터링"
          onChange={handleChangeUrlNickname}
        >
          <option value="전체보기">전체보기</option>
          {(urlNicknames.length > 0 ? urlNicknames : EXAMPLE_URL_NICKNAMES).map(
            (urlNickname) => (
              <option value={urlNickname}>{urlNickname}</option>
            )
          )}
        </Select>
      </URLNicknameSelectionWrapper>
    </div>
  );
};

export default SearchInputPanel;
