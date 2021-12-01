import { LOCAL_STORAGE_KEY } from "../constant/common";
import { firestoreDB, myFirebase } from "../util/firebase";
import { Profile, PullRequestURL } from "../util/types";

interface GithubProfile {
  name: string;
  avatar_url: string;
}

const provider = new myFirebase.auth.GithubAuthProvider();

const getLoginDataByPopup = () => {
  return myFirebase.auth().signInWithPopup(provider);
};

const getUserProfile = async (uid: string) => {
  const result = await firestoreDB(uid)["user/profile"].get();

  const userProfile = result.data();

  return userProfile;
};

const registerAdditionalUserInfo = (
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

const firebaseAPI = {
  getLoginDataByPopup,
  getUserProfile,
  registerAdditionalUserInfo,
};

export default firebaseAPI;

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
