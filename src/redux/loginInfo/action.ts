import { Profile } from "../../constant/types";
import { Action, ActionWithPayloadFromCreator } from "../type";

export const LOGIN_BY_POPUP = "LOGIN_INFO/LOGIN_BY_POPUP";
export const LOGIN_BY_UID = "LOGIN_INFO/LOGIN_BY_UID";
export const LOGIN_SUCCESS = "LOGIN_INFO/LOGIN_SUCCESS";

export const actionLoginByPopup = () => {
  return {
    type: LOGIN_BY_POPUP,
  };
};

export const actionLoginByUid = (uid: string) => {
  return {
    type: LOGIN_BY_UID,
    payload: { uid },
  };
};

export const actionLoginSuccess = (profile: Profile) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { profile },
  };
};

type LoginAction =
  | Action<typeof LOGIN_BY_POPUP>
  | ActionWithPayloadFromCreator<typeof LOGIN_BY_UID, typeof actionLoginByUid>
  | ActionWithPayloadFromCreator<
      typeof LOGIN_SUCCESS,
      typeof actionLoginSuccess
    >;

export const LOGOUT = "LOGIN_INFO/LOGOUT";

export const actionLogout = () => {
  return {
    type: LOGOUT,
  };
};

type LogoutAction = Action<typeof LOGOUT>;

export type LoginInfoAction = LoginAction | LogoutAction;
