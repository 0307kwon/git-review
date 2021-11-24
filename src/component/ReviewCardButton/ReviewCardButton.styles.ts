import styled from "styled-components";

export const RootDiv = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    height: calc(100% - 55px);
    z-index: 1;
    opacity: 0;

    &:hover ~ .review-card {
      transform: scale(1.02);
    }
  }

  .review-card {
    transition: all 0.2s ease;
  }
`;
