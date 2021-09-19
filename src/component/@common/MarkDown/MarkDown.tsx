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
        a({ node, children, ...props }) {
          return (
            <a target="_blank" {...props}>
              {children}
            </a>
          );
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          const parsedChildren = String(children).replace(
            /\s_🔍([^_])+_\s/g,
            "🔍($1)"
          );

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
              children={parsedChildren.replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {parsedChildren}
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
