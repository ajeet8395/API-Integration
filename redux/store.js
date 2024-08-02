"use client";
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    product: productReducer,
  },
});