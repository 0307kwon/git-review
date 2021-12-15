import { CodeReview, PrUrl } from "../../constant/types";
import { Action, ActionWithPayloadFromCreator } from "../type";

export const GET_ALL_REVIEWS = "CODE_REVIEW/GET_ALL_REVIEWS";
export const GET_ALL_REVIEWS_SUCCESS = "CODE_REVIEW/GET_ALL_REVIEWS_SUCCESS";

export const actionGetReviews = () => {
  return {
    type: GET_ALL_REVIEWS,
  };
};

export const actionGetReviewsSuccess = (codeReviews: CodeReview[]) => {
  return {
    type: GET_ALL_REVIEWS_SUCCESS,
    payload: { codeReviews },
  };
};

type GetReview =
  | Action<typeof GET_ALL_REVIEWS>
  | ActionWithPayloadFromCreator<
      typeof GET_ALL_REVIEWS_SUCCESS,
      typeof actionGetReviewsSuccess
    >;

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

export const actionDeleteReviews = (prUrls: PrUrl[]) => {
  return {
    type: DELETE_REVIEWS,
    payload: { prUrls },
  };
};

export const actionDeleteReviewsSuccess = (prUrls: PrUrl[]) => {
  return {
    type: DELETE_REVIEWS_SUCCESS,
    payload: { prUrls },
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

export type CodeReviewAction = GetReview | UpdateReview | DeleteReview;
