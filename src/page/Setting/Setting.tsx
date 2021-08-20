import React, { ChangeEvent, FormEvent } from "react";
import useUser from "../../context/user/useUser";
import {
  AvatarContainer,
  Form,
  SettingAvatar,
  SettingContainer,
  SubTitleContainer,
} from "./Setting.styles";
import { ReactComponent as PullRequestIcon } from "../../icon/pullRequest.svg";
import { ReactComponent as PlusIcon } from "../../icon/plus.svg";
import URLCard from "../../component/URLCard/URLCard";
import FlexContainer from "../../component/@common/FlexContainer/FlexContainer";
import IconButton from "../../component/@common/IconButton/IconButton";
import URLCardTemplate from "../../component/URLCardTemplate/URLCardTemplate";
import Input from "../../component/Input/Input";
import { useState } from "react";
import { requestUpdatePullRequestURLs } from "../../API/firebaseAPI";
import usePullRequestURL from "../../hook/usePullRequestURL";

interface PullRequestURL {
  nickname: string;
  url: string;
}

const Setting = () => {
  const { addURL } = usePullRequestURL();
  const user = useUser();
  const [
    pullRequestFormData,
    setPullRequestFormData,
  ] = useState<PullRequestURL>({
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
    //TODO: 중복 url 검사를 해야함

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
                  maxLength={10}
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
          return <URLCard nickname={nickname} url={url} />;
        })}
      </FlexContainer>
    </SettingContainer>
  );
};

export default Setting;
