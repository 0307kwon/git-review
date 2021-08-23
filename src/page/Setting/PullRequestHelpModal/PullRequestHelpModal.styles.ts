import styled from "styled-components";
import { APP } from "../../../constant/common";

export const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;

  & h2 {
    font-size: 24px;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & h3 {
    font-size: 18px;
  }
`;

export const Img = styled.img`
  width: 100%;
  max-width: ${APP.MAX_WIDTH};
  padding: 0.5rem;
`;
