import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { StyledMarkDown } from "./MarkDown.styles";

interface Props {
  children: string;
}

const MarkDown = ({ children }: Props) => {
  return (
    <StyledMarkDown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              style={vs}
              customStyle={{
                background: "transparent",
                border: "none",
              }}
              codeTagProps={{
                className: "pre-code",
              }}
              children={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </StyledMarkDown>
  );
};

export default MarkDown;
