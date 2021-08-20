import styled from "styled-components";

export interface Props {
  children: React.ReactNode;
  flexDirection?: "column" | "row";
  justifyContent?: "center" | "start" | "end" | "space-between";
  alignItems?: "center" | "start" | "end" | "space-between";
  gap?: string;
  flexGrow?: string;
  width?: string;
  flexBasis?: string;
  flexShrink?: string;
}

export const FlexContainer = styled.div<Props>`
  display: flex;

  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-basis: ${({ flexBasis }) => flexBasis};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  width: ${({ width }) => width};
`;

export default FlexContainer;
