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
import { PullRequestURL } from "../../util/types";
import { requestUpdatePullRequestURLs } from "../../API/firebaseAPI";

const Setting = () => {
  const user = useUser();
  const [
    pullRequestFormData,
    setPullRequestFormData,
  ] = useState<PullRequestURL>({
    nickname: "",
    url: "",
  });

  if (!user.userInfo) {
    return null;
  }

  const { profile, pullRequestURLs } = user.userInfo;

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

    await requestUpdatePullRequestURLs([
      pullRequestFormData,
      ...pullRequestURLs,
    ]);
    user.refetch();
    setPullRequestFormData({
      nickname: "",
      url: "",
    });
  };

  return (
    <SettingContainer>
      <AvatarContainer>
        <SettingAvatar imgURL={profile.avatarURL} />
        <p>{profile.nickname}</p>
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
        {pullRequestURLs.map((pullRequestURL) => (
          <URLCard pullRequestURL={pullRequestURL} />
        ))}
      </FlexContainer>
    </SettingContainer>
  );
};

export default Setting;
