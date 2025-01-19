import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/lms`,
    credentials: "include",
  }),
  tagTypes: ["chapters", "chapter", "topics", "files"],
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: ({ subjectCode, grade_id }) => ({
        url: `/chapters`,
        params: { subjectCode, grade_id },
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ chapter_id }) => ({
                type: "chapters",
                id: chapter_id,
              })),
              { type: "chapters", id: "LIST" },
            ]
          : [{ type: "chapters", id: "LIST" }],
    }),
    getChapter: builder.query({
      query: (id) => `/chapter/${id}`,
      providesTags: (result, error, id) => [{ type: "chapter", id }],
    }),
    addChapter: builder.mutation({
      query: (body) => ({
        url: "/add-chapter",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "chapters", id: "LIST" }],
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/delete-chapter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "chapters", id: "LIST" }],
    }),
    addTopic: builder.mutation({
      query: (body) => ({
        url: "/add-topic",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "chapters", id: "LIST" }], // Invalidate chapters cache
    }),
    getTopics: builder.query({
      query: (chapter_id) => `/topics/${chapter_id}`,
      providesTags: (result, error, chapter_id) => [
        { type: "topics", id: chapter_id },
      ],
    }),
    getTopic: builder.query({
      query: (id) => `/topic/${id}`,
      providesTags: (result, error, id) => [{ type: "topics", id }],
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/delete-topic/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "chapters", id: "LIST" }], // Invalidate chapters cache
    }),
    uploadFile: builder.mutation({
      query: (body) => ({
        url: "/upload-file",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "chapters", id: "LIST" }], // Invalidate chapters cache
    }),
    getFiles: builder.query({
      query: (id) => `/get-files/${id}`,
      providesTags: (result, error, id) => [{ type: "files", id }],
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/delete-file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "chapters", id: "LIST" }], // Invalidate chapters cache
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
  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = lmsApi;
