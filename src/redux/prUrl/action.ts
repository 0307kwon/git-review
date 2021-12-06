import { Action } from "redux";
import { PrUrl } from "../../util/types";
import { ActionWithPayloadFromCreator } from "../type";

export const GET_PR_URL_LIST = "PR_URL/GET_LIST";
export const GET_PR_URL_LIST_SUCCESS = "PR_URL/GET_LIST_SUCCESS";

export const actionGetUrlList = (uid: string) => {
  return {
    type: GET_PR_URL_LIST,
    payload: {
      uid,
    },
  };
};

export const actionGetUrlListSuccess = (prUrlList: PrUrl[]) => {
  return {
    type: GET_PR_URL_LIST_SUCCESS,
    payload: { prUrlList },
  };
};

type GetPrUrlListAction =
  | ActionWithPayloadFromCreator<
      typeof GET_PR_URL_LIST,
      typeof actionGetUrlList
    >
  | ActionWithPayloadFromCreator<
      typeof GET_PR_URL_LIST_SUCCESS,
      typeof actionGetUrlListSuccess
    >;

export type PrUrlAction = GetPrUrlListAction;
