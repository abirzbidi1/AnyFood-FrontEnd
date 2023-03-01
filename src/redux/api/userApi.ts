import React, { useEffect } from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser, UserApi } from "../../types/interfaces/userInterface";
import { BASE_URL } from "../../config/constant/constants";
import transformResponseUser from "./transformResponseUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    //get all users M1
    getUsersList: builder.query<IUser[], void>({
      query: () => "/users",
      transformResponse: ((Response: any)=>(transformResponseUser(Response.data.data))),
    }),

    //get all users M2
    getUsers: builder.query<IUser[], void>({
      query() {
        return "users";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Users" as const,
                id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      transformResponse: ((Response: UserApi[])=>(transformResponseUser(Response))),
    }),

    //get single user
    getUser: builder.query<IUser, string>({
      query(id) {
        return `users/${id}`;
      },
      transformResponse: (response: { data: { user: IUser } }, args, meta) =>
        response.data.user,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    //create user_M1
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    //create user_M2
    createUser: builder.mutation<IUser, FormData>({
      query(data) {
        return {
          url: "users",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformResponse: (response: { data: { user: IUser } }) =>
        response.data.user,
    }),

    //update User
    updateUser: builder.mutation<IUser, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `users/${id}`,
          method: "PATCH",
          credentials: "include",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Users", id },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      transformResponse: (response: { data: { user: IUser } }) =>
        response.data.user,
    }),

    //delete user
    deleteUser: builder.mutation<null, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
