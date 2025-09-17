import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const userProfileApi = createApi({
    reducerPath: "userProfileApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getProfilePicture: builder.query({
            query: (localId) => `profilePictures/${localId}.json`
        }),
        putProfilePicture: builder.mutation({
            query: (data) => ({
                url: `profilePictures/${data.localId}.json`,
                method: 'PUT',
                body: {
                    image: data.image
                }
            })
        })
    })
})

export const { useGetProfilePictureQuery, usePutProfilePictureMutation } = userProfileApi;