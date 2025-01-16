import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const answerApi = createApi({
  reducerPath: "answerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/answer`,
    credentials: "include",
  }),
  tagTypes: ["Answers"],
  endpoints: (builder) => ({
    getMyAnswers: builder.query({
      query: (quizId) => ({
        url: `/get-my-answer/${quizId}`,
      }),
      providesTags: ["Answers"],
    }),
    getStudentsAnswer: builder.query({
      query: ({ quizId, gradeId, page, limit, search, code }) => ({
        url: `/get-students-answer`,
        params: { quizId, gradeId, page, limit, search, code },
        method: "GET",
      }),
    }),
    createAnswer: builder.mutation({
      query: (body) => ({
        url: `/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Answers"],
    }),
    doubtAnswer: builder.mutation({
      query: (body) => ({
        url: "/doubt",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Answers"],
    }),
    giveScore: builder.mutation({
      query: ({ id, body }) => ({
        url: `/give-score-essay/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Answers"],
    }),
    reset: builder.mutation({
      query: ({ id, quizId }) => ({
        url: `/reset/${id}/${quizId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Answers"],
    }),
  }),
});

export const {
  useGetMyAnswersQuery,
  useGetStudentsAnswerQuery,
  useCreateAnswerMutation,
  useDoubtAnswerMutation,
  useGiveScoreMutation,
} = answerApi;
