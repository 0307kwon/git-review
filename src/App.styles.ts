import styled from "styled-components";
import { APP } from "./constant/common";
import { PALETTE } from "./constant/palette";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.99;
  padding-bottom: 10rem;
`;

export const Header = styled.header`
  display: flex;
  position: relative;
  z-index: 100;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100%;
  height: 4rem;
  transform: translateZ(100rem);
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
  height: 100%;
  max-width: ${APP.MAX_WIDTH};
  width: 100%;
  padding: 0.75rem 0.75rem 0;
`;
