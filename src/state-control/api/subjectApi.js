import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/subject`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getSubjects: builder.query({ query: () => "/get" }),
    getSubject: builder.mutation({
      query: (id) => ({
        url: `/detail/${id}`,
        method: "GET",
      }),
    }),
    createSubject: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            subjectApi.endpoints.getSubjects.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    uploadSubjects: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            subjectApi.endpoints.getSubjects.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    updateSubject: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            subjectApi.endpoints.getSubjects.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            subjectApi.endpoints.getSubjects.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    deleteSubjects: builder.mutation({
      query: () => ({
        url: "/delete-data",
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            subjectApi.endpoints.getSubjects.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useCreateSubjectMutation,
  useUploadSubjectsMutation,
  useGetSubjectsQuery,
  useGetSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useDeleteSubjectsMutation,
} = subjectApi;
