import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/log`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: (id) => ({
        url: `/get/${id}`,
      }),
    }),
    createLog: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
    getMyLogs: builder.query({
      query: (nis) => `/detail/${nis}`,
    }),

    resetLog: builder.mutation({
      query: (body) => ({
        url: "/change-status-log",
        method: "PUT",
        body,
      }),
      async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
        await queryFulfilled;

        dispatch(
          logApi.endpoints.getLogs.initiate(quizId, { forceRefetch: true })
        );
      },
    }),
    clearLogAnswers: builder.mutation({
      query: (body) => ({
        url: "/clear-log-answers",
        method: "DELETE",
        body,
      }),
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
  useGetMyLogsQuery,
  useFinishedQuizMutation,
  useResetLogMutation,
  useClearLogAnswersMutation,
} = logApi;
