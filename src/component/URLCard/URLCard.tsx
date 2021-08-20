import React from "react";
import { ReactComponent as DeleteIcon } from "../../icon/cancel.svg";
import { ReactComponent as ModifyIcon } from "../../icon/modify.svg";
import { PullRequestURL } from "../../util/types";
import IconButton from "../@common/IconButton/IconButton";
import URLCardTemplate from "../URLCardTemplate/URLCardTemplate";
import { URLParagraph } from "./URLCard.styles";

interface Props {
  pullRequestURL: PullRequestURL;
}

const URLCard = ({ pullRequestURL }: Props) => {
  return (
    <URLCardTemplate>
      {{
        title: pullRequestURL.nickname,
        control: (
          <>
            <IconButton size="2rem" onClick={() => {}}>
              <ModifyIcon />
            </IconButton>
            <IconButton size="2.25rem" onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
        content: <URLParagraph>{pullRequestURL.url}</URLParagraph>,
      }}
    </URLCardTemplate>
  );
};

export default URLCard;
