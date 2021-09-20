import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";

export const LoadingContainer = styled.div<{ size: string; thickness: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 80%;
    height: 80%;
    margin: ${({ thickness }) => thickness};
    border: ${({ thickness }) => thickness} solid ${PALETTE.PRIMARY_400};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${PALETTE.PRIMARY_400} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
