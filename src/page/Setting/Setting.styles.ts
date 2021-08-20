import styled from "styled-components";
import Avatar from "../../component/@common/Avatar/Avatar";
import { PALETTE } from "../../constant/palette";

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
  gap: 0.5rem;
  padding: 1rem 0;
  align-items: center;

  & > * {
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