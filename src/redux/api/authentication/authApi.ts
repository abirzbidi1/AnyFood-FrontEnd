import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CONFIG } from "../../../config/constant/config";
import { METHODS } from "../../../config/constant/methods.config";
import { ENDPOINTS } from "../../../config/constant/endpoints.config";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.AUTH_URL_API }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query(data) {
        return {
          url: ENDPOINTS.LOGIN,
          method: METHODS.POST,
          body: data,
          credentials: "include",
        };
      },
    }),
    forgetPassword: builder.mutation({
      query(data) {
        return {
          url: ENDPOINTS.FORGET_PASSWORD,
          method: METHODS.POST,
          body: data,
          credentials: "include",
        };
      },
    }),
    
    resetPassword: builder.mutation({
      query(data) {
        return {
          url: ENDPOINTS.RESET_PASSWORD,
          method: METHODS.POST,
          body: data,
          credentials: "include",
        };
      },
    }),

    logoutUser: builder.mutation({
      query() {
        return {
          url: ENDPOINTS.LOGOUT,
          method: METHODS.POST,
          credentials: "include",
        };
      },
    }),

  }),
});

export const {
    useLoginUserMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useLogoutUserMutation
} = authApi;
