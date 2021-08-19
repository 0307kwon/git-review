import styled from "styled-components";
import { APP } from "./constant/common";
import { PALETTE } from "./constant/palette";

export const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100vw;
  background: ${PALETTE.PRIMARY_400};

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${APP.MAX_WIDTH};
  }
`;

export const Main = styled.main`
  padding-top: 10px;
  height: 100%;
`;
