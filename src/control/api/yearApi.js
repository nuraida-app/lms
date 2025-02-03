import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const yearApi = createApi({
  reducerPath: "yearApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/year`,
    credentials: "include",
  }),
  tagTypes: ["years"],
  endpoints: (builder) => ({
    getYears: builder.query({
      query: ({ page, limit, search }) => ({
        url: "/get-years",
        params: { page, limit, search },
        method: "GET",
      }),
      providesTags: ["years"],
    }),
    addYear: builder.mutation({
      query: (body) => ({
        url: "/add-year",
        method: "POST",
        body,
      }),
      invalidatesTags: ["years"],
    }),
    deleteYear: builder.mutation({
      query: (id) => ({
        url: `/delete-year/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["years"],
    }),
  }),
});

export const { useGetYearsQuery, useAddYearMutation, useDeleteYearMutation } =
  yearApi;
