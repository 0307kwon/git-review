import React, { ChangeEvent, FormEvent, useState } from "react";
import { PULL_REQUEST_URL } from "../../constant/validation";
import usePullRequestURL from "../../hook/usePullRequestURL";
import { ReactComponent as DeleteIcon } from "../../icon/cancel.svg";
import { ReactComponent as ModifyIcon } from "../../icon/modify.svg";
import { Form } from "../../page/Setting/Setting.styles";
import { PullRequestURL } from "../../util/types";
import Button from "../@common/Button/Button";
import IconButton from "../@common/IconButton/IconButton";
import Input from "../Input/Input";
import URLCardTemplate from "../URLCardTemplate/URLCardTemplate";
import { URLCardForm, URLParagraph } from "./URLCard.styles";

interface Props {
  url: string;
  nickname: string;
}

const URLCard = ({ url, nickname }: Props) => {
  const { modifyURLNickname, deleteURL } = usePullRequestURL();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [pullRequestFormData, setPullRequestFormData] = useState<
    Omit<PullRequestURL, "modificationTime">
  >({
    nickname,
    url,
  });

  const handleDeleteURL = () => {
    if (window.confirm("해당 url을 삭제하시겠습니까?")) {
      deleteURL(url);
    }
  };

  const handleModifyURL = async (event: FormEvent) => {
    event.preventDefault();

    await modifyURLNickname(
      pullRequestFormData.nickname,
      pullRequestFormData.url
    );
    setIsModifyMode(false);
  };

  const handleChangeInput = (key: keyof PullRequestURL) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPullRequestFormData({
      ...pullRequestFormData,
      [key]: event.target.value,
    });
  };

  return (
    <URLCardForm onSubmit={handleModifyURL}>
      <URLCardTemplate>
        {{
          title: (
            <>
              {isModifyMode ? (
                <Input
                  value={pullRequestFormData.nickname}
                  onChange={handleChangeInput("nickname")}
                  maxLength={PULL_REQUEST_URL.MAX_NICKNAME_LENGTH}
                  required
                  placeholder="PR 별칭"
                />
              ) : (
                nickname
              )}
            </>
          ),
          control: (
            <>
              {isModifyMode ? (
                <>
                  <Button>수정</Button>
                  <Button type="button" onClick={() => setIsModifyMode(false)}>
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <IconButton
                    type="button"
                    onClick={() => {
                      setIsModifyMode(true);
                    }}
                    size="2rem"
                  >
                    <ModifyIcon />
                  </IconButton>
                  <IconButton
                    type="button"
                    onClick={handleDeleteURL}
                    size="2.25rem"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </>
          ),
          content: <URLParagraph>{url}</URLParagraph>,
        }}
      </URLCardTemplate>
    </URLCardForm>
  );
};

export default URLCard;
