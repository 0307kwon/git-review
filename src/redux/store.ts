import createSagaMiddleware from "@redux-saga/core";
import { all } from "@redux-saga/core/effects";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import codeReviewReducer from "./codeReview/reducer";
import codeReviewSaga from "./codeReview/saga";
import loginInfoReducer from "./loginInfo/reducer";
import loginInfoSaga from "./loginInfo/saga";
import PrUrlListReducer from "./prUrlList/reducer";
import prUrlListSaga from "./prUrlList/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  loginInfo: loginInfoReducer,
  prUrlList: PrUrlListReducer,
  codeReview: codeReviewReducer,
});

function* rootSaga() {
  yield all([loginInfoSaga(), prUrlListSaga(), codeReviewSaga()]);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
