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
  }),
});

export const { useGetReportQuery } = reportApi;
