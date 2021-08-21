import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { requestUserProfile, signInWithGithub } from "../../API/firebaseAPI";
import useUser from "../../context/UserProvider/useUser";
import { ReactComponent as LogoutIcon } from "../../icon/logout.svg";
import { ReactComponent as SettingIcon } from "../../icon/setting.svg";
import Avatar from "../@common/Avatar/Avatar";
import {
  Arrow,
  AvatarButton,
  AvatarContainer,
  AvatarDropdown,
  LoginButton,
} from "./Navigation.styles";

const Navigation = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const history = useHistory();
  const user = useUser();

  const handleSignIn = async () => {
    const profile = await signInWithGithub();

    if (profile) {
      user.login(profile);
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      user.logout();
      history.push("/");
    }
  };

  const { userProfile } = user;

  return (
    <div>
      {userProfile ? (
        <AvatarContainer>
          <AvatarButton onClick={handleToggleDropdown}>
            <Avatar imgURL={userProfile.avatarURL} />
            <Arrow />
          </AvatarButton>
          {isDropdownVisible && (
            <AvatarDropdown>
              <div className="welcome">{`👋 ${userProfile.nickname}님 환영합니다.`}</div>
              <Link onClick={handleToggleDropdown} to="/setting">
                <SettingIcon />
                설정
              </Link>
              <button onClick={handleLogout} className="red">
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
