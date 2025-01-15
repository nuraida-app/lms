import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/quiz`,
    credentials: "include",
  }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getQuizes: builder.query({
      query: ({ page, limit, search }) => ({
        url: "/get",
        params: { page, limit, search },
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    getQuiz: builder.query({
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
      invalidatesTags: ["Quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Quiz"],
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
      invalidatesTags: ["Quiz"],
    }),
    clearData: builder.mutation({
      query: () => ({
        url: `/clear-data`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetQuizesQuery,
  useGetQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useUploadQuizesMutation,
  useDeleteQuizMutation,
  useClearDataMutation,
} = quizApi;
