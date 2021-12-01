import { Reducer } from "redux";
import { Profile } from "../../util/types";
import { LoginInfoAction, LOGIN_SUCCESS, LOGOUT } from "./action";

interface LoginInfoState {
  data: Profile | null;
}

const initialState: LoginInfoState = {
  data: null,
};

const loginInfoReducer: Reducer<LoginInfoState, LoginInfoAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { profile } = action.payload;

      return {
        ...state,
        data: profile,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginInfoReducer;
