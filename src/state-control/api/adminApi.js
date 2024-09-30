import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/admin`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/data-users",
      }),
    }),
    getAdmin: builder.query({
      query: () => ({
        url: "/profile",
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useGetAdminQuery } = adminApi;
