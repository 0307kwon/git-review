import styled, { keyframes } from "styled-components";
import { PALETTE } from "../../../constant/palette";

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Menu = styled.div`
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-width: 54px;
  border: 1px solid ${PALETTE.GRAY_400};
  border-radius: 4px;
  overflow: hidden;
  top: 130%;
  right: 0;
  animation: ${show} 0.2s ease;

  & > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid ${PALETTE.GRAY_400};
    background-color: white;
    user-select: none;
    white-space: nowrap;
    padding: 7px 14px;

    &:last-child {
      border-bottom: none;
    }
  }

  & > button {
    cursor: pointer;
  }

  & > button:hover {
    background-color: ${PALETTE.GRAY_300};
  }
`;
