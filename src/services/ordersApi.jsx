import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Orders'], // para permitir que se refresque la data
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: (order) => ({
                url: `orders/${order.userId}.json`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Orders', id: arg.userId }]
        }),
        getOrdersByUser: builder.query({
            query: (userId) => `orders/${userId}.json`,
            transformResponse: (response) => {
                if (!response) return [];
                const orders = Object.values(response);
                return orders;
            },
            providesTags: (result, error, userId) => [{ type: 'Orders', id: userId }]
        })
    })
})
export const { usePostOrderMutation, useGetOrdersByUserQuery } = orderApi;