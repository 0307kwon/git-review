import { useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { StyledMarkDown } from "./MarkDown.styles";

interface Props {
  children: string;
}

const MarkDown = ({ children }: Props) => {
  const searchedTarget = useRef<HTMLElement>(null);

  useEffect(() => {
    if (searchedTarget.current) {
      const y = searchedTarget.current.offsetTop;
      searchedTarget.current.offsetParent?.scroll(0, y);
    }
  }, [searchedTarget]);

  return (
    <StyledMarkDown
      components={{
        em({ node, children, ...props }) {
          if (searchedTarget.current) {
            return <em>{children}</em>;
          }

          if (String(children).includes("🔍")) {
            return <em ref={searchedTarget}>{children}</em>;
          }

          return <em>{children}</em>;
        },
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
