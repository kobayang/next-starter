import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { reducers } from "./reducer";

export const store = (initialState = {}) => {
  return createStore(
    combineReducers({ ...reducers }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
