import { Reducer } from "redux";
import { PrUrl } from "../../util/types";
import { GET_PR_URL_LIST_SUCCESS, PrUrlAction } from "./action";

interface PrUrlState {
  data: PrUrl[] | null;
}

const initialState: PrUrlState = {
  data: null,
};

const PrUrlReducer: Reducer<PrUrlState, PrUrlAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_PR_URL_LIST_SUCCESS: {
      const { prUrlList } = action.payload;

      return {
        ...state,
        data: prUrlList,
      };
    }
    default: {
      return state;
    }
  }
};

export default PrUrlReducer;
