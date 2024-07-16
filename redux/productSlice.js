"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductData = createAsyncThunk('product/fetchProductData', async () =>{
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log("PRODUCTS API DATA : ", data.products);
    return data.products;
});

const productSlice = createSlice({
    name: 'product',
    initialState:{
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
    },
});

export default productSlice.reducer;