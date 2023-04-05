import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../../types/interfaces/userInterface";
import { CONFIG } from "../../config/constant/config";
import { ENDPOINTS } from "../../config/constant/endpoints.config";
import { METHODS } from "../../config/constant/methods.config";
import transformResponseUser from "./transformResponseUser";
import transformRequestUser from "./transformRequestUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.BASE_URL_API }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    //get all users M1
    getUsersList: builder.query({
      query: (params : {page: number, per_page: number, searched?: string, order_column: string, order_type: string}) => ({
        url:`users?params`,
        method: "GET",
        params,
      }),
      transformResponse: (Response: any) =>
        transformResponseUser(Response.results.data),
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
        url: ENDPOINTS.USER,
        method: METHODS.POST,
        body: transformRequestUser(newUser),
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    //update User
    updateUser: builder.mutation<IUser, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `users/${id}`,
          method: METHODS.PATCH,
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
      query(id:number) {
        return {
          url: `/${id}`,
          method: METHODS.DELETE,
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
