import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.EXPO_PUBLIC_FIREBASE_AUTH_URL;
const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
       signup: builder.mutation({
            query: (auth)=>({
                url: `accounts:signUp?key=${API_KEY}`,
                method: "POST",
                body: auth
            })
        }),
        login: builder.mutation({
            query: (auth)=>({
                url: `accounts:signInWithPassword?key=${API_KEY}`,
                method: 'POST',
                body: auth
            })
        }),
    })
})

export const {  useSignupMutation, useLoginMutation } = authApi;


