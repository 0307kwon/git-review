import React from "react";
import FlexContainer from "../@common/FlexContainer/FlexContainer";
import {
  CardContainer,
  NameContainer,
  URLContainer,
} from "./URLCardTemplate.styles";
import { ReactComponent as ModifyIcon } from "../../icon/modify.svg";
import { ReactComponent as DeleteIcon } from "../../icon/cancel.svg";
import { ReactComponent as LinkIcon } from "../../icon/link.svg";
import IconButton from "../@common/IconButton/IconButton";

interface Children {
  title: React.ReactNode;
  control?: React.ReactNode;
  content: React.ReactNode;
}

interface Props {
  children: Children;
}

const URLCardTemplate = ({ children }: Props) => {
  return (
    <CardContainer>
      <NameContainer>
        <FlexContainer alignItems="center" gap="0.5rem">
          <LinkIcon />
          {children.title}
        </FlexContainer>
        <FlexContainer alignItems="center">{children.control}</FlexContainer>
      </NameContainer>
      <URLContainer>{children.content}</URLContainer>
    </CardContainer>
  );
};

export default URLCardTemplate;