import actionCreatorFactory from "typescript-fsa";
import { bindThunkAction } from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { sleep } from "../../utils/common/sleep";

// State
export interface SampleState {
  isLoading: boolean;
  text: string;
}

const initialState: SampleState = {
  isLoading: false,
  text: "",
};

// Request Params
export interface GreetingParams {
  greeting: string;
}

// API Requests

// Actions
export const actionCreator = actionCreatorFactory("SAMPLE");
export const load = actionCreator.async<GreetingParams, void, Error>("SAMPLE/LOAD");
export const greeting = actionCreator<string>("SAMPLE/GREETING");

// Request Actions
export const loadWorker = bindThunkAction(load, async (params, dispatch) => {
  await sleep(2000);
  dispatch(greeting(params.greeting));
});

// Reducers
export const sampleReducer = reducerWithInitialState(initialState)
  .case(load.started, state => ({ ...state, isLoading: true }))
  .case(load.done, state => ({ ...state, isLoading: false }))
  .case(greeting, (state, payload) => ({ ...state, text: payload }));
