import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { failedLoadProducts, isLoadingProducts, loadProducts, selectAllProducts } from "../../features/productsList/productsListSlice";
import ProductsList from "../ProductsList/ProductsList";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryPage(){
    const { id, title }= useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const isFailed = useSelector(failedLoadProducts);
    const products = useSelector(selectAllProducts);
    const navigate = useNavigate();

    const isValid = parseInt(id);

    useEffect(() => {
        if(!isValid || isFailed){
            navigate('/shop');           
        }
        dispatch(loadProducts(isValid));  
    },[dispatch, isFailed]);    

    return(
        <div className="container pt-5">
            {isLoading ? 'Loading Products' :
            <>
                <h1 class="display-6 text-capitalize">{title}</h1> 
                <ProductsList itemArr={products}/>
            </>            
            }           
        </div>
    )
    
}