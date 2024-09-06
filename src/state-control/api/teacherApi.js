import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/teacher`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Menampilkan seluruh guru
    getTeachers: builder.query({
      query: () => "/get",
    }),
    // Menampilkan guru
    getTeacher: builder.mutation({
      query: (id) => ({
        url: `/detail/${id}`,
        method: "GET",
      }),
    }),
    // Menambahkan guru
    createTeacher: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            teacherApi.endpoints.getTeachers.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    // upload guru
    uploadTeachers: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            teacherApi.endpoints.getTeachers.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Error uploading teachers:", error);
        }
      },
    }),

    // Mengedit guru
    updateTeacher: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            teacherApi.endpoints.getTeachers.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    // Mengahpus guru
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            teacherApi.endpoints.getTeachers.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    // Menghapus seluruh guru
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            teacherApi.endpoints.getTeachers.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherMutation,
  useCreateTeacherMutation,
  useUploadTeachersMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
  useClearDataMutation,
} = teacherApi;
