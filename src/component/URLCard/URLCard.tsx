import React from "react";
import usePullRequestURL from "../../hook/usePullRequestURL";
import { ReactComponent as DeleteIcon } from "../../icon/cancel.svg";
import { ReactComponent as ModifyIcon } from "../../icon/modify.svg";
import IconButton from "../@common/IconButton/IconButton";
import URLCardTemplate from "../URLCardTemplate/URLCardTemplate";
import { URLParagraph } from "./URLCard.styles";

interface Props {
  url: string;
  nickname: string;
}

const URLCard = ({ url, nickname }: Props) => {
  const { deleteURL } = usePullRequestURL();

  const handleDeleteURL = () => {
    if (window.confirm("해당 url을 삭제하시겠습니까?")) {
      deleteURL(url);
    }
  };

  return (
    <URLCardTemplate>
      {{
        title: nickname,
        control: (
          <>
            <IconButton size="2rem" onClick={() => {}}>
              <ModifyIcon />
            </IconButton>
            <IconButton onClick={handleDeleteURL} size="2.25rem">
              <DeleteIcon />
            </IconButton>
          </>
        ),
        content: <URLParagraph>{url}</URLParagraph>,
      }}
    </URLCardTemplate>
  );
};

export default URLCard;
