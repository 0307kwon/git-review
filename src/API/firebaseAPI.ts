import { LOCAL_STORAGE_KEY } from "../constant/common";
import { firestoreDB, myFirebase } from "../util/firebase";
import { isProfile } from "../util/typeGuard";
import { Profile, PullRequestURL } from "../util/types";

interface GithubProfile {
  name: string;
  avatar_url: string;
}

const provider = new myFirebase.auth.GithubAuthProvider();

const getLoginDataByPopup = () => {
  return myFirebase.auth().signInWithPopup(provider);
};

const getUserProfile = async (
  uid: string,
  additionalUserInfo?: myFirebase.auth.AdditionalUserInfo
) => {
  const result = await firestoreDB(uid)["user/profile"].get();

  const profile = result.data();

  if (isProfile(profile)) {
    return profile;
  }

  if (!additionalUserInfo) {
    throw new Error("서버에서 유저 정보를 찾을 수 없습니다.");
  }

  await registerAdditionalUserInfo(uid, additionalUserInfo);

  const resultAfterReg = await firestoreDB(uid)["user/profile"].get();
  const profileAfterReg = resultAfterReg.data();

  return profileAfterReg;
};

const registerAdditionalUserInfo = (
  uid: string,
  additionalUserInfo: myFirebase.auth.AdditionalUserInfo
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
