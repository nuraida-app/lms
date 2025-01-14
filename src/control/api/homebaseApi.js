import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homebaseApi = createApi({
  reducerPath: "homebaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/homebase`,
  }),
  tagTypes: ["homebases", "homebase"],
  endpoints: (builder) => ({
    getHomebases: builder.query({
      query: () => `/get`,
      providesTags: ["homebases"],
    }),
    addHomebase: builder.mutation({
      query: (body) => ({
        url: `/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["homebases"],
    }),
    getHomebase: builder.query({
      query: (id) => `/get-detail/${id}`,
      providesTags: ["homebase"],
    }),
    deleteHomebase: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["homebases"],
    }),
  }),
});

export const {
  useGetHomebasesQuery,
  useAddHomebaseMutation,
  useGetHomebaseQuery,
  useDeleteHomebaseMutation,
} = homebaseApi;
