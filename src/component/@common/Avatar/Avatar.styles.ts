import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";

interface AvatarImgProps {
  imgURL: string;
}

export const AvatarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`;

export const AvatarImg = styled.div<AvatarImgProps>`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${PALETTE.GRAY_200};
  border-radius: 50%;
  background-image: url(${({ imgURL }) => imgURL});
  background-size: cover;
`;
