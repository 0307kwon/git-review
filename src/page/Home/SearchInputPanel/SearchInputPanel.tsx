import React, { ChangeEvent, useRef } from "react";
import useCodeReviews from "../../../context/CodeReviewProvider/useCodeReviews";
import useDebounce from "../../../hook/useDebounce";
import useSearch from "../SearchProvider/useSearch";
import {
  SearchInputWrapper,
  SearchInput,
  SearchLabel,
  URLNicknameSelectionWrapper,
} from "./SearchInputPanel.styles";
import { ReactComponent as SearchIcon } from "../../../asset/icon/search.svg";
import RadioInput from "../../../component/@common/RadioInput/RadioInput";
import usePullRequestURLs from "../../../context/PullRequestURLProvider/usePullRequestURLs";
import { SearchFilter } from "../../../util/types";
import { PALETTE } from "../../../constant/palette";

const SearchInputPanel = () => {
  const searchFilter = useRef<SearchFilter>({
    keyword: "",
    urlNickname: "",
  });
  const { searchBy } = useSearch();
  const { codeReviews } = useCodeReviews();
  const { pullRequestURLs } = usePullRequestURLs();

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

  const getURLNicknames = () => {
    const examplePullRequestURLs = ["리뷰 별칭 1", "리뷰 별칭 2"];

    if (pullRequestURLs.length === 0) {
      return examplePullRequestURLs;
    }

    const urlNicknameSet = new Set(pullRequestURLs.map((url) => url.nickname));

    return Array.from(urlNicknameSet);
  };

  const onUrlNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchFilter.current = {
      ...searchFilter.current,
      urlNickname: event.currentTarget.value,
    };

    searchBy(searchFilter.current);
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
      <URLNicknameSelectionWrapper>
        <div>
          <RadioInput
            onChange={onUrlNicknameChange}
            labelText="전체보기"
            value=""
            name="urlNickname"
            checked={searchFilter.current.urlNickname === ""}
          />
          {getURLNicknames().map((urlNickname) => (
            <RadioInput
              onChange={onUrlNicknameChange}
              labelText={"#" + urlNickname}
              value={urlNickname}
              name="urlNickname"
              checked={searchFilter.current.urlNickname === urlNickname}
              color={PALETTE.GRAY_400}
            />
          ))}
        </div>
      </URLNicknameSelectionWrapper>
    </div>
  );
};

export default SearchInputPanel;