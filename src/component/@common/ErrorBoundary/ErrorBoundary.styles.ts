import styled from "styled-components";
import { ReactComponent as Error } from "../../../asset/icon/error.svg";

export const ErrorBoundaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

export const ErrorMark = styled(Error)`
  max-width: 80px;
  max-height: 80px;
`;
