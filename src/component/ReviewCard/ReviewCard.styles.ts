import styled from "styled-components";
import { PALETTE } from "../../constant/palette";

interface ProfileImgProps {
  imgUrl: string;
}

export const ReviewCardContainer = styled.div`
  width: 100%;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 7px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.7rem;
  border-bottom: 1px solid ${PALETTE.GRAY_200};
`;

export const ProfileImg = styled.div<ProfileImgProps>`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 50%;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: cover;
  margin-right: 1rem;
`;

export const ReviewContent = styled.div`
  padding: 0.5rem 2rem;
  white-space: pre-line;
`;
