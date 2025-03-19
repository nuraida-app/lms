import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scoreApi = createApi({
  reducerPath: "scoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/scoring`,
    credentials: "include",
  }),
  tagTypes: ["Grades", "Classes", "Students", "Scores", "Targets"],
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: () => ({
        url: "/get-grades",
        method: "GET",
      }),
      providesTags: ["Grades"],
    }),
    getClassess: builder.query({
      query: (id) => ({
        url: `/get-class/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Classes", id }],
    }),
    getStudents: builder.query({
      query: ({ page, limit, search, code }) => ({
        url: "/get-students",
        method: "GET",
        params: { page, limit, search, code },
      }),
      providesTags: ["Students"],
    }),
    addscore: builder.mutation({
      query: (body) => ({
        url: "/add-score",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Scores"],
    }),
    getTargets: builder.query({
      query: () => ({
        url: "/get-targets",
        method: "GET",
      }),
      providesTags: ["Targets"],
    }),
    addTarget: builder.mutation({
      query: (body) => ({
        url: "/add-target",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Targets"],
    }),
    deleteTarget: builder.mutation({
      query: (id) => ({
        url: `/delete-target/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Targets"],
    }),
  }),
});

export const {
  useGetGradesQuery,
  useGetClassessQuery,
  useGetStudentsQuery,
  useAddscoreMutation,
  useGetTargetsQuery,
  useAddTargetMutation,
  useDeleteTargetMutation,
} = scoreApi;
