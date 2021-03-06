import ReactMarkdown from "react-markdown";
import styled, { css } from "styled-components";
import { PALETTE } from "../../../constant/palette";
import { AnchorStyle } from "../Anchor/Anchor";

const code = css`
  background-color: ${PALETTE.PRIMARY_200};
  border-radius: 8px;
  font-size: 0.8rem;
  vertical-align: middle;
`;

export const StyledMarkDown = styled(ReactMarkdown)`
  position: relative;
  padding: 1rem 2rem;
  max-height: inherit;
  overflow-y: hidden;
  white-space: normal;
  line-height: 1.8rem;

  pre {
    overflow-x: auto;
    ${code}
    padding: 2rem 1rem;

    & code {
      //TODO: js 코드 위아래 간격 좀 수정하고 싶음
      line-height: 1.5rem;
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
    color: ${PALETTE.PRIMARY_600};
    font-weight: 600;
    padding: 0.4rem;
  }

  img {
    width: 100%;
  }

  a {
    ${AnchorStyle}
  }

  h1 {
    padding-bottom: 1rem;
    border-bottom: 1px solid ${PALETTE.GRAY_200};
  }

  h2 {
    padding: 1rem 0;
  }

  h3 {
    padding: 0.5rem 0;
  }

  h4 {
    padding: 0.5rem 0;
  }

  em {
    font-style: normal;
    background-color: yellow;
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
