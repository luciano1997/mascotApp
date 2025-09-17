import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const shopApi = createApi({
    reducerPath:"shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => (
        {
            getCategories: builder.query({
                query: () => "categories.json"
            }),
            getProductsByCategory: builder.query({
                query: (categoryId) => `products.json?orderBy="categoryId"&equalTo=${categoryId}`,
                transformResponse: (response) => {
                    const products = Object.values(response);
                    return products;
                }
            }),
            updateProductStock: builder.mutation({
                query: ({ productId, newStock }) => ({
                    url: `products/${productId}.json`,
                    method: 'PATCH',
                    body: { stock: newStock }
                }),
                // invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.productId }]
            })

        }
    )
})
export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useUpdateProductStockMutation } = shopApi;