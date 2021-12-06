import { LOCAL_STORAGE_KEY } from "../constant/common";
import { ERROR_MSG } from "../constant/message";
import { firestoreDB, myFirebase } from "../util/firebase";
import { isProfileResponse } from "../util/typeGuard";
import { Profile, PrUrl } from "../util/types";

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
): Promise<Profile> => {
  const result = await firestoreDB(uid)["user/profile"].get();

  const profile = result.data();

  if (isProfileResponse(profile)) {
    return {
      uid,
      ...profile,
    };
  }

  if (!additionalUserInfo) {
    throw new Error(ERROR_MSG.NOT_EXIST_PROFILE);
  }

  await registerAdditionalUserInfo(uid, additionalUserInfo);

  const resultAfterReg = await firestoreDB(uid)["user/profile"].get();
  const profileAfterReg = resultAfterReg.data();

  if (!profileAfterReg) {
    throw new Error(ERROR_MSG.NOT_EXIST_PROFILE);
  }

  return {
    uid,
    ...profileAfterReg,
  };
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

const requestUserPullRequestURLs = async (uid: string): Promise<PrUrl[]> => {
  const result = await firestoreDB(uid)["user/pullRequestURLs"].get();

  const pullRequestURLs = result.data();

  if (!pullRequestURLs) {
    return [];
  }

  return Object.values(pullRequestURLs);
};

const firebaseAPI = {
  getLoginDataByPopup,
  getUserProfile,
  registerAdditionalUserInfo,
  requestUserPullRequestURLs,
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

export const requestUpdatePullRequestURLs = (pullRequestURLs: {
  [url: string]: PrUrl;
}) => {
  const uid = localStorage.getItem(LOCAL_STORAGE_KEY.UID);

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  return firestoreDB(uid)["user/pullRequestURLs"].set(pullRequestURLs);
};
