import styled from "styled-components";
import { PALETTE } from "../../constant/palette";
import Button from "../@common/Button/Button";

export const LoginButton = styled(Button)`
  padding: 0.5rem 1rem;
  color: white;
  background-color: ${PALETTE.PRIMARY_500};
`;
