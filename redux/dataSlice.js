"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSimpleData = createAsyncThunk('data/fetchSimpleData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log("API DATA: ", data);
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSimpleData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSimpleData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSimpleData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
  },
});

export default dataSlice.reducer;
