import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectAllProducts } from "../productsList/productsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadProductData, selectProductData } from "./singleProductSlice";

export default function SingleProduct() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector(selectProductData);  
    let product = useSelector(selectProductData);

    useEffect(() => {
        dispatch(loadProductData(id));
    },[dispatch])
    console.log(product.image_url);
    const getData = ()=> {     
        let product = products.find(item => item.id === id);   
        if(!product) {

        }
    }
    return(
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <img class="img-fluid" src={`/images/${product.image_url}`}/>
                </div>
                <div class="col-sm-6">
                    <h1>{product.title}</h1>
                    <p>{`$${product.price}`}</p>
                    <div class="col-1">
                        <input class="form-control" type="number" min="1" max={product.quantity}/>
                    </div>                    
                    <div class="col-4 my-3">
                        <button type="submit" class="btn btn-primary mb-3">Add to Cart</button>
                    </div>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
        
    )
}