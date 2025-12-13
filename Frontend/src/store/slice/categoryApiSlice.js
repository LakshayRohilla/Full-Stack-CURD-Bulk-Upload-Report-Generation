import { apiSlice } from './apiSlice';
import { CATEGORY_URL } from '../../constants';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL, 
        method: 'GET',
      }),
      providesTags: ['Categories'],
      keepUnusedDataFor: 100
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;