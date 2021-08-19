import React from "react";
import { requestUserInfo, signInWithGithub } from "../../API/firebaseAPI";
import useUser from "../../context/user/useUser";
import { UserInfo } from "../../util/types";
import Avatar from "../@common/Avatar/Avatar";
import { Arrow, AvatarButton, LoginButton } from "./Navigation.styles";

const Navigation = () => {
  const user = useUser();

  const handleSignIn = async () => {
    await signInWithGithub();
    const userInfo: unknown = await requestUserInfo();

    user.login(userInfo as UserInfo);
  };

  return (
    <div>
      {user.userInfo ? (
        <AvatarButton>
          <Avatar imgURL={user.userInfo.profile.avatarURL} />
          <Arrow />
        </AvatarButton>
      ) : (
        <LoginButton onClick={handleSignIn}>로그인</LoginButton>
      )}
    </div>
  );
};

export default Navigation;
