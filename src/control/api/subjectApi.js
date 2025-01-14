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
      query: ({ page, limit, search }) => ({
        url: "/get",
        params: { page, limit, search },
        method: "GET",
      }),
      providesTags: ["subject"],
    }),
    getSubject: builder.query({
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
    deleteSubject: builder.mutation({
      query: (code) => ({
        url: `/delete/${code}`,
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
  useGetSubjectQuery,
  useDeleteSubjectMutation,
  useDeleteSubjectsMutation,
  useGetSubjectsClassQuery,
} = subjectApi;
