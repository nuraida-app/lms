import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/subject`,
    credentials: "include",
  }),
  tagTypes: ["subjects", "subject"],
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => "/get",
      providesTags: ["subject"],
    }),
    getSubject: builder.mutation({
      query: (id) => ({
        url: `/detail/${id}`,
        method: "GET",
      }),
      providesTags: ["subjects"],
    }),
    createSubject: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subjects"],
    }),
    uploadSubjects: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subjects"],
    }),
    updateSubject: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["subjects"],
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subjects"],
    }),
    deleteSubjects: builder.mutation({
      query: () => ({
        url: "/delete-data",
        method: "DELETE",
      }),
      invalidatesTags: ["subjects"],
    }),
    getSubjectsClass: builder.query({
      query: () => "/get-for-class",
      providesTags: ["subjects"],
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
  useGetSubjectsClassQuery,
} = subjectApi;
