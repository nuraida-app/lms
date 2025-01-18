import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/class`,
    credentials: "include",
  }),
  tagTypes: ["class", "classes"],
  endpoints: (builder) => ({
    createClass: builder.mutation({
      query: ({ body, id }) => ({
        url: "/create",
        method: "POST",
        params: { id },
        body,
      }),
      invalidatesTags: ["classes"],
    }),
    getClasses: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/get`,
        params: { page, limit, search },
        method: "GET",
      }),
      providesTags: ["classes"],
    }),
    getClassByGrade: builder.query({
      query: (gradeId) => ({
        url: `/get-by-grade`,
        params: { gradeId },
        method: "GET",
      }),
    }),
    getClass: builder.mutation({
      query: (id) => `/detail/${id}`,
      providesTags: ["class"],
    }),
    updateClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["classes"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["classes"],
    }),
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      invalidatesTags: ["classes"],
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetClassesQuery,
  useGetClassByGradeQuery,
  useGetClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useClearDataMutation,
} = classApi;
