import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scoreApi = createApi({
  reducerPath: "scoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/scoring`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ page, limit, search }) => ({
        url: "/get-students",
        method: "GET",
        params: { page, limit, search },
      }),
    }),
    addscore: builder.mutation({
      query: (body) => ({
        url: "/add-score",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetStudentsQuery, useAddscoreMutation } = scoreApi;
