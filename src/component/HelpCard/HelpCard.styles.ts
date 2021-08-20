import styled, { keyframes } from "styled-components";
import { PALETTE } from "../../constant/palette";

const show = keyframes`
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20rem;
  background-color: white;
  border-radius: 7px;
  margin-bottom: 1rem;
  border: 1px solid ${PALETTE.GRAY_200};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);

  animation: ${show} 1s ease;
  padding: 1rem;
`;
