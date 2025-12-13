import { apiSlice } from './apiSlice';
import { PRODUCT_URL } from '../../constants';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bulkUploadProducts: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `${PRODUCT_URL}/bulk-upload`,
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['Products'],
    }),
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
        method: 'GET',
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 100
    }),
  }),
});

export const { useBulkUploadProductsMutation, useGetProductsQuery } = productApiSlice;