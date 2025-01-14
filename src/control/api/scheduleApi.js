import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/schedule`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => "/get",
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
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          scheduleApi.endpoints.getSchedules.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    updateSchedule: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          scheduleApi.endpoints.getSchedules.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `/update-status/${id}`,
        method: "PUT",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          scheduleApi.endpoints.getSchedules.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          scheduleApi.endpoints.getSchedules.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
    }),
    clearData: builder.mutation({
      query: (body) => ({
        url: `/clear-data`,
        method: "DELETE",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          scheduleApi.endpoints.getSchedules.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },
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
