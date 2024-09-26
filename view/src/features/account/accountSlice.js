import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadAccount = createAsyncThunk(
    'cart/loadAccount',
    async(userId) => {
        try{
            const endpoint = `http://localhost:4001/api/users/${userId}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include'
            });
            if(response.ok) {
                const jsonResponse = await response.json();              
                return jsonResponse;
            }
        } catch(e) {
            console.error('Error getting User data.');
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        personalInfo: {},
        shipping: [],
        isLoading: false,
        isFailedLoading: false

    },
    reducers: {
        removeAccount: (state, action) => {
            state.personalInfo = {};
            state.shipping =  [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAccount.pending, (state) => {
                state.isLoading = true;
                state.isFailedLoading = false;
            })
            .addCase(loadAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isFailedLoading = false;
                state.personalInfo = action.payload.personalInfo;
                state.shipping = action.payload.addresses;
                state.defaultShipping = action.payload.addresses
            })
            .addCase(loadAccount.rejected, (state) => {
                state.isLoading = false;
                state.isFailedLoading = true;
            })
    }
})

export const { removeAccount } = accountSlice.actions;
export const selectInfo = (state) => state.account.personalInfo;
export const selectAddresses = (state) => state.account.shipping;
export const isLoadingAccount = (state) => state.account.isLoading;
export const selectDefault = (state) => state.account.shipping.find((item) => item.isdefault === true);
export const selectExtra = (state) => state.account.shipping.filter((item) => item.isdefault !==true);

export default accountSlice.reducer;