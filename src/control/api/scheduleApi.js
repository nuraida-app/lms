import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/schedule`,
    credentials: "include",
  }),
  tagTypes: ["schedules"],
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: ({ page, limit, search }) => ({
        url: "/get",
        params: { page, limit, search },
        method: "GET",
      }),
      providesTags: ["schedules"],
    }),
    getSchedulesByGrade: builder.query({
      query: (grade) => `/get-by-grade/${grade}`,
    }),
    getSchedule: builder.query({
      query: (id) => ({
        url: `/detail/${id}`,
      }),
    }),
    createSchedule: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["schedules"],
    }),
    updateSchedule: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["schedules"],
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `/update-status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["schedules"],
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["schedules"],
    }),
    clearData: builder.mutation({
      query: (body) => ({
        url: `/clear-data`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["schedules"],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetSchedulesByGradeQuery,
  useGetScheduleQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useUpdateStatusMutation,
  useDeleteScheduleMutation,
  useClearDataMutation,
} = scheduleApi;
