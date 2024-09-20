import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { selectAllProducts } from "../productsList/productsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingProduct, loadProductData, selectProductData } from "./singleProductSlice";
import { updateCart } from "../../utils";

export default function SingleProduct() {

    const [ cartCount, setCartCount ] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    //const products = useSelector(selectProductData); 
    const isLoading = useSelector(isLoadingProduct);
    let product = useSelector(selectProductData);   
    
    
    const {  title, price, description, quantity, image_url  } = product || {};

    useEffect(() => {
        dispatch(loadProductData(id));
    },[dispatch, id])
    //console.log(product.image_url);
    /*const getData = ()=> {     
        let product = products.find(item => item.id === id);   
        if(!product) {

        }
    }*/
    //console.log(cartCount);
    /*
    if(!product){
        navigate('/');
        return;
    }
    */
    const handeAddToCart = async () => {
        if(cartCount > 0){
            const status = await updateCart(product.id, cartCount);
            if(status) {
                alert('success');
            } else {
                alert('failed');
            }
        }        
    }

    

    const incrementCount = () => {
        if(quantity > cartCount) {
            setCartCount(cartCount + 1);
        }
    }

    const decrementCount = () => {
        if (cartCount > 1) {
            setCartCount(cartCount - 1);
        }
    }

    const handleChange = (e) => {
        if(e.target.value == '') {
            setCartCount(1);
            
        } else {
            const val = parseInt(e.target.value);
            //console.log('val', val);
            //console.log(typeof(val));
            if(val > quantity) {
                setCartCount(quantity);
            } else if(val < 1) {
                setCartCount(1);
            }  else {
                setCartCount(val);
            }
        }
        
    }

    if (isLoading) {
        return <p>Loading Data</p>
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <img className="img-fluid" src={`/images/${image_url}`}/>
                </div>
                <div className="col-sm-6">
                    <h1>{title}</h1>
                    <p>{`$${price}`}</p>

                    {quantity > 0 ?
                        <>
                            <div className="row">
                                <div class="col-4">
                                    <div class="input-group">
                                        <button onClick={incrementCount}>+</button>                                
                                        <input className="form-control w-100" type="number" value={cartCount} min="0" max={quantity} onInput={handleChange}/>                                
                                        <button onClick={decrementCount}>-</button>
                                    </div>
                                    <div className="col mt-4 mb-3">
                                        <button onClick={handeAddToCart} className="btn btn-danger">Add to Cart</button>
                                    </div>
                                      
                                </div>
                            </div>                    
                             
                        </>                
                     : <p class="text-danger">Product Out of Stock</p>
                    }
                    
                    <p>{description}</p>
                </div>
            </div>
        </div>
        
    )
}