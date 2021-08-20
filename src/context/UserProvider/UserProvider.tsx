import React, { createContext, useEffect, useMemo, useState } from "react";
import { requestUserProfile } from "../../API/firebaseAPI";
import { LOCAL_STORAGE_KEY } from "../../constant/common";
import { Profile } from "../../util/types";

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  userProfile: Profile | null;
  isLogin: boolean;
  login: (userProfile: Profile) => void;
  logout: () => void;
  refetch: () => void;
}

export const Context = createContext<ContextValue | null>(null);

const UserProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const isLogin = useMemo(() => (userProfile ? true : false), [userProfile]);

  const login = async (userProfile: Profile) => {
    setUserProfile(userProfile);
  };

  const logout = () => {
    setUserProfile(null);
  };

  const refetch = async () => {
    const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

    if (!uid) {
      return;
    }

    const profile = await requestUserProfile();

    if (profile) {
      login(profile);
    }
  };

  const contextValue = useMemo<ContextValue>(
    () => ({ userProfile, isLogin, login, logout, refetch }),
    [userProfile, isLogin]
  );

  useEffect(() => {
    refetch();
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserProvider;
