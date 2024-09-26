import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { loadProducts, selectAllProducts,isLoadingProducts } from "../../features/productsList/productsListSlice";
import ProductsList from "../ProductsList/ProductsList";

export default function Shop() {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const products = useSelector(selectAllProducts);
    
    useEffect(() => {
        dispatch(loadProducts());
    },[dispatch]);   

    return(
        <div className="container">
            {isLoading ? '' : 
            <ProductsList itemArr={products}/>
            }           
        </div>
    );
}