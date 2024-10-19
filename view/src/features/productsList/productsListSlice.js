import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadProducts = createAsyncThunk(
    'productsList/loadProducts',
    async(dataObj) => {
        try{       
            if(!('type' in dataObj)){
                return Promise.reject();
            }
            let endpoint;
            switch(dataObj.type){
                case 'category':
                    if('catId' in dataObj){
                        endpoint = `/api/category/${dataObj.catId}`;
                        break;
                    }
                case 'search':
                    if('searchTerm' in dataObj){
                        endpoint = `/api/products/search?searchTerm=${dataObj.searchTerm}`;
                        break;
                    }
                default:
                    endpoint = '/api/products/';
                    break;
            }
            
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if(response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            } else {
                return Promise.reject();
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
                state.products = action.payload.products;
            })
            .addCase(loadProducts.rejected, (state) => {
                state.isLoadingProducts = false;
                state.failedLoadingProducts = true;
            })
    }
})

export const selectAllProducts = (state) => state.productsList.products;
export const isLoadingProducts = (state) => state.productsList.isLoadingProducts;
export const failedLoadProducts = (state) => state.productsList.failedLoadingProducts;

export default productsListSlice.reducer;