import React from "react";
import FlexContainer from "../@common/FlexContainer/FlexContainer";
import {
  CardContainer,
  NameContainer,
  URLContainer,
} from "./URLCardTemplate.styles";
import { ReactComponent as ModifyIcon } from "../../asset/icon/modify.svg";
import { ReactComponent as DeleteIcon } from "../../asset/icon/cancel.svg";
import { ReactComponent as LinkIcon } from "../../asset/icon/link.svg";
import IconButton from "../@common/IconButton/IconButton";

interface Children {
  title: React.ReactNode;
  control?: React.ReactNode;
  content: React.ReactNode;
}

interface Props {
  children: Children;
  isFailedURL?: boolean;
}

const URLCardTemplate = ({ children, isFailedURL }: Props) => {
  return (
    <CardContainer>
      <NameContainer isFailedURL={isFailedURL}>
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
