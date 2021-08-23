import styled, { keyframes } from "styled-components";
import { APP, Z_INDEX } from "../../constant/common";

const show = keyframes`
  from {
    transform: translateY(20rem);
  }
  to {
    
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${Z_INDEX.MODAL};
`;

export const ModalInner = styled.div`
  position: relative;
  width: 100%;
  max-width: ${APP.MAX_WIDTH};
  display: inline-block;
  background-color: white;
  border-radius: 25px 25px 0 0;
  padding: 3rem;
  animation: ${show} 0.17s ease;
`;
