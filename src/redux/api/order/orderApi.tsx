import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ENDPOINTS } from "../../../config/constant/endpoints.config";
import { METHODS } from "../../../config/constant/methods.config";
import { CONFIG } from "../../../config/constant/config";


export const orderApi = createApi({
    reducerPath: "orderApi",
    tagTypes: ["orders"],
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
   
      getTotalOrder: builder.query({
            query: () => '/count', 
            transformResponse: (response: any) => response.results,
      }),

      showAllOrders: builder.query({
        query: () => ({
          url: ENDPOINTS.SHOW_ALL_Orders,
          method: METHODS.GET,
        }),
        transformResponse: (response: any) => response.results,
        providesTags: ["orders"],
      }),

      passOrder: builder.mutation({
        query: (orderData) => ({
          url: '/order',
          method: 'POST',
          body:{...orderData.variables}
        }),
      }),

      generateInvoice: builder.query({
        query: () => ({
          url: '/invoice',
          method: 'get',
          credentials: "include",
          crossOrigin: true,
        }),
      }),
      
      getUserOrder: builder.query({
        query: () => '/user-order', 
        transformResponse: (response: any) => response.results,
      }),

      countUSerOrder: builder.query({
        query: () => '/count-order', 
        transformResponse: (response: any) => response.results,
      }),

      deleteOrder: builder.mutation({
        query(id) {
          return {
            url: `/order/delete/${id}`,
            method: METHODS.DELETE,
            crossOrigin: true,
          };
        },
        invalidatesTags: ["orders"],
      }),
    }),
  });
  
  export const {
    useGetTotalOrderQuery,
    useShowAllOrdersQuery,
    usePassOrderMutation,
    useGenerateInvoiceQuery,
    useGetUserOrderQuery,
    useCountUSerOrderQuery,
    useDeleteOrderMutation,
  } = orderApi;
  