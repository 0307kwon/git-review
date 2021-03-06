import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";

export const Label = styled.label<{ color: PALETTE }>`
  .radio-mark {
    display: block;
    padding: 5px 8px;
    border: 1px solid ${({ color }) => color};
    border-radius: 7px;
    color: ${({ color }) => color};
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }

  .radio-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;

    &:checked ~ .radio-mark {
      color: ${PALETTE.WHITE};
      border: 1px solid ${PALETTE.WHITE};
      background-color: ${({ color }) => color};
    }
  }
`;
