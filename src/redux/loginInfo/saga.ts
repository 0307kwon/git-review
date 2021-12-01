import { call, put, takeLatest } from "redux-saga/effects";
import firebaseAPI from "../../API/firebaseAPI";
import { LOCAL_STORAGE_KEY } from "../../constant/common";
import { Profile } from "../../util/types";
import {
  actionLoginByUid,
  actionLoginSuccess,
  LOGIN_BY_POPUP,
  LOGIN_BY_UID,
} from "./action";

function* loginByPopupSaga() {
  try {
    const {
      user: { uid },
      additionalUserInfo,
    } = yield call(firebaseAPI.getLoginDataByPopup);

    let profile: Profile = yield call(firebaseAPI.getUserProfile, uid);

    if (!profile) {
      yield call(
        firebaseAPI.registerAdditionalUserInfo,
        additionalUserInfo,
        uid
      );
      profile = yield call(firebaseAPI.getUserProfile, uid);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY.UID, uid);

    yield put(actionLoginSuccess(profile));
  } catch (error) {
    alert(error);
  }
}

function* loginByUid(action: ReturnType<typeof actionLoginByUid>) {
  const { uid } = action.payload;

  try {
    const profile: Profile = yield call(firebaseAPI.getUserProfile, uid);

    yield put(actionLoginSuccess(profile));
  } catch (error) {
    alert(error);
  }
}

function* loginInfoSaga() {
  yield takeLatest(LOGIN_BY_POPUP, loginByPopupSaga);
  yield takeLatest(LOGIN_BY_UID, loginByUid);
}

export default loginInfoSaga;
