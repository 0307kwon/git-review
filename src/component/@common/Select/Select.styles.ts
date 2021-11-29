import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";
import { FocusEffect } from "../../../global.styles";

export const RootLabel = styled.label<{ width: string }>`
  position: relative;

  .visually-hidden {
    display: block;
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  select {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    &:focus ~ .select-mark {
      ${FocusEffect}
    }
  }

  .select-mark {
    border: 1px solid ${PALETTE.GRAY_200};
    padding: 0.5rem 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    max-width: 100%;
    width: ${({ width }) => width};
    background-color: ${PALETTE.WHITE};
  }

  .select-word {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .arrow {
    margin-top: 4px;
    margin-left: 4px;
  }
`;
