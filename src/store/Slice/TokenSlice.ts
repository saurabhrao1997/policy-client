// src/redux/slices/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null, // Initialize with token from localStorage or set to null
  userId:localStorage.getItem('userId') || null
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
      setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Clear token from localStorage
      localStorage.removeItem('userId'); // Clear userId from localStorage
      
    },
  },
});

export const { setToken, clearToken,setUserId } = tokenSlice.actions;
export default tokenSlice.reducer;
export const selectToken = (state:any) => state.token;
