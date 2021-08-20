import React, { ChangeEvent, FormEvent, useState } from "react";
import FlexContainer from "../../component/@common/FlexContainer/FlexContainer";
import IconButton from "../../component/@common/IconButton/IconButton";
import Input from "../../component/Input/Input";
import URLCard from "../../component/URLCard/URLCard";
import URLCardTemplate from "../../component/URLCardTemplate/URLCardTemplate";
import { PULL_REQUEST_URL } from "../../constant/validation";
import useUser from "../../context/user/useUser";
import usePullRequestURL from "../../hook/usePullRequestURL";
import { ReactComponent as PlusIcon } from "../../icon/plus.svg";
import { ReactComponent as PullRequestIcon } from "../../icon/pullRequest.svg";
import {
  AvatarContainer,
  Form,
  SettingAvatar,
  SettingContainer,
  SubTitleContainer,
} from "./Setting.styles";

interface PullRequestURL {
  nickname: string;
  url: string;
}

const Setting = () => {
  const { addURL } = usePullRequestURL();
  const user = useUser();
  const [pullRequestFormData, setPullRequestFormData] = useState<
    Omit<PullRequestURL, "modificationTime">
  >({
    nickname: "",
    url: "",
  });

  const { userProfile, pullRequestURLs } = user;

  if (!userProfile || !pullRequestURLs) {
    return null;
  }

  const handleChangeInput = (key: keyof PullRequestURL) => (
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

    await addURL(nickname, url);

    setPullRequestFormData({
      nickname: "",
      url: "",
    });
  };

  return (
    <SettingContainer>
      <AvatarContainer>
        <SettingAvatar imgURL={userProfile.avatarURL} />
        <p>{userProfile.nickname}</p>
      </AvatarContainer>
      <SubTitleContainer>
        <PullRequestIcon />
        <h2>pull request url</h2>
      </SubTitleContainer>
      <FlexContainer flexDirection="column" gap="0.75rem" alignItems="center">
        <Form onSubmit={handleAddPullRequestURL}>
          <URLCardTemplate>
            {{
              title: (
                <Input
                  value={pullRequestFormData.nickname}
                  onChange={handleChangeInput("nickname")}
                  maxLength={PULL_REQUEST_URL.MAX_NICKNAME_LENGTH}
                  required
                  placeholder="PR 별칭"
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
        {pullRequestURLs.map(({ nickname, url }) => {
          return <URLCard nickname={nickname} url={url} key={url} />;
        })}
      </FlexContainer>
    </SettingContainer>
  );
};

export default Setting;
