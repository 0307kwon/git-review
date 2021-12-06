import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ReactComponent as HelpIcon } from "../../asset/icon/help.svg";
import { ReactComponent as PlusIcon } from "../../asset/icon/plus.svg";
import { ReactComponent as PullRequestIcon } from "../../asset/icon/pullRequest.svg";
import FlexContainer from "../../component/@common/FlexContainer/FlexContainer";
import IconButton from "../../component/@common/IconButton/IconButton";
import Input from "../../component/Input/Input";
import URLCard from "../../component/URLCard/URLCard";
import URLCardTemplate from "../../component/URLCardTemplate/URLCardTemplate";
import { PR_URL } from "../../constant/validation";
import useModal from "../../context/modalProvider/useModal";
import usePullRequestURLs from "../../context/PullRequestURLProvider/usePullRequestURLs";
import useUserInfo from "../../hook/userInfo/useUserInfo";
import { PrUrl } from "../../util/types";
import PullRequestHelpModal from "./PullRequestHelpModal/PullRequestHelpModal";
import {
  AvatarContainer,
  Form,
  SettingAvatar,
  SettingButton,
  SettingContainer,
  SubTitleContainer,
} from "./Setting.styles";
import TokenSettingModal from "./TokenSettingModal/TokenSettingModal";

const Setting = () => {
  const { pullRequestURLs, addURL, refetchURLs } = usePullRequestURLs();
  const user = useUserInfo();
  const modal = useModal();
  const [pullRequestFormData, setPullRequestFormData] = useState<
    Pick<PrUrl, "nickname" | "url">
  >({
    nickname: "",
    url: "",
  });

  useEffect(() => {
    refetchURLs();
  }, []);

  if (!user.data || !pullRequestURLs) {
    return null;
  }

  const handleChangeInput = (key: keyof PrUrl) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPullRequestFormData({
      ...pullRequestFormData,
      [key]: event.target.value,
    });
  };

  const handleAddPullRequestURL = async (event: FormEvent) => {
    event.preventDefault();

    const { nickname, url } = pullRequestFormData;

    const isAlreadyExist = pullRequestURLs.some(
      (pullRequestURL) => pullRequestURL.url === url
    );

    if (isAlreadyExist) {
      alert("이미 존재하는 url입니다.");
      return;
    }

    await addURL(nickname, url);
    await refetchURLs();

    setPullRequestFormData({
      nickname: "",
      url: "",
    });
  };

  return (
    <SettingContainer>
      <AvatarContainer>
        <SettingAvatar imgURL={user.data.avatarURL} />
        <p>{user.data.nickname}</p>
      </AvatarContainer>
      <SubTitleContainer>
        <FlexContainer gap="0.5rem" alignItems="center">
          <PullRequestIcon />
          <h2>pull request url</h2>
          <IconButton
            size="24px"
            onClick={() => {
              modal.openModal(<PullRequestHelpModal />);
            }}
          >
            <HelpIcon />
          </IconButton>
        </FlexContainer>
        <FlexContainer
          alignItems="center"
          gap="1rem"
          justifyContent="space-between"
        >
          <p>PR 내용 중 리뷰어의 코멘트만 코드 리뷰로 저장됩니다</p>
          <SettingButton onClick={() => modal.openModal(<TokenSettingModal />)}>
            token 등록
          </SettingButton>
        </FlexContainer>
      </SubTitleContainer>
      <FlexContainer flexDirection="column" gap="0.75rem" alignItems="center">
        <Form onSubmit={handleAddPullRequestURL}>
          <URLCardTemplate>
            {{
              title: (
                <Input
                  value={pullRequestFormData.nickname}
                  onChange={handleChangeInput("nickname")}
                  maxLength={PR_URL.MAX_NICKNAME_LENGTH}
                  required
                  placeholder={`PR 별칭(${PR_URL.MAX_NICKNAME_LENGTH}자 이내)`}
                />
              ),
              content: (
                <Input
                  value={pullRequestFormData.url}
                  onChange={handleChangeInput("url")}
                  width="100%"
                  required
                  placeholder="PR URL을 복사-붙여넣기 해주세요"
                />
              ),
            }}
          </URLCardTemplate>
          <IconButton size="3rem">
            <PlusIcon />
          </IconButton>
        </Form>
        {pullRequestURLs.map((pullRequestURL) => {
          return (
            <URLCard key={pullRequestURL.url} pullRequestURL={pullRequestURL} />
          );
        })}
      </FlexContainer>
    </SettingContainer>
  );
};

export default Setting;
