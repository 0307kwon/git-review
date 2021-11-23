import styled from "styled-components";
import FlexContainer from "../../../component/@common/FlexContainer/FlexContainer";
import { PALETTE } from "../../../constant/palette";

export const SearchInputWrapper = styled(FlexContainer)`
  align-items: center;
  padding-bottom: 0.5rem;
`;

export const SearchLabel = styled.label`
  width: 7rem;
  font-size: 1.3rem;
  padding: 0 0 5px 3px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 7px;

  &:focus {
    outline: none;
  }

  &:disabled {
    font-weight: 600;
    border: 1px solid ${PALETTE.GRAY_400};
  }
`;

export const URLNicknameSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
