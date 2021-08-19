import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";
import { requestUserInfo } from "../../API/firebaseAPI";
import { UserInfo } from "../../util/types";

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  userInfo: UserInfo | null;
  isLogin: boolean;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
}

export const Context = createContext<ContextValue | null>(null);

const UserProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isLogin = useMemo(() => (userInfo ? true : false), [userInfo]);

  const login = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
  };

  const logout = () => {
    setUserInfo(null);
  };

  const contextValue = useMemo<ContextValue>(
    () => ({ userInfo, isLogin, login, logout }),
    [userInfo, isLogin]
  );

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid) {
      requestUserInfo().then((userInfo) => {
        login(userInfo as UserInfo);
      });
    }
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserProvider;