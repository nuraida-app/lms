import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quranApi = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/alquran`,
    credentials: "include",
  }),
  tagTypes: ["surah", "juz"],
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
    getJuz: builder.query({
      query: ({ page, search, limit }) => ({
        url: `/get-juz`,
        method: "GET",
        params: { page, search, limit },
      }),
      providesTags: ["juz"],
    }),
    addJuz: builder.mutation({
      query: (body) => ({
        url: "/add-juz",
        method: "POST",
        body,
      }),
      invalidatesTags: ["juz"],
    }),
    deleteJuz: builder.mutation({
      query: (id) => ({
        url: `/delete-juz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["juz"],
    }),
  }),
});

export const {
  useGetQuranQuery,
  useAddSurahMutation,
  useDeleteSurahMutation,
  useGetJuzQuery,
  useDeleteJuzMutation,
  useAddJuzMutation,
} = quranApi;
