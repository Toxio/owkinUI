import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './api.constant';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }), // Set the base URL for the API
  endpoints: (builder) => ({

    getList: builder.query({
      query: () => ({
        url: '/job',
      }),
    }),

    createJob: builder.mutation({
      query: (formData) => ({
        url: '/job',
        method: 'POST',
        body: formData,
      }),
    }),

    getJobById: builder.query({
      query: (id) => `/job/${id}`,
    }),
  }),
});

export const {
  useGetListQuery,
  useCreateJobMutation,
  useGetJobByIdQuery,
} = api;
