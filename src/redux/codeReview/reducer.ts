import { Map } from "immutable";
import { Reducer } from "redux";
import { CodeReview } from "../../constant/types";
import {
  CodeReviewAction,
  DELETE_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_SUCCESS,
  UPDATE_REVIEWS_ERROR,
  UPDATE_REVIEWS_SUCCESS,
} from "./action";

interface CodeReviewState {
  byId: Map<number, CodeReview>;
  error: {
    isError: boolean;
    message: string;
  };
}

const initialState: CodeReviewState = {
  byId: Map(),
  error: {
    isError: false,
    message: "",
  },
};

const codeReviewReducer: Reducer<CodeReviewState, CodeReviewAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_REVIEWS_SUCCESS: {
      const { codeReviews } = action.payload;

      return {
        ...state,
        byId: Map(codeReviews.map((review) => [review.id, review])),
      };
    }
    case UPDATE_REVIEWS_SUCCESS: {
      const { newCodeReviews } = action.payload;

      const additionalReviewMap = Map(
        newCodeReviews.map((review) => [review.id, review])
      );

      return {
        ...state,
        byId: state.byId.merge(additionalReviewMap),
        error: {
          isError: false,
          message: "",
        },
      };
    }
    case UPDATE_REVIEWS_ERROR: {
      const { errMsg } = action.payload;

      return {
        ...state,
        error: {
          isError: true,
          message: errMsg,
        },
      };
    }
    // case DELETE_REVIEWS_SUCCESS: {
    //   const { prUrls } = action.payload;

    //   const deletingReviewIds = state.byId.toArray().find(([_,codeReview]) => )

    //   return {
    //     ...state,
    //     byId: state.byId.deleteAll(reviewIds),
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default codeReviewReducer;
