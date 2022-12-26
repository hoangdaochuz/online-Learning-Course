const { createApi, fetchBaseQuery} = require('@reduxjs/toolkit/query/react');

export const api = createApi({
    // baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost/5000"}),
    reducerPath: "adminApi",
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `management/user/${id}`,
            providesTags: ['User']
        })
    })
})

console.log("URL: " + process.env.REACT_APP_BASE_URL)
export const { useGetUserQuery } = api