import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { requestCodeReview } from "../../API/githubAPI";
import {
  deleteCodeReviewIDB,
  loadAllCodeReviewIDB,
  storeCodeReviewIDB,
} from "../../API/indexedDB";
import {
  CodeReview,
  CodeReviewFromGithub,
  HttpResponse,
} from "../../constant/types";
import { isSameURLPath } from "../../util/common";
import {
  actionDeleteReviews,
  actionDeleteReviewsSuccess,
  actionGetReviews,
  actionGetReviewsSuccess,
  actionUpdateReviews,
  actionUpdateReviewsError,
  actionUpdateReviewsSuccess,
  DELETE_REVIEWS,
  GET_ALL_REVIEWS,
  UPDATE_REVIEWS,
} from "./action";

function* getAllReviews() {
  try {
    const codeReviews: CodeReview[] = yield call(loadAllCodeReviewIDB);

    yield put(actionGetReviewsSuccess(codeReviews));
  } catch (error) {}
}

function* updateReviews(action: ReturnType<typeof actionUpdateReviews>) {
  try {
    const { updatingPrUrls } = action.payload;

    const updatingCodeReviewPromises = updatingPrUrls.map(({ url }) =>
      requestCodeReview(url)
    );

    const CodeReviewsToStore: CodeReview[] = [];
    const failedURLs: string[] = [];
    const urlNicknamesNotToHaveReview: string[] = [];

    const promiseResults: PromiseSettledResult<
      HttpResponse<CodeReviewFromGithub[]>
    >[] = yield call(Promise.allSettled, updatingCodeReviewPromises);

    promiseResults.forEach((result) => {
      if (result.status === "rejected") return;

      if (result.value.error) {
        failedURLs.push(result.value.endPointURL);
        return;
      }

      const codeReviewsFromGithubURL = result.value.resolvedValue;

      if (codeReviewsFromGithubURL.length === 0) {
        urlNicknamesNotToHaveReview.push(result.value.endPointURL);

        return;
      }

      const completedCodeReviews: CodeReview[] = codeReviewsFromGithubURL.map(
        (codeReviewFromGithub) => {
          const urlNickname = updatingPrUrls.find((prUrl) =>
            isSameURLPath(prUrl.url, codeReviewFromGithub.url)
          )?.nickname;

          return {
            ...codeReviewFromGithub,
            urlNickname: urlNickname || "익명의 리뷰",
          };
        }
      );

      CodeReviewsToStore.push(...completedCodeReviews);
    });

    yield call(storeCodeReviewIDB, CodeReviewsToStore);
    yield put(actionUpdateReviewsSuccess(CodeReviewsToStore));

    if (failedURLs.length > 0) {
      yield put(
        actionUpdateReviewsError(
          "한 개 이상의 URL을 불러오는데 실패했습니다.\ngithub token이 등록되어있는지 확인해보세요!"
        )
      );
    }

    if (urlNicknamesNotToHaveReview.length > 0) {
      yield put(
        actionUpdateReviewsError(
          `다음 url에는 코드 리뷰가 존재하지 않습니다. ${urlNicknamesNotToHaveReview.map(
            (url) => `\n"${url}"`
          )}`
        )
      );
    }
  } catch (error) {
    yield put(actionUpdateReviewsError(String(error)));
  }
}

// function* deleteReviews(action: ReturnType<typeof actionDeleteReviews>) {
//   const { prUrls } = action.payload;

//   yield call(
//     Promise.all,
//     prUrls.map((prUrl) => deleteCodeReviewIDB(prUrl.url))
//   );
//   yield put(actionDeleteReviewsSuccess(prUrls));
// }

function* codeReviewSaga() {
  yield takeLatest(GET_ALL_REVIEWS, getAllReviews);
  yield takeLatest(UPDATE_REVIEWS, updateReviews);
  // yield takeEvery(DELETE_REVIEWS, deleteReviews);
}

export default codeReviewSaga;
