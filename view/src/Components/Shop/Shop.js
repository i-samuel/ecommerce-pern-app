import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { loadProducts, selectAllProducts,isLoadingProducts } from "../../features/productsList/productsListSlice";
import ProductsList from "../ProductsList/ProductsList";

export default function Shop() {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const products = useSelector(selectAllProducts);
    
    useEffect(() => {
        dispatch(loadProducts({type: 'default'}));
    },[dispatch]);

    return(
        <div className="container pt-5">
            <h1 class="display-6 text-capitalize">All Products</h1> 
            {isLoading ? 'Loading Products' : 
            <ProductsList itemArr={products}/>
            }           
        </div>
    );
}