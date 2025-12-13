import { apiSlice } from './apiSlice';
import { USER_URL } from '../../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USER_URL, 
        method: 'GET',
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 100
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;