import styled from "styled-components";
import { PALETTE } from "../../constant/palette";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 70vh;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 14px 14px 0 0;
  border-bottom: none;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;
