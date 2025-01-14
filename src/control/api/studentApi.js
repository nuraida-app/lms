import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { classApi } from "./classApi";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/student`,
    credentials: "include",
  }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/student-profile",
    }),

    getStudents: builder.query({
      query: ({ homebase, gradeId, classCode, page, limit, search }) => ({
        url: "/get",
        method: "GET",
        params: { homebase, gradeId, classCode, page, limit, search },
      }),
      providesTags: ["Students"],
    }),

    getStudent: builder.mutation({
      query: (id) => ({
        url: `/detail/${id}`,
        method: "GET",
      }),
    }),

    studentDetail: builder.query({
      query: (id) => `/detail/${id}`,
    }),
    createStudent: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),

    addStudentToClass: builder.mutation({
      query: (body) => ({
        url: "/add-student-to-class",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),

    uploadStudents: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),

    uploadToClass: builder.mutation({
      query: ({ gradeId, code, body }) => ({
        url: `/upload-to-class/${gradeId}/${code}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),

    updateStudent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Students"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),

    removeStudentFromClass: builder.mutation({
      query: (id) => ({
        url: `/remove-from-class/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),

    clearClass: builder.mutation({
      query: (code) => ({
        url: `/clear-class/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),

    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetStudentsQuery,
  useGetStudentMutation,
  useStudentDetailQuery,
  useCreateStudentMutation,
  useUploadStudentsMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useClearDataMutation,
  useAddStudentToClassMutation,
  useRemoveStudentFromClassMutation,
  useClearClassMutation,
  useUploadToClassMutation,
} = studentApi;
