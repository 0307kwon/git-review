import styled, { css } from "styled-components";
import { PALETTE } from "../../../constant/palette";

export const AnchorStyle = css`
  text-decoration: none;
  color: ${PALETTE.PRIMARY_500};
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${PALETTE.PRIMARY_600};
  }
`;

export const Anchor = styled.a`
  ${AnchorStyle}
`;
