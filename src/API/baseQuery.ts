import {fetchBaseQuery, type BaseQueryApi, type FetchArgs } from '@reduxjs/toolkit/query/react';

  const apiUrl = import.meta.env.VITE_API_URL;
export const baseQuery = fetchBaseQuery({
  baseUrl: `${apiUrl}/v1/`,
  prepareHeaders: (headers, { getState }) => {
    console.log('Preparing headers with token:', getState());
    const token = (getState() as { tokenSlice: { token: string } }).tokenSlice.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  // credentials: 'include', // optional: if using httpOnly cookies
});

// AUTO REFRESH TOKEN LOGIC
export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result?.error?.status === 401) {
  //   // Try refresh token
  //   const refreshResult = await baseQuery(
  //     {
  //       url: '/auth/refresh',
  //       method: 'POST',
  //       body: { refreshToken: api.getState().auth.refreshToken },
  //     },
  //     api,
  //     extraOptions
  //   );

  //   if (refreshResult?.data) {
  //     // store new token
  //   //   api.dispatch(setToken(refreshResult.data));
  //     // retry original request
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(clearToken());
  //   }
  // }

  return result;
};