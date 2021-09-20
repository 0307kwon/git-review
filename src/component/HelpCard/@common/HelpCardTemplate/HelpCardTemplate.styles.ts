import styled, { keyframes } from "styled-components";

const titleShow = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  30% {
    opacity: 0;
    transform: translateY(1rem);
  }
  60% {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
`;

const subtitleShow = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  60% {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
  }
`;

export const TitleParagraph = styled.h2`
  animation: ${titleShow} 2s ease;
`;

export const SubTitleParagraph = styled.p`
  font-size: 14px;
  text-align: center;

  animation: ${subtitleShow} 2s ease;
`;
