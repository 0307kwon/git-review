import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { requestUserProfile, signInWithGithub } from "../../API/firebaseAPI";
import useUser from "../../context/UserProvider/useUser";
import { ReactComponent as LogoutIcon } from "../../asset/icon/logout.svg";
import { ReactComponent as SettingIcon } from "../../asset/icon/setting.svg";
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
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    if (!dropdownRef?.current) return;

    const targetElement: Element = dropdownRef.current as any;

    document.addEventListener("mousedown", (event: MouseEvent) => {
      if (!event.target) return;

      if (!targetElement.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    });
  }, [dropdownRef.current]);

  return (
    <div>
      {userProfile ? (
        <AvatarContainer ref={dropdownRef}>
          <AvatarButton onClick={handleToggleDropdown}>
            <Avatar imgURL={userProfile.avatarURL} />
            <Arrow />
          </AvatarButton>

          <AvatarDropdown isDropdownVisible={isDropdownVisible}>
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
        </AvatarContainer>
      ) : (
        <LoginButton onClick={handleSignIn}>로그인</LoginButton>
      )}
    </div>
  );
};

export default Navigation;
