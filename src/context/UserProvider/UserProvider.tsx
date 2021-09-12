import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  requestUpdateUserProfile,
  requestUserProfile,
} from "../../API/firebaseAPI";
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
  modifyProfile: (profile: Partial<Profile>) => Promise<void>;
}

export const Context = createContext<ContextValue | null>(null);

const UserProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const isLogin = useMemo(() => (userProfile ? true : false), [userProfile]);

  const login = async (userProfile: Profile) => {
    setUserProfile(userProfile);

    if (userProfile.githubToken) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.GITHUB_TOKEN,
        userProfile.githubToken
      );
    }
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY.UID);
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

  const modifyProfile = async (profile: Partial<Profile>) => {
    if (!userProfile) {
      return;
    }

    return await requestUpdateUserProfile({
      ...userProfile,
      ...profile,
    });
  };

  const contextValue = useMemo<ContextValue>(
    () => ({
      userProfile,
      isLogin,
      login,
      logout,
      refetch,
      modifyProfile,
    }),
    [userProfile, isLogin]
  );

  useEffect(() => {
    refetch();
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserProvider;
