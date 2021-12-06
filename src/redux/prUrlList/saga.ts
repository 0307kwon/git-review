import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { Map } from "immutable";
import firebaseAPI from "../../API/firebaseAPI";
import { PrUrlMap } from "../../util/types";
import {
  actionAddPrUrl,
  actionAddPrUrlSuccess,
  actionDeletePrUrl,
  actionDeletePrUrlSuccess,
  actionGetUrlList,
  actionGetUrlListSuccess,
  actionModifyPrUrlList,
  actionModifyPrUrlListSuccess,
  ADD_PR_URL,
  DELETE_PR_URL,
  GET_PR_URL_LIST,
  MODIFY_PR_URL_LIST,
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

    yield call(firebaseAPI.addPrUrl, uid, newPrUrl);

    yield put(actionAddPrUrlSuccess(newPrUrl));
  } catch (error) {
    alert(error);
  }
}

function* deletePrUrl(action: ReturnType<typeof actionDeletePrUrl>) {
  try {
    const { uid, prUrl } = action.payload;

    yield call(firebaseAPI.deletePrUrl, uid, prUrl);

    yield put(actionDeletePrUrlSuccess(prUrl));
  } catch (error) {
    alert(error);
  }
}

function* modifyPrUrlList(action: ReturnType<typeof actionModifyPrUrlList>) {
  try {
    const { uid, modifiedPrUrlList } = action.payload;

    const modifiedPrUrlMap = Map(
      modifiedPrUrlList.map((prUrl) => [prUrl.url, prUrl])
    );

    yield call(firebaseAPI.modifyPrUrlList, uid, modifiedPrUrlMap);

    yield put(actionModifyPrUrlListSuccess(modifiedPrUrlMap));
  } catch (error) {
    alert(error);
  }
}

function* prUrlListSaga() {
  yield takeLatest(GET_PR_URL_LIST, getPrUrlList);
  yield takeEvery(ADD_PR_URL, addPrUrl);
  yield takeEvery(DELETE_PR_URL, deletePrUrl);
  yield takeEvery(MODIFY_PR_URL_LIST, modifyPrUrlList);
}

export default prUrlListSaga;
