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
    addAdmin: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin", "Admins"],
    }),
    editAdmin: builder.mutation({
      query: (body) => ({
        url: "/update",
        method: "PUT",
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
  useGetAdminQuery,
  useGetAdminsQuery,
  useGetDetailAdminQuery,
  useAddAdminMutation,
  useEditAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
