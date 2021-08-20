import styled from "styled-components";
import { PALETTE } from "../../constant/palette";

export const CardContainer = styled.div`
  width: 100%;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);

  & > *:first-child {
    border-bottom: 1px solid ${PALETTE.GRAY_200};
  }

  & > * {
    height: 2.5rem;
    padding: 0 1rem;
  }
`;

export const NameContainer = styled.div<{ isFailedURL?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isFailedURL }) =>
    isFailedURL ? PALETTE.RED_200 : PALETTE.GRAY_100};
`;

export const URLContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2rem;
`;
