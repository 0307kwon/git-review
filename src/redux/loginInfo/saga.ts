import { call, put, takeLatest } from "redux-saga/effects";
import firebaseAPI from "../../API/firebaseAPI";
import { LOCAL_STORAGE_KEY } from "../../constant/common";
import { Profile, ProfileResponse } from "../../constant/types";
import {
  actionLoginByUid,
  actionLoginSuccess,
  LOGIN_BY_POPUP,
  LOGIN_BY_UID,
} from "./action";

const setUseInfoInLocalStorage = (profile: Profile) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.UID, profile.uid);

  if (profile.githubToken) {
    localStorage.setItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN, profile.githubToken);
  }
};

const cleanupLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.UID);
  localStorage.removeItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);
};

function* loginByPopupSaga() {
  try {
    const {
      user: { uid },
      additionalUserInfo,
    } = yield call(firebaseAPI.getLoginDataByPopup);

    const profile: Profile = yield call(
      firebaseAPI.getUserProfile,
      uid,
      additionalUserInfo
    );

    setUseInfoInLocalStorage(profile);

    yield put(actionLoginSuccess(profile));
  } catch (error) {
    cleanupLocalStorage();
    alert(error);
  }
}

function* loginByUid(action: ReturnType<typeof actionLoginByUid>) {
  const { uid } = action.payload;

  try {
    const profile: Profile = yield call(firebaseAPI.getUserProfile, uid);

    setUseInfoInLocalStorage(profile);

    yield put(actionLoginSuccess(profile));
  } catch (error) {
    cleanupLocalStorage();
    alert(error);
  }
}

function* loginInfoSaga() {
  yield takeLatest(LOGIN_BY_POPUP, loginByPopupSaga);
  yield takeLatest(LOGIN_BY_UID, loginByUid);
}

export default loginInfoSaga;
