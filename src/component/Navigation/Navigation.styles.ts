import styled from "styled-components";
import { PALETTE } from "../../constant/palette";
import Button from "../@common/Button/Button";
import { ReactComponent as DownArrow } from "../../icon/downArrow.svg";

export const AvatarButton = styled(Button)`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  border-radius: 25px;
  padding: 0.5rem;
`;

export const Arrow = styled(DownArrow)`
  margin-top: 0.3rem;
`;

export const LoginButton = styled(Button)`
  padding: 0.5rem 1rem;
  color: white;
  background-color: ${PALETTE.PRIMARY_500};
`;
