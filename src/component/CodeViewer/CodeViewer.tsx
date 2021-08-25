import React from "react";
import CodeLineViewer from "./CodeLineViewer/CodeLineViewer";

interface Props {
  diffHunk: string;
}

const CodeViewer = ({ diffHunk }: Props) => {
  return (
    <div>
      {diffHunk.split("\n").map((rawCodeLine) => (
        <CodeLineViewer rawCodeLine={rawCodeLine} />
      ))}
    </div>
  );
};

export default CodeViewer;
