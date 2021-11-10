import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";
import Button from "../Button/Button";

const FloatingActionButton = styled(Button)<{ color?: string; size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ color }) => color || PALETTE.PRIMARY_400};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.05),
    -2px 2px 4px 2px rgba(0, 0, 0, 0.05), 2px -2px 4px 2px rgba(0, 0, 0, 0.05),
    -2px -2px 4px 2px rgba(0, 0, 0, 0.05);
`;

export default FloatingActionButton;
