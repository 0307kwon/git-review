import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeLineViewerContainer } from "./CodeLineViewer.styles";

export type CodeLineType = "+" | "-" | "@" | " ";

interface Props {
  fileExtension: string;
  rawCodeLine: string;
}

const CodeLineViewer = ({ fileExtension, rawCodeLine }: Props) => {
  const type = rawCodeLine.slice(0, 1) as CodeLineType;
  const text = rawCodeLine.slice(1);

  return (
    <CodeLineViewerContainer type={type}>
      <div className="type">{type}</div>
      <SyntaxHighlighter
        language={fileExtension}
        style={vs}
        customStyle={{
          background: "transparent",
          border: "none",
          padding: "0",
          margin: "0",
          fontFamily: "Noto Sans KR, sans-serif",
          lineHeight: "normal",
          overflowX: "hidden",
        }}
      >
        {text}
      </SyntaxHighlighter>
    </CodeLineViewerContainer>
  );
};

export default CodeLineViewer;
