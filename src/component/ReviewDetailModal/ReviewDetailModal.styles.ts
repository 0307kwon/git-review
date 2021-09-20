import styled from "styled-components";
import { PALETTE } from "../../constant/palette";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CodeViewerContainer = styled.div`
  max-height: 15rem;
  overflow-x: auto;
`;

export const ContentWrapper = styled.div`
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 7px;
  max-height: 20rem;
  overflow-y: auto;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;

export const MarkDownWrapper = styled.div`
  padding: 1rem;
`;
