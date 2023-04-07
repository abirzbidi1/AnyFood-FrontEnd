import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CONFIG } from "../../config/constant/config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.AUTH_URL_API }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query(data) {
        return {
          url: "/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    forgetPassword: builder.mutation({
      query(data) {
        return {
          url: "/forget",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    resetPassword: builder.mutation({
      query(data) {
        return {
          url: "/reset-password",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: "/logout",
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
