import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/lms`,
    credentials: "include",
  }),
  tagTypes: ["chapters", "chapter", "topic", "topics", "files"],
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (code) => `/chapters/${code}`,
      providesTags: ["chapters"],
    }),
    getChaptesClass: builder.query({
      query: () => `/get-chapter-for-class`,
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
    uploadFile: builder.mutation({
      query: (body) => ({
        url: "/upload-file",
        method: "POST",
        body,
      }),
      invalidatesTags: ["files"],
    }),
    getFiles: builder.query({
      query: (id) => `/get-files/${id}`,
      providesTags: ["files"],
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/delete-file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["files"],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetChaptesClassQuery,
  useGetChapterQuery,
  useAddChapterMutation,
  useDeleteChapterMutation,
  useAddTopicMutation,
  useGetTopicsQuery,
  useGetTopicQuery,
  useDeleteTopicMutation,
  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = lmsApi;
