import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/report`,
    credentials: "include",
  }),
  tagTypes: ["reports"],
  endpoints: (builder) => ({
    getReport: builder.query({
      query: ({ page, limit, search, type }) => ({
        url: "/get-all",
        method: "GET",
        params: { page, limit, search, type },
      }),
      providesTags: ["reports"],
    }),
    deleteReport: builder.mutation({
      query: ({ nis, typeId, createdat }) => ({
        url: `/delete-report`,
        params: { nis, typeId, createdat },
        method: "DELETE",
      }),
      invalidatesTags: ["reports"],
    }),
    StudentReport: builder.query({
      query: (nis) => ({
        url: `/get-report/${nis}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
  }),
});

export const {
  useGetReportQuery,
  useDeleteReportMutation,
  useStudentReportQuery,
} = reportApi;
