import { firestoreDB, myFirebase } from "../util/firebase";
import { PullRequestURL, UserInfo } from "../util/types";

interface GithubProfile {
  name: string;
  avatar_url: string;
}

const provider = new myFirebase.auth.GithubAuthProvider();

const signUpWithGithub = async (
  additionalUserInfo: myFirebase.auth.AdditionalUserInfo,
  uid: string
) => {
  const profile = additionalUserInfo.profile;

  if (!profile) return;

  const { name, avatar_url } = profile as GithubProfile;

  await firestoreDB.users.doc(uid).set({
    profile: {
      nickname: "",
      avatarURL: "",
    },
    pullRequestURLs: [],
  });

  return requestUpdateUserProfile(name, avatar_url);
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

export const requestUserInfo = async () => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  const result = await firestoreDB.users.doc(uid).get();
  const userInfo = result.data();

  return userInfo;
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

  const updates: Pick<UserInfo, "profile"> = {
    profile: {
      nickname,
      avatarURL,
    },
  };

  return firestoreDB.users.doc(uid).update(updates);
};

export const requestUpdatePullRequestURLs = (
  pullRequestURLs: PullRequestURL[]
) => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("로그인 정보가 만료되었습니다.");

    return;
  }

  return firestoreDB.users.doc(uid).update({
    pullRequestURLs,
  });
};
