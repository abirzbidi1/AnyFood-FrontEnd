import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CONFIG } from "../../../config/constant/config";
import { ENDPOINTS } from "../../../config/constant/endpoints.config";
import { METHODS } from "../../../config/constant/methods.config";
import { FormRestaurant } from "../../../features/responsible/ManageRestaurants/addRestaurant/AddRestaurant.type";
import {
  IRestaurant
} from "../../../types/interfaces/restoInterface";
import transformResponseRestaurant from "./transformRequestRestaurant";
import { transformBodyToFormData } from "./transformRequestResto";
import transformResponseResto from "./transformResponseResto";

export const restoApi = createApi({
  reducerPath: "restoApi",
  tagTypes: ["restaurants"],
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
    getRestaurantsList: builder.query({
      query: (params: {
        page: number;
        perPage: number;
        searched?: string;
        orderColumn: string;
        orderType: string;
      }) => ({
        url: ENDPOINTS.RESTAURANTS + `?params`,
        method: METHODS.GET,
        params,
      }),
      transformResponse: (Response: any) =>
        transformResponseResto(Response.results.data),
    }),

    addRestaurant: builder.mutation({
      query: (restaurant) => ({
        url: ENDPOINTS.RESTAURANT,
        method: METHODS.POST,
        body: transformBodyToFormData(restaurant),
        credentials: "include",
        formData: true,
      }),
      invalidatesTags: ["restaurants"],
    }),

   /* addRestaurant: builder.mutation<IRestaurant, FormRestaurant>({
      query: (restaurant) => ({
        url: ENDPOINTS.RESTAURANT,
        method: METHODS.POST,
        body: transformBodyToFormData(restaurant),
      }),
      invalidatesTags: ["restaurants"],
    }),
*/
    updateRestaurant: builder.mutation({
      query({ idRestaurant, restaurantInfo }) {
        return {
          url: `/${idRestaurant}`,
          method: METHODS.PUT,
          credentials: "include",
          crossOrigin: true,
          body: restaurantInfo,
        };
      },
      transformResponse: (response: { data: { restaurant: IRestaurant } }) =>
        response.data.restaurant,
    }),

    deleteRestaurant: builder.mutation({
      query(id) {
        return {
          url: ENDPOINTS.RESTAURANT + `/${id}`,
          method: METHODS.DELETE,
          credentials: "include",
          crossOrigin: true,
        };
      },
      invalidatesTags: ["restaurants"],
    }),

    showRestaurant: builder.query({
      query(id) {
        return {
          url: ENDPOINTS.SHOW_RESTAURANT + `/${id}`,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) =>
        transformResponseRestaurant(Response.results),
    }),

    getAllRestaurants: builder.query({
      query() {
        return {
          url: ENDPOINTS.GET_ALL_RESTAURANTS,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => Response.results,
    }),

    createRating: builder.mutation({
      query: ({ restaurantId, rating }) => ({
        url: `restaurants/${restaurantId}/ratings`,
        method: 'POST',
        body: { rating },
      }),
    }),

  }),
});

export const {
  useGetRestaurantsListQuery,
  useAddRestaurantMutation,
  useDeleteRestaurantMutation,
  useUpdateRestaurantMutation,
  useShowRestaurantQuery,
  useGetAllRestaurantsQuery,
  useCreateRatingMutation,
} = restoApi;
