import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CONFIG } from "../../../config/constant/config";
import { METHODS } from "../../../config/constant/methods.config";
import { ENDPOINTS } from "../../../config/constant/endpoints.config";
import { IRestaurant } from "../../../types/interfaces/restoInterface";
import { GlobalVariables } from "../../../config/constant/global.variables";
import { IMenu } from "../../../types/interfaces/menuInterface";
import { transformItemDataToFormData, transformMenuDataToFormData, transformSectionDataToFormData, transformSupplementDataToFormData } from "./transformRequestMenu";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.BASE_URL_API,
    prepareHeaders: (headers) => {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: [GlobalVariables.RESTAURANT_TAG],
  endpoints: (builder) => ({

    //Menus
    addMenu: builder.mutation({
      query: (menu) => ({
        url: "/menu",
        method: METHODS.POST,
        body: transformMenuDataToFormData(menu),
      }),
    }),

    showMenu: builder.query({
      query(id) {
        return {
          url: ENDPOINTS.SHOW_MENU+  `/${id}`,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => {
        return Response.results;
      },
    }),

    deleteMenu: builder.mutation({
      query(id) {
        return {
          url:  ENDPOINTS.SHOW_MENU + `/${id}`,
          method: METHODS.DELETE,
          credentials: "include",
          crossOrigin: true,
        };
      },
      invalidatesTags: [{ type: "menu", id: "LIST" }],
    }),

    getAllMenus: builder.query({
      query() {
        return {
          url: ENDPOINTS.SHOW_MENU,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => {
        return Response.results;
      },
    }),

    //sections
    addSection: builder.mutation({
      query: (section) => ({
        url: "/section",
        method: METHODS.POST,
        body: transformSectionDataToFormData(section),
      }),
    }),

    listingSections: builder.query({
      query(id) {
        return {
          url: ENDPOINTS.SHOW_SECTIONS + `/${id}`,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => {
        return Response.results;
      },
    }),

    //items
    addItem: builder.mutation({
      query: (item) => ({
        url: "/item",
        method: METHODS.POST,
        body: transformItemDataToFormData(item),
      }),
    }),

  getAllItems: builder.query({
      query(id) {
        return {
          url: ENDPOINTS.SHOW_ITEMS + `/${id}`,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => {
        return Response.results;
      },
    }),

    findItem:builder.query({
      query(id) {
        return {
          url: ENDPOINTS.FIND_ITEM + `/${id}`,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => {
        return Response.results;
      },
    }),

    //supplements
    addSupplement: builder.mutation({
      query: (supplement) => ({
        url: "/supplement",
        method: METHODS.POST,
        body: transformSupplementDataToFormData(supplement),
      }),
    }),
    getAllSupplements:builder.query({
      query(id) {
        return {
          url: ENDPOINTS.SHOW_SUPPLEMENTS + `/${id}`,
          method: METHODS.GET,
        };
      },
      transformResponse: (Response: any) => {
        return Response.results;
      },
    }),

   

    
  }),
});

export const { 
  useShowMenuQuery,
  useDeleteMenuMutation, 
  useAddMenuMutation,
  useGetAllMenusQuery,
  useListingSectionsQuery,
  useAddSectionMutation,
  useGetAllItemsQuery,
  useFindItemQuery,
  useGetAllSupplementsQuery, 
  useAddItemMutation,
  useAddSupplementMutation
} = menuApi;
