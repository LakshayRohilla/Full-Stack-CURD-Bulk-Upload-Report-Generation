import { apiSlice } from './apiSlice';
import { CATEGORY_URL } from '../../constants';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: CATEGORY_URL, method: 'GET' }),
      providesTags: ['Categories'],
      keepUnusedDataFor: 100,
    }),
    createCategory: builder.mutation({
      query: (cat) => ({ url: CATEGORY_URL, method: 'POST', body: cat }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `${CATEGORY_URL}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;