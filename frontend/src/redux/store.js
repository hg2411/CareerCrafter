// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companyReducer from "./companySlice";
import applicationReducer from "./applicationSlice";
import notificationReducer from "./notificationSlice"; 
import aiReducer from "./aiSlice"; 

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
  application: applicationReducer,
  notification: notificationReducer,
  ai: aiReducer, 
});

// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
