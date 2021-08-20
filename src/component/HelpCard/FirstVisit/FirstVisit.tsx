import React from "react";
import FlexContainer from "../../@common/FlexContainer/FlexContainer";
import { SubTitleParagraph, TitleParagraph } from "./FirstVisit.styles";

const FirstVisit = () => {
  return (
    <FlexContainer
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="0.75rem"
    >
      <TitleParagraph>🙌 처음이시군요! 환영합니다.</TitleParagraph>
      <SubTitleParagraph>
        로그인 후 자신만의 PR 모음집을 만들어보세요!
      </SubTitleParagraph>
    </FlexContainer>
  );
};

export default FirstVisit;
