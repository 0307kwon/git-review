import styled, { css, keyframes } from "styled-components";

import { PALETTE } from "../../constant/palette";

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.8;
  }
`;

const hide = css`
  transform: translateY(150%);
`;

export const SnackbarWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  bottom: 1rem;
  max-width: 23.75rem;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  pointer-events: none;
`;

export const Snackbar = styled.div<{ isHidden: boolean }>`
  animation: ${show} 0.5s ease;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1rem;
  width: 100%;
  height: 3rem;
  background-color: ${PALETTE.BLACK};
  opacity: 0.8;
  border-radius: 2px;
  transition: all 0.3s ease;

  ${({ isHidden }) => isHidden && hide};

  & span {
    color: ${PALETTE.WHITE};
  }
`;
