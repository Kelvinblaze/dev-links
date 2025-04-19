// store.js
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Configure persistence
const persistConfig = {
  key: "global",
  storage,
  whitelist: ["token", "user"], // only persist specific keys if needed
};

const persistedReducer = persistReducer(persistConfig, globalReducer);

export const store = configureStore({
  reducer: {
    global: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this off
    }),
});

export const persistor = persistStore(store);
