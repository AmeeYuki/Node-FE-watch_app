import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage

import watchReducer from "../slices/watch.slice";
import authReducer from "../slices/auth.slice";

//API
import { watchApi } from "../services/watchAPI";
import { authApi } from "../services/authAPI";

const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer); //user them API test

export const store = configureStore({
  reducer: {
    // [flowerApi.reducerPath]: flowerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [watchApi.reducerPath]: watchApi.reducer,

    auth: persistedAuthReducer,
    watch: watchReducer,
    // user: persistedUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, watchApi.middleware), //user them API test
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return asyncReducer;
};

function createReducer(asyncReducers = {}) {
  if (Object.keys(asyncReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  }
}

export const Persister = persistStore(store);
