import React, { createContext, useEffect, useState } from "react";
import { updatePrUrl, getUserPrUrlList } from "../../API/firebaseAPI";
import useUserInfo from "../../hook/userInfo/useUserInfo";
import { myFirebase } from "../../util/firebase";
import { PrUrl, RequiredOnly } from "../../util/types";

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  pullRequestURLs: PrUrl[];
  isLoading: boolean;
  deleteURL: (url: string) => Promise<void>;
  addURL: (nickname: string, url: string) => Promise<void>;
  modifyURLs: (urls: RequiredOnly<PrUrl, "url">[]) => Promise<void>;
  resetFailedURLs: () => Promise<void>;
  refetchURLs: () => Promise<void>;
}

export const Context = createContext<ContextValue | null>(null);

const PullRequestURLProvider = ({ children }: Props) => {
  const [pullRequestURLs, setPullRequestURLs] = useState<PrUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserInfo();

  const deleteURL = async (url: string) => {
    const updatingURLs: { [url: string]: PrUrl } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    delete updatingURLs[url];

    await updatePrUrl(updatingURLs);
  };

  const addURL = async (nickname: string, url: string) => {
    const updatingURLs: { [url: string]: PrUrl } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    await updatePrUrl({
      ...updatingURLs,
      [url]: {
        url,
        nickname,
        modificationTime: myFirebase.firestore.Timestamp.now(),
        isFailedURL: false,
      },
    });
  };

  const modifyURLs = async (urls: RequiredOnly<PrUrl, "url">[]) => {
    const updatingURLsInFirebase: { [url: string]: PrUrl } = {};

    pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLsInFirebase[pullRequestURL.url] = pullRequestURL;
    });

    urls.forEach((prURL) => {
      updatingURLsInFirebase[prURL.url] = {
        ...updatingURLsInFirebase[prURL.url],
        ...prURL,
      };
    });

    await updatePrUrl(updatingURLsInFirebase);
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
    const pullRequestURLs = await getUserPrUrlList();

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
    if (!user.data) {
      setPullRequestURLs([]);
      setIsLoading(true);
      return;
    }

    refetchURLs();
  }, [user.data]);

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
