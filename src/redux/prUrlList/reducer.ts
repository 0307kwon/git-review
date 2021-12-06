import { Map } from "immutable";
import { Reducer } from "redux";
import { PrUrl, PrUrlMap } from "../../util/types";
import {
  ADD_PR_URL_SUCCESS,
  GET_PR_URL_LIST_SUCCESS,
  PrUrlListAction,
} from "./action";

interface PrUrlListState {
  byUrl: PrUrlMap | null;
}

const initialState: PrUrlListState = {
  byUrl: null,
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
        byUrl:
          state.byUrl?.set(newPrUrl.url, newPrUrl) ||
          Map({ [newPrUrl.url]: newPrUrl }),
      };
    }
    default: {
      return state;
    }
  }
};

export default PrUrlListReducer;
