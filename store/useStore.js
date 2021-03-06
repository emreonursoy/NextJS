import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { actionTypes } from "./actionTypes";
import { reducer } from "./reducer";

let store;

const dataInitialState = {
  lastUpdate: 0,
  light: false,
  totalCount: 0,
  characters: [],
  error: null,
};

// ACTIONS

export const loadData = (payload) => {
  return { type: actionTypes.LOAD_DATA, payload };
};

export const loadingDataFailure = () => {
  return { type: actionTypes.LOADING_DATA_FAILURE };
};

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["characters", "totalCount"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

function makeStore(initialState = dataInitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
