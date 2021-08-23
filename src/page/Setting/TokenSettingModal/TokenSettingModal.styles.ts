import styled from "styled-components";
import Button from "../../../component/@common/Button/Button";
import { PALETTE } from "../../../constant/palette";

export const SettingModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h2 {
    font-size: 20px;
  }
`;

export const SettingButton = styled(Button)`
  background-color: ${PALETTE.GRAY_100};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
