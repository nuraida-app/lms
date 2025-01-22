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
    adminDashboard: builder.query({
      query: () => ({
        url: "/data-admin",
      }),
    }),
    getAdmins: builder.query({
      query: () => `/get-admins`,
      providesTags: ["Admins"],
    }),
    addAdmin: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin", "Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useAdminDashboardQuery,
  useGetAdminsQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
