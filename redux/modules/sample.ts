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

// Actions
export const actionCreator = actionCreatorFactory("SAMPLE");
export const load = actionCreator.async<{}, {}, Error>("SAMPLE/LOAD");
export const greeding = actionCreator<string>("SAMPLE/GREEDING");

// Request Actions
export const loadWorker = bindThunkAction(load, async ({}, dispatch) => {
  await sleep(1000);
  return dispatch(greeding("Hello, World"));
});

// Reducers
export const sampleReducer = reducerWithInitialState(initialState)
  .case(load.started, state => ({ ...state, isLoading: true }))
  .case(load.done, state => ({ ...state, isLoading: false }))
  .case(greeding, (state, payload) => ({ ...state, text: payload }));
