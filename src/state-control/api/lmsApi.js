import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/lms`,
    credentials: "include",
  }),
  tagTypes: ["chapters", "chapter", "topic", "topics"],
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (code) => `/chapters/${code}`,
      providesTags: ["chapters"],
    }),
    getChapter: builder.query({
      query: (id) => `/chapter/${id}`,
      providesTags: ["chapter"],
    }),
    addChapter: builder.mutation({
      query: (body) => ({
        url: "/add-chapter",
        method: "POST",
        body,
      }),
      invalidatesTags: ["chapters"],
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/delete-chapter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chapters"],
    }),
    addTopic: builder.mutation({
      query: (body) => ({
        url: "/add-topic",
        method: "POST",
        body,
      }),
      invalidatesTags: ["topics"],
    }),
    getTopics: builder.query({
      query: (chapter_id) => `/topics/${chapter_id}`,
      providesTags: ["topics"],
    }),
    getTopic: builder.query({
      query: (id) => `/topic/${id}`,
      providesTags: ["topic"],
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/delete-topic/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["topics"],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetChapterQuery,
  useAddChapterMutation,
  useDeleteChapterMutation,
  useAddTopicMutation,
  useGetTopicsQuery,
  useGetTopicQuery,
  useDeleteTopicMutation,
} = lmsApi;
