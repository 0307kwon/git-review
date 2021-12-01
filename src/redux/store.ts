import createSagaMiddleware from "@redux-saga/core";
import { all } from "@redux-saga/core/effects";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loginInfoReducer from "./loginInfo/reducer";
import loginInfoSaga from "./loginInfo/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  loginInfo: loginInfoReducer,
});

function* rootSaga() {
  yield all([loginInfoSaga()]);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
