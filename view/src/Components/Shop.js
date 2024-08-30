import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../utils"; 
import ProductCard from "./ProductCard/ProductCard";
import { loadProducts, selectAllProducts,isLoadingProducts } from "../features/productsList/productsListSlice";

export default function Shop() {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const products = useSelector(selectAllProducts);
    console.log('shop 1');
    useEffect(() => {
        dispatch(loadProducts());
    },[dispatch]);

    console.log(products);

    return(
        <div class="container">
            <div class="row row-cols-2 row-cols-md-3">
                {products === '' ? 'hellooo' : products.map(item => 
                    <ProductCard product={item}/>
                )}
            </div>            
        </div>
    );
}