import React, { ChangeEvent, FormEvent, useState } from "react";
import { PULL_REQUEST_URL } from "../../constant/validation";
import { ReactComponent as DeleteIcon } from "../../asset/icon/cancel.svg";
import { ReactComponent as ModifyIcon } from "../../asset/icon/modify.svg";
import { PullRequestURL } from "../../util/types";
import Button from "../@common/Button/Button";
import IconButton from "../@common/IconButton/IconButton";
import Input from "../Input/Input";
import URLCardTemplate from "../URLCardTemplate/URLCardTemplate";
import { URLCardForm, URLParagraph } from "./URLCard.styles";
import { Anchor } from "../@common/Anchor/Anchor";
import usePullRequestURLs from "../../context/PullRequestURLProvider/usePullRequestURLs";
import { ModifyCodeReviewIDB } from "../../API/indexedDB";
import useSnackbar from "../../context/snackbar/useSnackbar";

interface Props {
  pullRequestURL: PullRequestURL;
}

const URLCard = ({ pullRequestURL }: Props) => {
  const snackbar = useSnackbar();
  const { modifyURL, deleteURL, refetchURLs } = usePullRequestURLs();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [pullRequestFormData, setPullRequestFormData] = useState<
    Pick<PullRequestURL, "nickname" | "url">
  >({
    nickname: pullRequestURL.nickname,
    url: pullRequestURL.url,
  });

  const handleDeleteURL = async () => {
    if (window.confirm("해당 url을 삭제하시겠습니까?")) {
      await deleteURL(pullRequestURL.url);
      await refetchURLs();
    }
  };

  const handleModifyURL = async (event: FormEvent) => {
    event.preventDefault();

    snackbar.addSnackbar(
      "progress",
      "로컬 저장소에 새로운 별칭을 동기화 중입니다."
    );
    await modifyURL({
      nickname: pullRequestFormData.nickname,
      url: pullRequestFormData.url,
      isFailedURL: false,
    });
    await refetchURLs();

    await ModifyCodeReviewIDB(pullRequestFormData.url, {
      urlNickname: pullRequestFormData.nickname,
    });
    setIsModifyMode(false);
    snackbar.addSnackbar("success", "동기화 성공");
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
      <URLCardTemplate isFailedURL={pullRequestURL.isFailedURL}>
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
                <>
                  <span>{pullRequestURL.nickname}</span>
                  {pullRequestURL.isFailedURL && (
                    <span>(PR을 가져오는데 실패했습니다.)</span>
                  )}
                </>
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
          content: (
            <URLParagraph>
              <Anchor target="blank" href={pullRequestURL.url}>
                {pullRequestURL.url}
              </Anchor>
            </URLParagraph>
          ),
        }}
      </URLCardTemplate>
    </URLCardForm>
  );
};

export default URLCard;
