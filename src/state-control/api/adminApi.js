import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/admin`,
    credentials: "include",
  }),
  tagTypes: ["Admins", "Admin"],
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
      providesTags: ["admin"],
    }),
    getAdmins: builder.query({
      query: () => `/get-admins`,
      providesTags: ["Admins"],
    }),
    getDetailAdmin: builder.query({
      query: (id) => ({
        url: `/admin/${id}`,
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetAdminQuery,
  useGetAdminsQuery,
  useGetDetailAdminQuery,
} = adminApi;
