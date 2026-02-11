import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';

// Define types
export interface Policy {
  id: string;
  name: string;
  email: string;
  phone?: string;
  // Add any additional fields here
}

export interface NewUser {
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export const policyApi = createApi({
  reducerPath: 'policyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Policy', 'Post'],
  endpoints: (builder) => ({
    getAllPolicys: builder.query<Policy[], void>({
      query: () => '/getAllPolicy',
      providesTags: ['Policy'],
    }),
    getPolicyById: builder.query<Policy, string>({
      query: (id) => `/getPolicy?id=${id}`,
         providesTags: ['Policy'],
    }),
       getDownloadPolicyById: builder.query<Policy, string>({
      query: (id) => `/downloadpolicy?id=${id}`,
         providesTags: ['Policy'],
    }),
    CreatePolicy: builder.mutation<Policy, NewUser>({
      query: (newUser) => ({
        url: '/createPolicy',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Policy'],
    }),
     CreatePolicyType: builder.mutation<Policy, NewUser>({
      query: (newUser) => ({
        url: '/createpolicytype',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Policy'],
    }),
     getAllPolicyType: builder.query<Policy[], void>({
      query: () => '/getAllpolicytype',
      providesTags: ['Policy'],
    }),
    updatePolicy: builder.mutation<Policy, UpdateUser>({
      query: ({ id, ...patch }) => ({
        url: `/updatePolicy/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Policy'],
    }),
    deletepolicy: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Policy'],
    }),
  }),
});

export const {
 useCreatePolicyMutation,
 useDeletepolicyMutation,
 useGetAllPolicysQuery,
 useGetPolicyByIdQuery,
 useUpdatePolicyMutation,
 useCreatePolicyTypeMutation,
 useGetAllPolicyTypeQuery,
 useGetDownloadPolicyByIdQuery
} = policyApi;
