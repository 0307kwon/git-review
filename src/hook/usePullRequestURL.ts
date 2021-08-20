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

    user.refetch();
  };

  const addURL = async (nickname: string, url: string) => {
    const isAlreadyExist = user.pullRequestURLs.some(
      (pullRequestURL) => pullRequestURL.url === url
    );

    if (isAlreadyExist) {
      alert("이미 존재하는 url입니다");

      return;
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
    user.refetch();
  };

  return {
    deleteURL,
    addURL,
  };
};

export default usePullRequestURL;
