import { Map } from "immutable";
import { Reducer } from "redux";
import { PrUrlMap } from "../../constant/types";
import {
  ADD_PR_URL_SUCCESS,
  DELETE_PR_URL_SUCCESS,
  GET_PR_URL_LIST_SUCCESS,
  MODIFY_PR_URL_LIST_SUCCESS,
  PrUrlListAction,
} from "./action";

interface PrUrlListState {
  byUrl: PrUrlMap;
}

const initialState: PrUrlListState = {
  byUrl: Map({}),
};

const PrUrlListReducer: Reducer<PrUrlListState, PrUrlListAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_PR_URL_LIST_SUCCESS: {
      const { prUrlMap } = action.payload;

      return {
        ...state,
        byUrl: prUrlMap,
      };
    }
    case ADD_PR_URL_SUCCESS: {
      const { newPrUrl } = action.payload;

      return {
        ...state,
        byUrl: state.byUrl.set(newPrUrl.url, newPrUrl),
      };
    }
    case DELETE_PR_URL_SUCCESS: {
      const { prUrl } = action.payload;

      return {
        ...state,
        byUrl: state.byUrl.delete(prUrl),
      };
    }
    case MODIFY_PR_URL_LIST_SUCCESS: {
      const { modifiedPrUrlMap } = action.payload;

      return {
        ...state,
        byUrl: state.byUrl.merge(modifiedPrUrlMap),
      };
    }
    default: {
      return state;
    }
  }
};

export default PrUrlListReducer;
