import styled from "styled-components";
import { PALETTE } from "../../constant/palette";
import FlexContainer from "../@common/FlexContainer";

export const SearchContainer = styled(FlexContainer)`
  align-items: center;
  padding-bottom: 1rem;
`;

export const SearchLabel = styled.label`
  width: 7rem;
  font-size: 1.3rem;
  padding: 0 0 5px 3px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${PALETTE.GRAY_400};
  border-radius: 7px;

  &:focus {
    outline: none;
  }
`;
