import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  requestUpdatePullRequestURLs,
  requestUserPullRequestURLs,
} from "../../API/firebaseAPI";
import { myFirebase } from "../../util/firebase";
import { PullRequestURL, RequiredOnly } from "../../util/types";
import useUser from "../UserProvider/useUser";

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  pullRequestURLs: PullRequestURL[];
  deleteURL: (url: string) => Promise<void>;
  addURL: (nickname: string, url: string) => Promise<void>;
  modifyURL: (
    pullRequestURL: RequiredOnly<PullRequestURL, "url">
  ) => Promise<void>;
  refetchURLs: () => Promise<void>;
}

export const Context = createContext<ContextValue | null>(null);

const PullRequestURLProvider = ({ children }: Props) => {
  const [pullRequestURLs, setPullRequestURLs] = useState<PullRequestURL[]>([]);
  const user = useUser();

  const deleteURL = async (url: string) => {
    const updatingURLs: { [url: string]: PullRequestURL } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    delete updatingURLs[url];

    await requestUpdatePullRequestURLs(updatingURLs);
  };

  const addURL = async (nickname: string, url: string) => {
    const isAlreadyExist = pullRequestURLs.some(
      (pullRequestURL) => pullRequestURL.url === url
    );

    if (isAlreadyExist) {
      throw new Error("이미 존재하는 url입니다.");
    }

    const updatingURLs: { [url: string]: PullRequestURL } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    await requestUpdatePullRequestURLs({
      ...updatingURLs,
      [url]: {
        url,
        nickname,
        modificationTime: myFirebase.firestore.Timestamp.now(),
        isFailedURL: false,
      },
    });
  };

  const modifyURL = async (
    pullRequestURL: RequiredOnly<PullRequestURL, "url">
  ) => {
    const updatingURLs: { [url: string]: PullRequestURL } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    const originalURL = pullRequestURLs.find(
      ({ url }) => url === pullRequestURL.url
    );

    if (originalURL) {
      await requestUpdatePullRequestURLs({
        ...updatingURLs,
        [pullRequestURL.url]: {
          ...originalURL,
          modificationTime: myFirebase.firestore.Timestamp.now(),
          ...pullRequestURL,
        },
      });
    }
  };

  const refetchURLs = async () => {
    const pullRequestURLs = await requestUserPullRequestURLs();

    if (pullRequestURLs) {
      const urls = Object.values(pullRequestURLs).sort(
        (a, b) => b.modificationTime.seconds - a.modificationTime.seconds
      );

      setPullRequestURLs(urls);
    }
  };

  useEffect(() => {
    if (!user.isLogin) {
      setPullRequestURLs([]);
      return;
    }

    refetchURLs();
  }, [user.isLogin]);

  // const contextValue = useMemo(
  //   () => ({
  //     pullRequestURLs,
  //     modifyURL,
  //     addURL,
  //     deleteURL,
  //     refetchURLs,
  //   }),
  //   [pullRequestURLs]
  // );

  return (
    <Context.Provider
      value={{
        pullRequestURLs,
        modifyURL,
        addURL,
        deleteURL,
        refetchURLs,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default PullRequestURLProvider;