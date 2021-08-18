import React, { ChangeEvent } from "react";
import SearchIcon from "../../icon/SearchIcon";
import { SearchContainer, SearchInput, SearchLabel } from "./SearchForm.styles";

interface Props {
  onSubmit: (searchKeyword: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onSubmit(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchIcon />
      <SearchLabel>search</SearchLabel>
      <SearchInput onChange={handleChangeInput} />
    </SearchContainer>
  );
};

export default SearchForm;
