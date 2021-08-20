import React, { useState } from "react";
import { requestUserInfo, signInWithGithub } from "../../API/firebaseAPI";
import useUser from "../../context/user/useUser";
import { UserInfo } from "../../util/types";
import Avatar from "../@common/Avatar/Avatar";
import { ReactComponent as SettingIcon } from "../../icon/setting.svg";
import { ReactComponent as LogoutIcon } from "../../icon/logout.svg";
import {
  Arrow,
  AvatarButton,
  AvatarContainer,
  AvatarDropdown,
  LoginButton,
} from "./Navigation.styles";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const user = useUser();

  const handleSignIn = async () => {
    await signInWithGithub();
    const userInfo: unknown = await requestUserInfo();

    user.login(userInfo as UserInfo);
  };

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      {user.userInfo ? (
        <AvatarContainer>
          <AvatarButton onClick={handleToggleDropdown}>
            <Avatar imgURL={user.userInfo.profile.avatarURL} />
            <Arrow />
          </AvatarButton>
          {isDropdownVisible && (
            <AvatarDropdown>
              <div className="welcome">{`👋 ${user.userInfo.profile.nickname}님 환영합니다.`}</div>
              <Link onClick={handleToggleDropdown} to="/setting">
                <SettingIcon />
                설정
              </Link>
              <button className="red">
                <LogoutIcon />
                로그아웃
              </button>
            </AvatarDropdown>
          )}
        </AvatarContainer>
      ) : (
        <LoginButton onClick={handleSignIn}>로그인</LoginButton>
      )}
    </div>
  );
};

export default Navigation;
