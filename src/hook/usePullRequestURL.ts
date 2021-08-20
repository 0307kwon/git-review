import { requestUpdatePullRequestURLs } from "../API/firebaseAPI";
import useUser from "../context/user/useUser";
import { myFirebase } from "../util/firebase";
import { PullRequestURL } from "../util/types";

const usePullRequestURL = () => {
  const user = useUser();

  const deleteURL = async (url: string) => {
    const updatingURLs: { [url: string]: PullRequestURL } = {};

    user.pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    delete updatingURLs[url];

    await requestUpdatePullRequestURLs(updatingURLs);

    await user.refetch();
  };

  const addURL = async (nickname: string, url: string) => {
    const isAlreadyExist = user.pullRequestURLs.some(
      (pullRequestURL) => pullRequestURL.url === url
    );

    if (isAlreadyExist) {
      throw new Error("이미 존재하는 url입니다.");
    }

    const updatingURLs: { [url: string]: PullRequestURL } = {};

    user.pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    await requestUpdatePullRequestURLs({
      ...updatingURLs,
      [url]: {
        url,
        nickname,
        modificationTime: myFirebase.firestore.Timestamp.now(),
      },
    });
    await user.refetch();
  };

  const modifyURLNickname = async (nickname: string, url: string) => {
    const updatingURLs: { [url: string]: PullRequestURL } = {};

    user.pullRequestURLs.forEach((pullRequestURL) => {
      updatingURLs[pullRequestURL.url] = pullRequestURL;
    });

    await requestUpdatePullRequestURLs({
      ...updatingURLs,
      [url]: {
        url,
        nickname,
        modificationTime: myFirebase.firestore.Timestamp.now(),
      },
    });
    await user.refetch();
  };

  return {
    deleteURL,
    addURL,
    modifyURLNickname,
  };
};

export default usePullRequestURL;
