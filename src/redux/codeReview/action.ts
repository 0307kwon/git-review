import { CodeReview, PrUrl } from "../../constant/types";
import { ActionWithPayloadFromCreator } from "../type";

export const UPDATE_REVIEWS = "CODE_REVIEW/UPDATE_REVIEWS";
export const UPDATE_REVIEWS_SUCCESS = "CODE_REVIEW/UPDATE_REVIEWS_SUCCESS";
export const UPDATE_REVIEWS_ERROR = "CODE_REVIEW/UPDATE_REVIEWS_ERROR";

export const actionUpdateReviews = (updatingPrUrls: PrUrl[]) => {
  return {
    type: UPDATE_REVIEWS,
    payload: { updatingPrUrls },
  };
};

export const actionUpdateReviewsSuccess = (newCodeReviews: CodeReview[]) => {
  return {
    type: UPDATE_REVIEWS_SUCCESS,
    payload: { newCodeReviews },
  };
};

export const actionUpdateReviewsError = (errMsg: string) => {
  return {
    type: UPDATE_REVIEWS_ERROR,
    payload: { errMsg },
  };
};

type UpdateReview =
  | ActionWithPayloadFromCreator<
      typeof UPDATE_REVIEWS,
      typeof actionUpdateReviews
    >
  | ActionWithPayloadFromCreator<
      typeof UPDATE_REVIEWS_SUCCESS,
      typeof actionUpdateReviewsSuccess
    >
  | ActionWithPayloadFromCreator<
      typeof UPDATE_REVIEWS_ERROR,
      typeof actionUpdateReviewsError
    >;

export const DELETE_REVIEWS = "CODE_REVIEW/DELETE_REVIEWS";
export const DELETE_REVIEWS_SUCCESS = "CODE_REVIEW/DELETE_REVIEWS_SUCCESS";

export const actionDeleteReviews = (reviewIds: string[]) => {
  return {
    type: DELETE_REVIEWS,
    payload: { reviewIds },
  };
};

export const actionDeleteReviewsSuccess = (reviewIds: string[]) => {
  return {
    type: DELETE_REVIEWS_SUCCESS,
    payload: { reviewIds },
  };
};

type DeleteReview =
  | ActionWithPayloadFromCreator<
      typeof DELETE_REVIEWS,
      typeof actionDeleteReviews
    >
  | ActionWithPayloadFromCreator<
      typeof DELETE_REVIEWS_SUCCESS,
      typeof actionDeleteReviewsSuccess
    >;

export type CodeReviewAction = UpdateReview | DeleteReview;
