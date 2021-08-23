import styled from "styled-components";
import Button from "../Button/Button";

const IconButton = styled(Button)<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export default IconButton;
