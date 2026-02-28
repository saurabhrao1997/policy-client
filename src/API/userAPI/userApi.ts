import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';

// Define types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  label?:string
  // Add any additional fields here
}

export interface NewUser {
  name: string;
  email: string;
  phone?: string;
  label?:string
}

export interface UpdateUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '/getalluser',
      providesTags: ['User'],
    }),
      getAllEmployee: builder.query<User[], void>({
      query: () => '/getAllEmployee',
      providesTags: ['User'],
    }),
    // getAllEmployee
    getUserById: builder.query<User, string>({
      query: (id) => `/getuser?id=${id}`,
    }),
    addUser: builder.mutation<User, NewUser>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
     createRole: builder.mutation<any, any>({
      query: (newUser) => ({
        url: '/createroletype',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),

       getAllRole: builder.query<User[], void>({
      query: () => '/getAllroletype',
      providesTags: ['User'],
    }),


   
    
    updateUser: builder.mutation<any, any>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateRoleMutation,
  useGetAllRoleQuery,
  useGetAllEmployeeQuery
} = userApi;
