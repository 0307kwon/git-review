import styled from "styled-components";
import Avatar from "../../component/@common/Avatar/Avatar";
import Button from "../../component/@common/Button/Button";
import { PALETTE } from "../../constant/palette";

export const SettingButton = styled(Button)`
  height: 2rem;
  background-color: ${PALETTE.RED_200};
  /* border: 2px solid ${PALETTE.RED_200}; */
`;

export const SettingContainer = styled.div`
  background-color: white;
  border-radius: 7px;
  padding: 1rem;
  border: 1px solid ${PALETTE.GRAY_200};
`;

export const SettingAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;

  & h2 {
    font-size: 1.25rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
`;
