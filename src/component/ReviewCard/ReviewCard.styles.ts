import styled, { keyframes } from "styled-components";
import { PALETTE } from "../../constant/palette";

export const ReviewCardAnchor = styled.a`
  &:hover {
    & {
      text-decoration: underline;
    }
  }
`;

export const ReviewCardContainer = styled.div`
  width: 100%;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 7px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.7rem;
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;

const delayToShow = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const ReviewContent = styled.div<{ isDimmedVisible: boolean }>`
  position: relative;
  padding: 0.5rem 2rem;
  white-space: pre-line;
  max-height: 20rem;
  overflow: hidden;

  & > .dimmed {
    display: ${({ isDimmedVisible }) => (isDimmedVisible ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 100%;
    transform: translateY(-100%);
    left: 0;
    width: 100%;
    height: 1.5rem;
    border-radius: 0 0 7px 7px;
    background-color: rgba(0, 0, 0, 0.5);
    /* background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3)); */
    animation: ${delayToShow} 0.3s linear;
  }
`;

export const ContentEndDiv = styled.div`
  height: 1px;
  width: 100%;
`;
