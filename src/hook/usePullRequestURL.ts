import React from "react";
import {
  requestDeletePullRequestURL,
  requestUpdatePullRequestURLs,
} from "../API/firebaseAPI";
import useUser from "../context/user/useUser";

const usePullRequestURL = () => {
  const user = useUser();

  const deleteURL = async (url: string) => {
    await requestDeletePullRequestURL(url);
    user.refetch();
  };

  const addURL = async (nickname: string, url: string) => {
    const isAlreadyExist = Object.keys(user.pullRequestURLs).some(
      (pullRequestURL) => pullRequestURL === url
    );

    if (isAlreadyExist) {
      alert("이미 존재하는 url입니다");

      return;
    }

    await requestUpdatePullRequestURLs({
      [url]: nickname,
    });
    user.refetch();
  };

  return {
    deleteURL,
    addURL,
  };
};

export default usePullRequestURL;
