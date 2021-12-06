import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import firebaseAPI from "../../API/firebaseAPI";
import { PrUrl, PrUrlMap } from "../../util/types";
import {
  actionAddPrUrl,
  actionAddPrUrlSuccess,
  actionGetUrlList,
  actionGetUrlListSuccess,
  ADD_PR_URL,
  GET_PR_URL_LIST,
} from "./action";

function* getPrUrlList(action: ReturnType<typeof actionGetUrlList>) {
  try {
    const { uid } = action.payload;

    const pullRequestURLs: PrUrlMap = yield call(
      firebaseAPI.getUserPrUrlList,
      uid
    );

    yield put(actionGetUrlListSuccess(pullRequestURLs));
  } catch (error) {
    alert(error);
  }
}

function* addPrUrl(action: ReturnType<typeof actionAddPrUrl>) {
  try {
    const { uid, newPrUrl } = action.payload;

    yield call(firebaseAPI.updatePrUrl, uid, newPrUrl);

    yield put(actionAddPrUrlSuccess(newPrUrl));
  } catch (error) {
    alert(error);
  }
}

function* prUrlListSaga() {
  yield takeLatest(GET_PR_URL_LIST, getPrUrlList);
  yield takeEvery(ADD_PR_URL, addPrUrl);
}

export default prUrlListSaga;
