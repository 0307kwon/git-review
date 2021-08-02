import styled, { createGlobalStyle } from "styled-components";
import { APP } from "./constant/common";
import { PALETTE } from "./constant/palette";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: ${PALETTE.GRAY_100};

  & > * {
    width: ${APP.MAX_WIDTH};
  }
`;

export const GlobalStyle = createGlobalStyle`
  font-family: "Noto Sans KR", sans-serif;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
    font-family: "Noto Sans KR", sans-serif;
    color: ${PALETTE.BLACK};
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  li {
    list-style: none;
  }
`;
