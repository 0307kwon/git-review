import React from "react";
import SearchIcon from "../../icon/SearchIcon";
import { SearchContainer, SearchInput, SearchLabel } from "./Search.styles";

const Search = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchLabel>search</SearchLabel>
      <SearchInput />
    </SearchContainer>
  );
};

export default Search;
