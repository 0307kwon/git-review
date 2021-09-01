import { useEffect, useRef, useState } from "react";
import {
  requestUpdatePullRequestURLs,
  requestUserPullRequestURLs,
} from "../../API/firebaseAPI";
import { myFirebase } from "../../util/firebase";
import { PullRequestURL, RequiredOnly } from "../../util/types";
import useUser from "./useUser";

const usePullRequestURLs = () => {
  const [pullRequestURLs, setPullRequestURLs] = useState<PullRequestURL[]>([]);
  const isLoading = useRef(true);
  const { isLogin } = useUser();

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
    isLoading.current = true;
    const prURLs = await requestUserPullRequestURLs();

    if (prURLs) {
      const freshURLs = Object.values(prURLs).sort(
        (a, b) => b.modificationTime.seconds - a.modificationTime.seconds
      );

      setPullRequestURLs(freshURLs);
      isLoading.current = false;
    }
  };

  useEffect(() => {
    if (!isLogin) {
      isLoading.current = false;
      return;
    }

    refetchURLs();
  }, [isLogin]);

  return {
    pullRequestURLs,
    isLoading: isLoading.current,
    modifyURL,
    addURL,
    deleteURL,
    refetchURLs,
  };
};

export default usePullRequestURLs;
