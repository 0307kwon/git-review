import { Map } from "immutable";
import { LOCAL_STORAGE_KEY } from "../constant/common";
import { ERROR_MSG } from "../constant/message";
import store from "../redux/store";
import { firestoreDB, myFirebase } from "../util/firebase";
import { isProfileResponse } from "../util/typeGuard";
import { Profile, PrUrl, PrUrlMap } from "../util/types";

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

const getUserPrUrlList = async (uid: string): Promise<PrUrlMap> => {
  const result = await firestoreDB(uid)["user/pullRequestURLs"].get();

  const pullRequestURLs = result.data();

  if (!pullRequestURLs) {
    return Map({});
  }

  return Map(pullRequestURLs);
};

const addPrUrl = (uid: string, prUrl: PrUrl) => {
  const prUrlList = store.getState().prUrlList;

  const prUrlMap = prUrlList.byUrl.set(prUrl.url, prUrl);

  return firestoreDB(uid)["user/pullRequestURLs"].set(prUrlMap.toObject());
};

const deletePrUrl = (uid: string, prUrl: string) => {
  const prUrlList = store.getState().prUrlList;

  const prUrlMap = prUrlList.byUrl.delete(prUrl);

  return firestoreDB(uid)["user/pullRequestURLs"].set(prUrlMap.toObject());
};

const modifyPrUrlList = (uid: string, prUrlMap: PrUrlMap) => {
  const prUrlList = store.getState().prUrlList;

  const newPrUrlMap = prUrlList.byUrl.merge(prUrlMap);

  return firestoreDB(uid)["user/pullRequestURLs"].set(newPrUrlMap.toObject());
};

const firebaseAPI = {
  getLoginDataByPopup,
  getUserProfile,
  registerAdditionalUserInfo,
  getUserPrUrlList,
  addPrUrl,
  deletePrUrl,
  modifyPrUrlList,
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
