import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";

export const Anchor = styled.a`
  text-decoration: none;
  color: ${PALETTE.PRIMARY_500};
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;
  user-select: none;
`;
