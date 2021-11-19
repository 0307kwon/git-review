import styled from "styled-components";
import { PALETTE } from "../../constant/palette";

export const CodeViewerContainer = styled.div`
  position: relative;
  max-height: 15rem;
  overflow-y: auto;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 8px 0 0 0;
`;

export const CodeFilePath = styled.span`
  display: inline-block;
  position: sticky;
  width: 100%;
  top: 0;
  padding: 0.3rem 0.8rem;
  background: ${PALETTE.GRAY_100};
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;
