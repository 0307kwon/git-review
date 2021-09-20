import React from "react";
import CodeLineViewer from "./CodeLineViewer/CodeLineViewer";
import { CodeViewerContainer } from "./CodeViewer.styles";

interface Props {
  diffHunk: string;
  fileExtension?: string;
}

const CodeViewer = ({ diffHunk, fileExtension = "" }: Props) => {
  return (
    <CodeViewerContainer>
      {diffHunk.split("\n").map((rawCodeLine, index) => (
        <CodeLineViewer
          key={index}
          fileExtension={fileExtension}
          rawCodeLine={rawCodeLine}
        />
      ))}
    </CodeViewerContainer>
  );
};

export default CodeViewer;
