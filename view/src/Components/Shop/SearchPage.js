import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { isLoadingProducts, loadProducts, selectAllProducts } from "../../features/productsList/productsListSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "../ProductsList/ProductsList";
import { escape } from "validator";

export default function SearchPage(){
    const [ searchParams, setSearchParams ] = useSearchParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const products = useSelector(selectAllProducts);

    const sTerm = escape(searchParams.get('s'));
    
    useEffect(() => {
        dispatch(loadProducts({type: 'search', searchTerm: sTerm}));        
    }, [dispatch, searchParams]);

    return(
        <div className="container pt-5">
            <h1 class="display-6">{`Search Results for \"${sTerm}\"`}</h1> 
            {isLoading ? 'Loading Products' : 
            <ProductsList itemArr={products}/>
            }           
        </div>
    );
}