import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadProductData = createAsyncThunk(
    'singleProduct/loadProductData',
    async(id) => {
        try{            
            const endpoint = `http://localhost:4001/api/products/${id}`;
            const response = await fetch(endpoint);
            if(response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
        } catch(e) {
            console.error('Error getting products data.');
        }
    }
)

const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState: {
        product: {},
        isLoadingProduct: false,
        failedLoadingProduct: false
    },
    reducer: {
        searchProduct: (state, action)=> {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProductData.pending, (state) => {
                state.isLoadingProduct = true;
                state.failedLoadingProduct = false;
            })
            .addCase(loadProductData.fulfilled, (state, action) => {
                state.isLoadingProduct = false;
                state.failedLoadingProduct = false;
                state.product = action.payload;
            })
            .addCase(loadProductData.rejected, (state) => {
                state.isLoadingProduct = false;
                state.failedLoadingProduct = true;
            })
    }
})

export const selectProductData = (state) => state.singleProduct.product;

export const isLoadingProduct = (state) => state.singleProduct.isLoadingProduct;

export default singleProductSlice.reducer;