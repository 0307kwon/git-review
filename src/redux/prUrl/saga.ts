import { call, put, takeLatest } from "@redux-saga/core/effects";
import firebaseAPI from "../../API/firebaseAPI";
import { PrUrl } from "../../util/types";
import {
  actionGetUrlList,
  actionGetUrlListSuccess,
  GET_PR_URL_LIST,
} from "./action";

function* getPrUrlList(action: ReturnType<typeof actionGetUrlList>) {
  try {
    const { uid } = action.payload;

    const pullRequestURLs: PrUrl[] = yield call(
      firebaseAPI.requestUserPullRequestURLs,
      uid
    );

    yield put(actionGetUrlListSuccess(pullRequestURLs));
  } catch (error) {
    alert(error);
  }
}

function* loginInfoSaga() {
  yield takeLatest(GET_PR_URL_LIST, getPrUrlList);
}

export default loginInfoSaga;
