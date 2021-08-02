import { FC } from "react";
import ReactMarkdown from "react-markdown";
import styled, { css } from "styled-components";
import { PALETTE } from "../../../constant/palette";

const code = css`
  background-color: ${PALETTE.SKY_BLUE_200}; // TODO: 색깔 고민
  border-radius: 5px;
  font-size: 0.8rem;
`;

const MarkDown: FC<ReactMarkdown.ReactMarkdownOptions> = styled(ReactMarkdown)`
  white-space: normal;

  pre {
    overflow-x: auto;
    ${code}
    padding: 2rem 1rem;

    & code {
      //TODO: js 코드 위아래 간격 좀 수정하고 싶음
      background-color: rgba(0, 0, 0, 0);
    }
  }

  blockquote {
    border-left: 5px solid ${PALETTE.GRAY_300};
    padding-left: 0.5rem;
    & > p {
      color: ${PALETTE.GRAY_400};
    }
  }

  code {
    ${code}
    color: ${PALETTE.BLUE_400};
    padding: 0.2rem;
  }

  h1 {
    font-size: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${PALETTE.GRAY_200};
  }

  h2 {
    font-size: 1.7rem;
    padding: 0.5rem 0;
  }

  h3 {
    font-size: 1.4rem;
    padding: 0.5rem 0;
  }

  h4 {
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }

  li {
    list-style: inside;
    margin-left: 1rem;
    padding: 0.25rem;
  }

  ol li {
    list-style: decimal;
  }

  p {
    margin: 1rem 0;
  }
`;

export default MarkDown;
