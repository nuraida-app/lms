import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/class`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createClass: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    getClasses: builder.query({
      query: () => "/get",
    }),
    getClass: builder.mutation({
      query: (id) => `/detail/${id}`,
      method: "GET",
    }),
    updateClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
    clearData: builder.mutation({
      query: () => ({
        url: "/clear-data",
        method: "DELETE",
      }),
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            classApi.endpoints.getClasses.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetClassesQuery,
  useGetClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useClearDataMutation,
} = classApi;
