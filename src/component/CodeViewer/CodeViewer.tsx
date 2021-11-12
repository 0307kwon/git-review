import React, { useEffect, useRef } from "react";
import CodeLineViewer from "./CodeLineViewer/CodeLineViewer";
import { CodeFilePath, CodeViewerContainer } from "./CodeViewer.styles";

interface Props {
  diffHunk: string;
  filePath: string;
  height?: string;
}

const CodeViewer = ({ diffHunk, filePath, height = "15rem" }: Props) => {
  const codeViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeViewerRef.current) {
      codeViewerRef.current.scrollTo(0, codeViewerRef.current.scrollHeight);
    }
  }, [codeViewerRef]);

  return (
    <CodeViewerContainer height={height} ref={codeViewerRef}>
      <CodeFilePath>{filePath}</CodeFilePath>
      {diffHunk.split("\n").map((rawCodeLine, index) => (
        <CodeLineViewer
          key={index}
          fileExtension={filePath.match(/\.([^.]+)$/)?.[1] || ""}
          rawCodeLine={rawCodeLine}
        />
      ))}
    </CodeViewerContainer>
  );
};

export default CodeViewer;
