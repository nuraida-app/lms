import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { quizApi } from "./quizApi";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/question`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (id) => ({
        url: `/get-by-exam/${id}`,
      }),
    }),
    getQuestion: builder.query({
      query: (id) => ({
        url: `/detail/${id}`,
      }),
    }),
    createQuestion: builder.mutation({
      query: ({ quizId, body }) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            questionApi.endpoints.getQuestions.initiate(quizId, {
              forceRefetch: true,
            })
          );

          dispatch(
            quizApi.endpoints.getQuizes.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Error creating question:", error);
        }
      },
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body, quizId }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(
          questionApi.endpoints.getQuestions.initiate(quizId, {
            forceRefetch: true,
          })
        );
      },
    }),
    uploadQuestions: builder.mutation({
      query: ({ id, body }) => ({
        url: `/upload/${id}`,
        method: "POST",
        body,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            questionApi.endpoints.getQuestions.initiate(id, {
              forceRefetch: true,
            })
          );

          dispatch(
            quizApi.endpoints.getQuizes.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Error creating question:", error);
        }
      },
    }),
    deleteQuestion: builder.mutation({
      query: ({ id, quizId }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, quizId }, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(
          questionApi.endpoints.getQuestions.initiate(quizId, {
            forceRefetch: true,
          })
        );
      },
    }),
    clearData: builder.mutation({
      query: (id) => ({
        url: `/clear-data/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            questionApi.endpoints.getQuestions.initiate(id, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Error creating question:", error);
        }
      },
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
