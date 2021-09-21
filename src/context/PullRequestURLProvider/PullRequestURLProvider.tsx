import React, { createContext, useEffect, useState } from "react";
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
  isLoading: boolean;
  deleteURL: (url: string) => Promise<void>;
  addURL: (nickname: string, url: string) => Promise<void>;
  modifyURLs: (urls: RequiredOnly<PullRequestURL, "url">[]) => Promise<void>;
  resetFailedURLs: () => Promise<void>;
  refetchURLs: () => Promise<void>;
}

export const Context = createContext<ContextValue | null>(null);

const PullRequestURLProvider = ({ children }: Props) => {
  const [pullRequestURLs, setPullRequestURLs] = useState<PullRequestURL[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const modifyURLs = async (urls: RequiredOnly<PullRequestURL, "url">[]) => {
    const updatingURLsInFirebase: { [url: string]: PullRequestURL } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLsInFirebase[pullRequestURL.url] = pullRequestURL;
    });

    urls.forEach((prURL) => {
      updatingURLsInFirebase[prURL.url] = {
        ...updatingURLsInFirebase[prURL.url],
        ...prURL,
      };
    });

    await requestUpdatePullRequestURLs(updatingURLsInFirebase);
  };

  const resetFailedURLs = async () => {
    await modifyURLs(
      pullRequestURLs.map((pullRequestURL) => ({
        url: pullRequestURL.url,
        isFailedURL: false,
      }))
    );
  };

  const refetchURLs = async () => {
    const pullRequestURLs = await requestUserPullRequestURLs();

    if (pullRequestURLs) {
      const urls = Object.values(pullRequestURLs).sort(
        (a, b) => b.modificationTime.seconds - a.modificationTime.seconds
      );

      setPullRequestURLs(urls);
      setIsLoading(false);

      return;
    }

    setPullRequestURLs([]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user.isLogin) {
      setPullRequestURLs([]);
      setIsLoading(true);
      return;
    }

    refetchURLs();
  }, [user.isLogin]);

  return (
    <Context.Provider
      value={{
        pullRequestURLs,
        isLoading,
        modifyURLs,
        resetFailedURLs,
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
