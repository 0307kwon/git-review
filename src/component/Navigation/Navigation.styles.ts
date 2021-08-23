import styled from "styled-components";
import { PALETTE } from "../../constant/palette";
import Button from "../@common/Button/Button";
import { ReactComponent as DownArrow } from "../../asset/icon/downArrow.svg";
import Dropdown from "../@common/Dropdown/Dropdown";

export const AvatarContainer = styled.div`
  position: relative;
`;

export const AvatarButton = styled(Button)`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  border-radius: 25px;
  padding: 0.5rem;
`;

export const AvatarDropdown = styled(Dropdown)`
  &:first-child:hover {
    background-color: ${PALETTE.PRIMARY_400};
  }

  & .welcome {
    background-color: ${PALETTE.PRIMARY_400};
    color: white;
  }

  & .red {
    color: ${PALETTE.RED_400};
  }
`;

export const Arrow = styled(DownArrow)`
  margin-top: 0.3rem;
`;

export const LoginButton = styled(Button)`
  padding: 0.5rem 1rem;
  color: white;
  background-color: ${PALETTE.PRIMARY_500};
`;
