import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/quiz`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getQuizes: builder.query({
      query: () => "/get",
    }),
    getQuiz: builder.mutation({
      query: (id) => ({
        url: `/detail/${id}`,
        method: "GET",
      }),
    }),
    createQuiz: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          quizApi.endpoints.getQuizes.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    updateQuiz: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          quizApi.endpoints.getQuizes.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    uploadQuizes: builder.mutation({
      query: ({ id, body }) => ({
        url: `/upload/${id}`,
        method: "POST",
        body,
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          quizApi.endpoints.getQuizes.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    clearData: builder.mutation({
      query: () => ({
        url: `/clear-data`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          quizApi.endpoints.getQuizes.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
  }),
});

export const {
  useGetQuizesQuery,
  useGetQuizMutation,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useUploadQuizesMutation,
  useDeleteQuizMutation,
  useClearDataMutation,
} = quizApi;
