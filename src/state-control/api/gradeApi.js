import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/grade`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: () => "/get",
    }),
    createGrade: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFullfilled }) {
        try {
          await queryFullfilled;

          dispatch(
            gradeApi.endpoints.getGrades.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteGrade: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFullfilled }) {
        try {
          await queryFullfilled;

          dispatch(
            gradeApi.endpoints.getGrades.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFullfilled }) {
        try {
          await queryFullfilled;

          dispatch(
            gradeApi.endpoints.getGrades.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useCreateGradeMutation,
  useDeleteGradeMutation,
  useClearDataMutation,
  useGetGradesQuery,
} = gradeApi;
