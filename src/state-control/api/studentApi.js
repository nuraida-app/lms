import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { classApi } from "./classApi";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/student`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/student-profile",
    }),
    getStudents: builder.query({
      query: () => `/get`,
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
    getStudentByHomebase: builder.query({
      query: () => `/get-by-homebase`,
    }),
    getStudentsByGrade: builder.query({
      query: (grade) => ({
        url: `/get-by-grade/${grade}`,
      }),
    }),
    getStudentsByClass: builder.query({
      query: (classCode) => `/get-by-class/${classCode}`,
    }),
    createStudent: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          studentApi.endpoints.getStudents.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    addStudentToClass: builder.mutation({
      query: (body) => ({
        url: "/add-student-to-class",
        method: "POST",
        body,
      }),
      async onQueryStarted({ code }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            studentApi.endpoints.getStudentsByClass.initiate(code, {
              forceRefetch: true,
            })
          );
          // Trigger getClasses after successful operation
          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Failed to refetch classes:", error);
        }
      },
    }),
    uploadStudents: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          studentApi.endpoints.getStudents.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    uploadToClass: builder.mutation({
      query: ({ gradeId, code, body }) => ({
        url: `/upload-to-class/${gradeId}/${code}`,
        method: "POST",
        body,
      }),
      async onQueryStarted({ code }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            studentApi.endpoints.getStudentsByClass.initiate(code, {
              forceRefetch: true,
            })
          );
          // Trigger getClasses after successful operation
          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Failed to refetch classes:", error);
        }
      },
    }),
    updateStudent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          studentApi.endpoints.getStudents.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          studentApi.endpoints.getStudents.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    removeStudentFromClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/remove-from-class/${id}`,
        method: "DELETE",
        body,
      }),
      async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            studentApi.endpoints.getStudentsByClass.initiate(body.code, {
              forceRefetch: true,
            })
          );
          // Trigger getClasses after successful operation
          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Failed to refetch classes:", error);
        }
      },
    }),
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          studentApi.endpoints.getStudents.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetStudentsQuery,
  useGetStudentMutation,
  useStudentDetailQuery,
  useGetStudentByHomebaseQuery,
  useGetStudentsByGradeQuery,
  useGetStudentsByClassQuery,
  useCreateStudentMutation,
  useUploadStudentsMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useClearDataMutation,
  useAddStudentToClassMutation,
  useRemoveStudentFromClassMutation,
  useUploadToClassMutation,
} = studentApi;
