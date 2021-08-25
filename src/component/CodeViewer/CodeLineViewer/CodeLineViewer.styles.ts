import styled from "styled-components";
import { PALETTE } from "../../../constant/palette";
import { CodeLineType } from "./CodeLineViewer";

export const CodeLineViewerContainer = styled.div<{ type: CodeLineType }>`
  background-color: ${({ type }) => {
    const typeToColorMap: Record<CodeLineType, PALETTE | ""> = {
      "+": PALETTE.GREEN_100,
      "-": PALETTE.RED_100,
      "@": PALETTE.PRIMARY_200,
      " ": "",
    };

    return typeToColorMap[type];
  }};
  display: flex;
  gap: 0.2rem;
  font-size: 14px;
  white-space: pre;
  min-height: 16px;

  & > * {
    padding: 1px 0;
  }

  & > .type {
    display: relative;
    background-color: rgba(0, 0, 0, 0.05);
    width: 1rem;
    text-align: center;
    padding: 0 0.3rem;
  }
`;
