import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";

const rootReducer = combineReducers({
  userState: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
