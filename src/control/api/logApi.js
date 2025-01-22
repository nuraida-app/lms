import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/log`,
    credentials: "include",
  }),
  tagTypes: ["logs", "log"],
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: ({ page, limit, search, class_code, quizId }) => ({
        url: `/get`,
        params: { page, limit, search, class_code, quizId },
        method: "GET",
      }),
      providesTags: ["logs"],
    }),
    createLog: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logs"],
    }),
    getMyLog: builder.query({
      query: ({ nis, quiz }) => `/detail/${nis}/${quiz}`,
      providesTags: ["log"],
    }),
    resetLog: builder.mutation({
      query: (body) => ({
        url: "/change-status-log",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["logs"],
    }),
    clearLogAnswers: builder.mutation({
      query: (body) => ({
        url: "/clear-log-answers",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["logs"],
    }),
    finishedQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/finished/${quizId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetLogsQuery,
  useCreateLogMutation,
  useGetMyLogQuery,
  useFinishedQuizMutation,
  useResetLogMutation,
  useClearLogAnswersMutation,
} = logApi;
