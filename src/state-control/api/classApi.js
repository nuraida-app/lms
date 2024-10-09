import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/class`,
    credentials: "include",
  }),
  tagTypes: ["class", "classes"],
  endpoints: (builder) => ({
    createClass: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["classes"],
    }),
    getClasses: builder.query({
      query: () => "/get",
      providesTags: ["classes"],
    }),
    getClass: builder.mutation({
      query: (id) => `/detail/${id}`,
      providesTags: ["class"],
    }),
    updateClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["classes"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["classes"],
    }),
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      invalidatesTags: ["classes"],
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetClassesQuery,
  useGetClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useClearDataMutation,
} = classApi;
