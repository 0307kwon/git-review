import styled, { createGlobalStyle } from "styled-components";
import { PALETTE } from "./constant/palette";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & > * {
    width: 600px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  font-family: "Noto Sans KR", sans-serif;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    font-family: "Noto Sans KR", sans-serif;
    color: ${PALETTE.BLACK};
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }

  li {
    list-style: none;
  }
`;
