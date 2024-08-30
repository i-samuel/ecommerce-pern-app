import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadProducts = createAsyncThunk(
    'productsList/loadProducts',
    async() => {
        try{
            console.log('here 1');
            const endpoint = 'http://localhost:4001/api/products/';
            const response = await fetch(endpoint);
            console.log(response);
            if(response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse;
            }
        } catch(e) {
            console.error('Error getting products data.');
        }
    }
)

export const productsListSlice = createSlice({
    name: 'productsList',
    initialState : {
        products: [],
        isLoadingProducts: false,
        failedLoadingProducts: false,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.isLoadingProducts = true;
                state.failedLoadingProducts = false;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.isLoadingProducts = false;
                state.failedLoadingProducts = false;
                state.products = action.payload;
            })
            .addCase(loadProducts.rejected, (state) => {
                state.isLoadingProducts = false;
                state.failedLoadingProducts = true;
            })
    }
})

export const selectAllProducts = (state) => state.productsList.products;
export const isLoadingProducts = (state) => state.productsList.isLoadingProducts;


export default productsListSlice.reducer;