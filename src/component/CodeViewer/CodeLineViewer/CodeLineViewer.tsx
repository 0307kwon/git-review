import { CodeLineViewerContainer } from "./CodeLineViewer.styles";

export type CodeLineType = "+" | "-" | "@" | " ";

interface Props {
  rawCodeLine: string;
}

const CodeLineViewer = ({ rawCodeLine }: Props) => {
  const type = rawCodeLine.slice(0, 1) as CodeLineType;
  const text = rawCodeLine.slice(1);

  return (
    <CodeLineViewerContainer type={type}>
      <div className="type">{type}</div>
      <span>{text}</span>
    </CodeLineViewerContainer>
  );
};

export default CodeLineViewer;
