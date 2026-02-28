import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';


export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['chat', 'Post'],
  endpoints: (builder) => ({
    getSidebarUserList: builder.query<any, void>({
      query: () => '/messages/sidebar-users',
      providesTags: ['chat'],
    }),
   
          getMassagesBetweenUsers: builder.query<any, string>({
      query: (receiverId) => `/messages/${receiverId}`,
      providesTags: ['chat'],
    }),
         markmassagesAsSeen: builder.query<any, string>({
      query: (massageId) => `/messages/mark-seen/${massageId}`,
      providesTags: ['chat'],
    }),
      sendMassage: builder.mutation<any, any>({
      query: (body) => ({
        url: `/messages/send`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['chat'],
    }),

   
     createChat: builder.mutation<any, any>({
      query: (newUser) => ({
        url: '/chat',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['chat'],
    }),

    getAllChats: builder.query<any[], void>({
      query: () => '/chat',
      providesTags: ['chat'],
    }),

  
  }),
});

export const {
  useCreateChatMutation,
  useGetAllChatsQuery,
  useGetSidebarUserListQuery,
  // useGetUsersForSideBarQuery,
  useGetMassagesBetweenUsersQuery,
  useMarkmassagesAsSeenQuery,
  useSendMassageMutation
} = chatApi;
