import productsListReducer from "./features/productsList/productsListSlice";
import singleProductReducer from "./features/singleProduct/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import accountReducer from "./features/account/accountSlice";
import sessionReducer from "./features/session/sessionSlice";

const reducer = {
        productsList: productsListReducer,
        singleProduct: singleProductReducer,
        cart: cartReducer,
        account: accountReducer,
        session: sessionReducer    
};

export default reducer;