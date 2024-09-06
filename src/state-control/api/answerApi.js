import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const answerApi = createApi({
  reducerPath: "answerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/answer`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMyAnswers: builder.query({
      query: (quizId) => ({
        url: `/get-my-answer/${quizId}`,
      }),
      providesTags: (result, error, quizId) => [
        { type: "Answers", id: quizId },
      ],
    }),
    getStudentsAnswer: builder.query({
      query: ({ quizId, gradeId }) => ({
        url: `/get-students-answer/${quizId}/${gradeId}`,
      }),
    }),

    createAnswer: builder.mutation({
      query: (body) => ({
        url: `/create`,
        method: "POST",
        body,
      }),
      async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          // Invalidate the tag to refetch the correct data
          dispatch(
            answerApi.util.invalidateTags([{ type: "Answers", id: quizId }])
          );
        } catch (error) {
          console.error("Error updating answers after createAnswer", error);
        }
      },
    }),
    doubtAnswer: builder.mutation({
      query: (body) => ({
        url: "/doubt",
        method: "PUT",
        body,
      }),
      async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          // Invalidate the tag to refetch the correct data
          dispatch(
            answerApi.util.invalidateTags([{ type: "Answers", id: quizId }])
          );
        } catch (error) {
          console.error("Error updating answers after createAnswer", error);
        }
      },
    }),
    giveScore: builder.mutation({
      query: ({ id, body }) => ({
        url: `/give-score-essay/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ body }, { queryFulfilled, dispatch }) {
        const { quizId, gradeId } = body;
        try {
          await queryFulfilled;
          dispatch(
            answerApi.util.invalidateTags([{ type: "Answers", id: quizId }])
          );
          dispatch(
            answerApi.endpoints.getStudentsAnswer.initiate(
              { quizId, gradeId },
              {
                forceRefetch: true,
              }
            )
          );
        } catch (error) {
          console.error("Error updating answers after giveScore", error);
        }
      },
    }),

    reset: builder.mutation({
      query: ({ id, quizId }) => ({
        url: `/reset/${id}/${quizId}`,
        method: "PUT",
      }),
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
