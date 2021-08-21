import styled from "styled-components";
import { Z_INDEX } from "../../constant/common";

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
  display: inline-block;
  background-color: white;
  border-radius: 25px;
  padding: 3rem;
`;
