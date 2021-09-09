import { createGlobalStyle } from "styled-components";
import { PALETTE } from "./constant/palette";

export const GlobalStyle = createGlobalStyle`
  font-family: "Noto Sans KR", sans-serif;

  html {
    width: 100%;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    background-color: ${PALETTE.GRAY_100};
  }

  a {
    text-decoration: none;
  }

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
