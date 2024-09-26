import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async() => {
        try{           
            const endpoint = '/api/cart/';
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include'
            });          
            if(response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
        } catch(e) {
            console.error('Error getting cart data.');
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState : {
        //store cart state as an Object
        cartItems: {},
        cartTotal: 0.00,
        isLoadingCart: false,
        failedLoadingCart: false,
    },
    reducers: {
        //change quantity of singe item
        changeSingleQuantity: (state, action) => {
             state.cartItems[action.payload.id].cart_quantity = action.payload.quantity; 
             let newTotal = 0.00;
             for(const item in state.cartItems) {
                newTotal += state.cartItems[item].price * state.cartItems[item].cart_quantity;
             }
             state.cartTotal = parseFloat(newTotal.toFixed(2));
        },
        //empty cart
        cartEmpty: (state, action) => {
            state.cartItems= {};
            state.cartTotal= 0.00;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCart.pending, (state) => {
                state.isLoadingCart = true;
                state.failedLoadingCart = false;
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                state.isLoadingCart = false;
                state.failedLoadingCart = false;
                let itemsObj = {};
                action.payload.cart.forEach((item) => {
                    itemsObj[item.id] = item;
                });
                state.cartItems = itemsObj
                state.cartTotal = action.payload.cartTotal;
            })
            .addCase(loadCart.rejected, (state) => {
                state.isLoadingCart = false;
                state.failedLoadingCart = true;
            })
    }
})

export const { changeSingleQuantity, cartEmpty } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) => state.cart.cartTotal;
export const isLoadingCart = (state) => state.cart.isLoadingCart;

export default cartSlice.reducer;