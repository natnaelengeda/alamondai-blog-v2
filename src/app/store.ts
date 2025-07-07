import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import tempUserReducer from "@/state/temp-user"
import userReducer from "@/state/user";

const tempUserPersistConfig = {
  key: "tempUser",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
}

const tempUserPersistReducer = persistReducer(tempUserPersistConfig, tempUserReducer);
const userPersistReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    tempUser: tempUserPersistReducer,
    user: userPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;