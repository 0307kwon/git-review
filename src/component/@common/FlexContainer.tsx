import styled from "styled-components";

interface Props {
  flexDirection?: "column" | "row";
}

const FlexContainer = styled.div<Props>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export default FlexContainer;
