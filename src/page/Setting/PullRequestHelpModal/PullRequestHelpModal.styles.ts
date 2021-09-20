import styled from "styled-components";
import { APP } from "../../../constant/common";

export const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Img = styled.img`
  width: 100%;
  max-width: ${APP.MAX_WIDTH};
  padding: 0.5rem;
`;
