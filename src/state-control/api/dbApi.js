import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dbApi = createApi({
  reducerPath: "dbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE}/database`,
    credentials: "include",
  }),
  tagTypes: ["Student", "Database"], // Add tagTypes to support cache invalidation
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: () => ({
        url: `/get-provinces`,
      }),
    }),
    getRegencies: builder.query({
      query: (provinceId) => ({
        url: `/get-regencies/${provinceId}`,
      }),
    }),
    getDistricts: builder.query({
      query: (regencyId) => ({
        url: `/get-districts/${regencyId}`,
      }),
    }),
    getVillages: builder.query({
      query: (districtId) => ({
        url: `/get-villages/${districtId}`,
      }),
    }),
    getDatabase: builder.query({
      query: () => ({
        url: `/get-database`,
      }),
      providesTags: ["Database"],
    }),
    getStudent: builder.query({
      query: (nis) => ({
        url: `/get-student/${nis}`,
      }),
      providesTags: (result, error, nis) => [{ type: "Student", id: nis }], // Provide tags to be invalidated later
    }),
    addStudentData: builder.mutation({
      query: (body) => ({
        url: `/add-student-data`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { nis }) => [
        { type: "Student", id: nis },
        "Database",
      ], // Invalidate cache after mutation
    }),
    addParentsData: builder.mutation({
      query: (body) => ({
        url: `/add-parents-data`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { nis }) => [
        { type: "Student", id: nis },
        "Database",
      ], // Invalidate cache after mutation
    }),
    addFamilyData: builder.mutation({
      query: (body) => ({
        url: `/add-family-data`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { nis }) => [
        { type: "Student", id: nis },
        "Database",
      ], // Invalidate cache after mutation
    }),
    deleteFamilyData: builder.mutation({
      query: (body) => ({
        url: `/delete-family-data`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (result, error, { nis }) => [
        { type: "Student", id: nis },
        "Database",
      ], // Invalidate cache after mutation
    }),
    addHealthData: builder.mutation({
      query: (body) => ({
        url: `/add-health-data`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { nis }) => [
        { type: "Student", id: nis },
        "Database",
      ], // Invalidate cache after mutation
    }),
    deleteHealthData: builder.mutation({
      query: (body) => ({
        url: `/delete-health-data`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (result, error, { nis }) => [
        { type: "Student", id: nis },
        "Database",
      ], // Invalidate cache after mutation
    }),
    getDemographic: builder.query({
      query: () => ({
        url: `/get-demographic`,
      }),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetRegenciesQuery,
  useGetDistrictsQuery,
  useGetVillagesQuery,
  useGetDatabaseQuery,
  useGetStudentQuery,
  useAddStudentDataMutation,
  useAddParentsDataMutation,
  useAddFamilyDataMutation,
  useDeleteFamilyDataMutation,
  useAddHealthDataMutation,
  useDeleteHealthDataMutation,
  useGetDemographicQuery,
} = dbApi;
