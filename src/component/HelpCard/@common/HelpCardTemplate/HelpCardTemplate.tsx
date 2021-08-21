import React from "react";
import FlexContainer from "../../../@common/FlexContainer/FlexContainer";
import { SubTitleParagraph, TitleParagraph } from "./HelpCardTemplate.styles";

interface Props {
  children: {
    title: React.ReactNode;
    subTitle?: React.ReactNode;
  };
}

const HelpCardTemplate = ({ children }: Props) => {
  return (
    <FlexContainer
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="0.75rem"
    >
      <TitleParagraph>{children.title}</TitleParagraph>
      {children.subTitle && (
        <SubTitleParagraph>{children.subTitle}</SubTitleParagraph>
      )}
    </FlexContainer>
  );
};

export default HelpCardTemplate;
