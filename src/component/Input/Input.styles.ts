import styled from "styled-components";
import { PALETTE } from "../../constant/palette";

export const StyledInput = styled.input<{ width?: string }>`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${PALETTE.GRAY_500};
  outline: none;
  padding-bottom: 0.25rem;
  width: ${({ width }) => width};

  &:focus {
    border-bottom: 1px solid ${PALETTE.BLACK};
  }
`;
