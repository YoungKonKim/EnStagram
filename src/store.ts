import { applyMiddleware, combineReducers, createStore } from "redux";
import { TypeUserInfoReducer, userInfoReducer } from "./reducers/userInfo";
import { feedListReducer, TypeFeedListReducer } from "./reducers/feedList";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  feedList: feedListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootReducer = {
  userInfo: TypeUserInfoReducer;
  feedList: TypeFeedListReducer;
};
