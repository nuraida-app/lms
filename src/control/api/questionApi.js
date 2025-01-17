import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { quizApi } from "./quizApi";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/question`,
    credentials: "include",
  }),
  tagTypes: ["questions"],
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (id) => ({
        url: `/get-by-exam/${id}`,
      }),
      providesTags: ["questions"],
    }),
    getQuestion: builder.query({
      query: (id) => ({
        url: `/detail/${id}`,
      }),
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      providesTags: ["questions"],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body, quizId }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      providesTags: ["questions"],
    }),
    uploadQuestions: builder.mutation({
      query: ({ id, body }) => ({
        url: `/upload/${id}`,
        method: "POST",
        body,
      }),
      providesTags: ["questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      providesTags: ["questions"],
    }),
    clearData: builder.mutation({
      query: (id) => ({
        url: `/clear-data/${id}`,
        method: "DELETE",
      }),
      providesTags: ["questions"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useUploadQuestionsMutation,
  useDeleteQuestionMutation,
  useClearDataMutation,
} = questionApi;
