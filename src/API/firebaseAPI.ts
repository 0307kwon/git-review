import { firestoreDB, myFirebase } from "../util/firebase";
import { PullRequestURL } from "../util/types";

interface GithubProfile {
  name: string;
  avatar_url: string;
}

const provider = new myFirebase.auth.GithubAuthProvider();

const signUpWithGithub = (
  additionalUserInfo: myFirebase.auth.AdditionalUserInfo,
  uid: string
) => {
  const profile = additionalUserInfo.profile;

  if (!profile) return;

  const { name, avatar_url } = profile as GithubProfile;

  return firestoreDB(uid)["user/profile"].set({
    nickname: name,
    avatarURL: avatar_url,
  });
};

export const signInWithGithub = async () => {
  const { user, additionalUserInfo } = await myFirebase
    .auth()
    .signInWithPopup(provider);

  const uid = user?.uid;

  if (!uid) return;

  localStorage.setItem("uid", uid);

  if (additionalUserInfo?.isNewUser) {
    await signUpWithGithub(additionalUserInfo, uid);
  }
};

export const requestUserProfile = async () => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  const result = await firestoreDB(uid)["user/profile"].get();

  const userProfile = result.data();

  return userProfile;
};

export const requestUserPullRequestURLs = async () => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  const result = await firestoreDB(uid)["user/pullRequestURLs"].get();

  const pullRequestURLs = result.data();

  return pullRequestURLs;
};

export const requestUpdateUserProfile = async (
  nickname: string,
  avatarURL: string
) => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  return firestoreDB(uid)["user/profile"].update({
    nickname,
    avatarURL,
  });
};

export const requestUpdatePullRequestURLs = (pullRequestURLs: {
  [url: string]: PullRequestURL;
}) => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  return firestoreDB(uid)["user/pullRequestURLs"].set(pullRequestURLs);
};
