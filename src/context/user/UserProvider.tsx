import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  requestUserProfile,
  requestUserPullRequestURLs,
} from "../../API/firebaseAPI";
import { Profile, PullRequestURL } from "../../util/types";

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  userProfile: Profile | null;
  pullRequestURLs: PullRequestURL[];
  isLogin: boolean;
  login: (userProfile: Profile) => void;
  logout: () => void;
  refetch: () => void;
}

export const Context = createContext<ContextValue | null>(null);

const UserProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [pullRequestURLs, setPullRequestURLs] = useState<PullRequestURL[]>([]);
  const isLogin = useMemo(() => (userProfile ? true : false), [userProfile]);

  const login = async (userProfile: Profile) => {
    setUserProfile(userProfile);

    const result = await requestUserPullRequestURLs();

    if (result) {
      const urls = Object.values(result).sort(
        (a, b) => b.modificationTime.seconds - a.modificationTime.seconds
      );

      setPullRequestURLs(urls);
    }
  };

  const logout = () => {
    setUserProfile(null);
    setPullRequestURLs([]);
  };

  const refetch = async () => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      return;
    }

    const profile = await requestUserProfile();

    if (profile) {
      login(profile);
    }
  };

  const contextValue = useMemo<ContextValue>(
    () => ({ userProfile, pullRequestURLs, isLogin, login, logout, refetch }),
    [userProfile, pullRequestURLs, isLogin]
  );

  useEffect(() => {
    refetch();
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserProvider;
