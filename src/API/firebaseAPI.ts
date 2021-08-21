import { LOCAL_STORAGE_KEY } from "../constant/common";
import { firestoreDB, myFirebase } from "../util/firebase";
import { Profile, PullRequestURL } from "../util/types";

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
  const nickname = additionalUserInfo.username;

  if (profile && nickname) {
    return firestoreDB(uid)["user/profile"].set({
      nickname,
      avatarURL: (profile as GithubProfile).avatar_url,
    });
  }
};

export const signInWithGithub = async () => {
  const { user, additionalUserInfo } = await myFirebase
    .auth()
    .signInWithPopup(provider);

  const uid = user?.uid;

  if (!uid) return;

  if (!additionalUserInfo) return;

  localStorage.setItem(LOCAL_STORAGE_KEY.UID, uid);

  let userProfile = await requestUserProfile();

  if (!userProfile) {
    await signUpWithGithub(additionalUserInfo, uid);
    userProfile = await requestUserProfile();
  }

  return userProfile;
};

export const requestUserProfile = async () => {
  const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  const result = await firestoreDB(uid)["user/profile"].get();

  const userProfile = result.data();

  return userProfile;
};

export const requestUpdateUserProfile = async (profile: Profile) => {
  const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  return firestoreDB(uid)["user/profile"].update(profile);
};

export const requestUserPullRequestURLs = async () => {
  const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  const result = await firestoreDB(uid)["user/pullRequestURLs"].get();

  const pullRequestURLs = result.data();

  return pullRequestURLs;
};

export const requestUpdatePullRequestURLs = (pullRequestURLs: {
  [url: string]: PullRequestURL;
}) => {
  const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  return firestoreDB(uid)["user/pullRequestURLs"].set(pullRequestURLs);
};
