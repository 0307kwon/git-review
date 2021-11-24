import { createGlobalStyle, css } from "styled-components";
import { MEDIA_QUERY } from "./constant/mediaQuery";
import { PALETTE } from "./constant/palette";

export const FocusEffect = css`
  border-color: ${PALETTE.PRIMARY_400};
  box-shadow: 1px 1px 2px 1px ${PALETTE.PRIMARY_200},
    -1px -1px 2px 1px ${PALETTE.PRIMARY_200},
    1px -1px 2px 1px ${PALETTE.PRIMARY_200},
    -1px 1px 2px 1px ${PALETTE.PRIMARY_200};
`;

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

  h1.logo {
    font-size: 2rem;
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media screen and (max-width: ${MEDIA_QUERY.MOBILE}) {
    h1 {
      font-size: 1.5rem;
    }
    
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
    }

    h3 {
      font-size: 1.15rem;
    }

    h4 {
    font-size: 1.1rem;
    }
  }

  li {
    list-style: none;
  }
`;
