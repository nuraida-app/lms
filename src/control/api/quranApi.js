import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quranApi = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/alquran`,
    credentials: "include",
  }),
  tagTypes: ["surah"],
  endpoints: (builder) => ({
    getQuran: builder.query({
      query: ({ page, limit, search }) => ({
        url: "/get-alquran",
        params: { page, limit, search },
        method: "GET",
      }),
      providesTags: ["surah"],
    }),
    addSurah: builder.mutation({
      query: (body) => ({
        url: "/add-surah",
        method: "POST",
        body,
      }),
      invalidatesTags: ["surah"],
    }),
    deleteSurah: builder.mutation({
      query: (id) => ({
        url: `/delete-surah/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["surah"],
    }),
  }),
});

export const { useGetQuranQuery, useAddSurahMutation, useDeleteSurahMutation } =
  quranApi;
