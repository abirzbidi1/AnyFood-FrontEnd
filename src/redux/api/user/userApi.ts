import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUpdateUser, IUser } from "../../../types/interfaces/userInterface";
import { CONFIG } from "../../../config/constant/config";
import { ENDPOINTS } from "../../../config/constant/endpoints.config";
import { METHODS } from "../../../config/constant/methods.config";
import transformResponseUser from "./transformResponseUser";
import {transformRequestUpdateUser, transformRequestUser} from "./transformRequestUser";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.BASE_URL_API,
    prepareHeaders: (headers) => {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //get all users M1
    getUsersList: builder.query({
      query: (params: {
        page: number;
        per_page: number;
        searched?: string;
        order_column: string;
        order_type: string;
      }) => ({
        url: ENDPOINTS.USERS + `?params`,
        method: METHODS.GET,
        params,
      }),
      transformResponse: (Response: any) =>
        transformResponseUser(Response.results.data),
      providesTags: ["users"],
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `${ENDPOINTS.USER}/${id}`, 
        method: METHODS.GET,
      }),
      transformResponse: (Response: any) =>
      transformResponseUser(Response.results.data),
    }),
    
    getUserById: builder.query({
      query: (id) => `user/${id}`,
    }),

    //create user_M1
    addUser: builder.mutation({
      query: (params: { token: string; newUser: IUser }) => ({
        url: ENDPOINTS.USER,
        method: METHODS.POST,
        body: transformRequestUser(params.newUser),
        params,
        formData: true,
      }),
      invalidatesTags: ["users"],
    }),

    //update User
    updateUser: builder.mutation({
      query: (params: { idUser: number; userInfo: IUpdateUser }) => ({
       url: `/${params.idUser}`,
          method: METHODS.POST,
          credentials: "include",
          crossOrigin: true,
          body: transformRequestUpdateUser(params.userInfo),
        params,
        formData: true,
    
      }),
      transformResponse: (response: { data: { user: IUpdateUser } }) =>
        response.data.user,
    }),

    changePassword: builder.mutation({
      query({ idUser, userInfo }) {
        return {
          url: ENDPOINTS.CHANGE_PASSWORD + `/${idUser}`,
          method: METHODS.PUT,
          crossOrigin: true,
          body: userInfo,
        };
      },
    }),

    //delete user
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: METHODS.DELETE,
          crossOrigin: true,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUsersListQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
} = userApi;
