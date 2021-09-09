import styled from "styled-components";
import { APP } from "./constant/common";
import { PALETTE } from "./constant/palette";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    max-width: ${APP.MAX_WIDTH};
    width: 100%;
    padding: 0 0.75rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100%;
  height: 4rem;
  background: ${PALETTE.PRIMARY_400};

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: ${APP.MAX_WIDTH};
    width: 100%;
    padding: 0 0.75rem;
  }
`;

export const Main = styled.main`
  padding-top: 10px;
  height: 100%;
`;
