import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/grade`,
    credentials: "include",
  }),
  tagTypes: ["grade", "grades"],
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: () => "/get",
      providesTags: ["grades"],
    }),
    createGrade: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["grades"],
    }),
    deleteGrade: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["grades"],
    }),
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      invalidatesTags: ["grades"],
    }),
  }),
});

export const {
  useCreateGradeMutation,
  useDeleteGradeMutation,
  useClearDataMutation,
  useGetGradesQuery,
} = gradeApi;
