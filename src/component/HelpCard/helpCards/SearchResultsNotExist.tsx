import React from "react";
import HelpCardTemplate from "../@common/HelpCardTemplate/HelpCardTemplate";

const SearchResultsNotExist = () => {
  return (
    <HelpCardTemplate>
      {{
        title: "👀 검색 결과가 없습니다",
        subTitle: "다른 키워드를 입력해주세요!",
      }}
    </HelpCardTemplate>
  );
};

export default SearchResultsNotExist;
