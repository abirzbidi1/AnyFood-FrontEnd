import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { userApi } from "./api/user/userApi";
import { authApi } from "./api/authentication/authApi";
import { restoApi } from "./api/restaurant/restoApi";
import { menuApi } from "./api/menu/menuApi";
import { orderApi } from "./api/order/orderApi";
const rootReducer = combineReducers({
  userState: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [restoApi.reducerPath]: restoApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, restoApi.middleware, menuApi.middleware, orderApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
