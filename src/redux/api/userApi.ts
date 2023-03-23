import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../../types/interfaces/userInterface";
import { BASE_URL } from "../../config/constant/constants";
import transformResponseUser from "./transformResponseUser";
import transformRequestUser from "./transformRequestUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    //get all users M1
    getUsersList: builder.query<IUser[], void>({
      query: () => "/users",
      transformResponse: ((Response: any)=>(transformResponseUser(Response.results.data))),
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
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: transformRequestUser(newUser),
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
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
    deleteUser: builder.mutation<null, number>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
          credentials: "include",
          crossOrigin: true,  
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
