import { apiSlice } from './apiSlice';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReport: builder.query({
      query: ({ startDate, endDate, categoryId, limit = 100, offset = 0 }) => ({
        url: '/reports/products',
        method: 'GET',
        params: { startDate, endDate, categoryId, limit, offset },
      }),
      providesTags: ['Reports'],
    }),
    downloadProductReport: builder.mutation({
      query: ({ startDate, endDate, categoryId, format = 'csv' }) => ({
        url: `/reports/products/download?format=${format}&startDate=${startDate}&endDate=${endDate}&categoryId=${categoryId}`,
        method: 'GET',
        responseHandler: async (response) => {
          // Returns Blob containing the file data
          return await response.blob();
        },
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const {
  useGetProductReportQuery,
  useDownloadProductReportMutation,
} = reportApiSlice;