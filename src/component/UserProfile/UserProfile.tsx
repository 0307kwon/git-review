import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "../../asset/icon/logout.svg";
import { ReactComponent as RefreshIcon } from "../../asset/icon/refresh.svg";
import { ReactComponent as SettingIcon } from "../../asset/icon/setting.svg";
import { PALETTE } from "../../constant/palette";
import useCodeReviews from "../../context/CodeReviewProvider/useCodeReviews";
import useFocusOut from "../../hook/useFocusOut";
import useUserInfo from "../../hook/userInfo/useUserInfo";
import Avatar from "../@common/Avatar/Avatar";
import {
  Arrow,
  AvatarButton,
  AvatarContainer,
  AvatarDropdown,
  LoginButton,
} from "./UserProfile.styles";

const UserProfile = () => {
  const user = useUserInfo();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { forcedSyncAllCodeReviewInIDB } = useCodeReviews();
  const history = useHistory();
  const dropdownRef = useFocusOut<HTMLDivElement>(() => {
    setIsDropdownVisible(false);
  });

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSyncCodeReview = () => {
    if (
      window.confirm(
        "로컬 저장소의 오래된 정보는 지워지고 최신 정보만을 가져옵니다. 계속하시겠습니까?"
      )
    ) {
      forcedSyncAllCodeReviewInIDB();
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  const handleSignIn = () => {
    user.login();
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      user.logout();
      history.push("/");
    }
  };

  return (
    <div>
      {user.data ? (
        <AvatarContainer ref={dropdownRef}>
          <AvatarButton onClick={handleToggleDropdown}>
            <Avatar imgURL={user.data.avatarURL} />
            <Arrow fill={PALETTE.WHITE} />
          </AvatarButton>

          <AvatarDropdown isDropdownVisible={isDropdownVisible}>
            <div className="welcome">{`👋 ${user.data.nickname}님 환영합니다.`}</div>
            <Link onClick={handleToggleDropdown} to="/setting">
              <SettingIcon />
              설정
            </Link>
            <button onClick={handleSyncCodeReview}>
              <RefreshIcon />
              코드 리뷰 강제 동기화
            </button>
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

export default UserProfile;
