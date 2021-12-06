import createSagaMiddleware from "@redux-saga/core";
import { all } from "@redux-saga/core/effects";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loginInfoReducer from "./loginInfo/reducer";
import loginInfoSaga from "./loginInfo/saga";
import PrUrlListReducer from "./prUrlList/reducer";
import prUrlListSaga from "./prUrlList/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  loginInfo: loginInfoReducer,
  prUrlList: PrUrlListReducer,
});

function* rootSaga() {
  yield all([loginInfoSaga(), prUrlListSaga()]);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
