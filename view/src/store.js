import { configureStore } from "@reduxjs/toolkit";
import productsListSlice from "./features/productsList/productsListSlice";
import singleProductSlice from "./features/singleProduct/singleProductSlice";

export default configureStore({
    reducer: {
        productsList: productsListSlice,
        singleProduct: singleProductSlice
    }
});