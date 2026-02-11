import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from '../API/ChatApi';
import { policyApi } from '../API/Policy/policy';
import { userApi } from '../API/userAPI/userApi';
import counterSlice from './Slice/Increment';
import TokenSlice from './Slice/TokenSlice';
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    tokenSlice: TokenSlice,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [policyApi.reducerPath]: policyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware)
                          .concat(chatApi.middleware)
                          .concat(policyApi.middleware),
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch