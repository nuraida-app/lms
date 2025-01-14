import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://ppdb-api.nibs.sch.id/statistik`,
    credentials: "include",
  }),
  endpoints: (buidder) => ({
    getMedia: buidder.query({
      query: () => "/sosial-media",
    }),
  }),
});

export const { useGetMediaQuery } = mediaApi;
