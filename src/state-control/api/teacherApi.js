import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/teacher`,
    credentials: "include",
  }),
  tagTypes: ["teacher", "teachers"],
  endpoints: (builder) => ({
    // Menampilkan seluruh guru
    getTeachers: builder.query({
      query: () => "/get",
      providesTags: ["teachers"],
    }),
    // Menampilkan guru
    getTeacher: builder.mutation({
      query: (id) => ({
        url: `/detail/${id}`,
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),
    // Menambahkan guru
    createTeacher: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["teachers"],
    }),
    // upload guru
    uploadTeachers: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["teachers"],
    }),

    // Mengedit guru
    updateTeacher: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["teachers"],
    }),
    // Mengahpus guru
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teachers"],
    }),
    // Menghapus seluruh guru
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      invalidatesTags: ["teachers"],
    }),
    addAssignClass: builder.mutation({
      query: (body) => ({
        url: "/assign-class",
        method: "POST",
        body,
      }),
      invalidatesTags: ["teacher"],
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
  useAddAssignClassMutation,
} = teacherApi;
