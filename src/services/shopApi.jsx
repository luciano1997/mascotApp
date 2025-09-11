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
                    console.log("products", products);

                    return products;
                }
            })
        }
    )
})
export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi;