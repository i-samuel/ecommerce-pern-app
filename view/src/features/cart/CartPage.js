import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, selectCartItems, selectCartTotal, changeSingleQuantity } from "./cartSlice";
import { deleteItemCart, emptyCart, updateCart } from "../../utils";
import CartItem from "../../Components/CartItem/CartItem";
import CartSummary from "../../Components/CartSummary/CartSummary";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './cartPage.css';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal); 

    const cartLength = Object.keys(cartItems).length;

    //set quantities of each cart item
    const [quantityVals, setQuantityVals] = useState({}); 

    //set timer to execute cart amount changing leading to cart update requests
    const[timer, setTimer] = useState({status: false, timerId: 0, itemId: null});

    //load cart 
    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    //Set quantityVals when cart items slice state update
    useEffect(() => {
        let obj = {};
        for(const item in cartItems){
            obj[item] = cartItems[item].cart_quantity;
        };
        setQuantityVals(obj);
    },[cartItems]);    

    //Handle cart item value change
    const handleChange = (value, itemId) => {        

        //update quantityVals local state on every change
        setQuantityVals((prevState) => ({...prevState, [itemId]: value}));
        
        //since timer state itemId is assigned product id, this prevents sending requests on every input change
        //avoids if previous timer is for other product
        if(timer.status && timer.itemId === itemId){
            clearTimeout(timer.timerId);
        }

        //new value
        const newQuantity = parseInt(value);
        //previous value
        const prevQuantity = cartItems[itemId].cart_quantity;

        //check for invalid inputs
        if(newQuantity && newQuantity > 0 && value%1 == 0){                            
            
            //timeout to update cart
            let t = setTimeout(async () =>{
                
                //update slice state
                dispatch(changeSingleQuantity({id: itemId, quantity: newQuantity}));
                //send server request
                const cartSuccess = await updateCart(itemId, newQuantity);

                if(cartSuccess){        
                    alert("cart updated");
                } else {
                    alert("Error updating");
                    //if falied update slice state value to previous value
                    dispatch(changeSingleQuantity({id: itemId, quantity: prevQuantity}));
                }
            }, 2000);

            //set timer
            setTimer({timerId: t, status: true, itemId: itemId});
        }        
    }

    //handle increment 
    const handleIncrement = (itemId) => {
        const currentVal = parseInt(quantityVals[itemId]);
        if(currentVal && currentVal >= 0) {
            handleChange(currentVal + 1, itemId);
        }         
     }
     
     //handle decrement
     const handleDecrement = (itemId) => {
        const currentVal = parseInt(quantityVals[itemId]);
        if(parseInt(currentVal) && currentVal > 1) {
            handleChange(currentVal - 1, itemId);
        }
     }

     //handle item remove
     const handleRemove = async (itemId) => {
        const removeSuccess = await deleteItemCart(itemId);
        if(removeSuccess){
            dispatch(loadCart());
        } else {
            alert("request failed");
        }
     }

     //handle empty cart
     const handleEmptyCart = async () => {        
        if(Object.keys(cartItems).length) {
            const success = await emptyCart();
            if(!success){
                alert("request failed");
            } 
            dispatch(loadCart());
        }
     }

    //handle input un focus event
    const handleUnfocus = (e, itemId) => {
        const value = parseFloat(e.target.value);
        if(!value || value < 0 || value%1 !== 0){
            setQuantityVals((prevState) => ({...prevState, [itemId]: cartItems[itemId].cart_quantity}));
            alert("Please Enter Valid Value!!!");            
        }
    }

    //cart item list
    const returnList = (obj) => {
        const returnArr = [];
        for(const item in obj){            
            returnArr.push(
            (
                <CartItem key={cartItems[item].id} itemObj={cartItems[item]} 
                        handleChange={handleChange} 
                        handleUnfocus={handleUnfocus} 
                        incrementHandler={handleIncrement} 
                        decrementhandler={handleDecrement} 
                        removeHandler={handleRemove} 
                        qty={quantityVals[item]} 
                        timer={timer}
                />            
            ));                
        }        
        return returnArr;
    }

    return(        
        <div className="container px-0 mb-5">
            <div className="row mt-4 mb-5 mx-1">
              <div className="col-sm-6">
                <h1 className="fs-4 text-uppercase fw-normal text-center text-sm-start">Shopping Cart</h1> 
              </div>
              {cartLength ? 
                <div className="col-sm-6 col-md-2 p-0 d-flex align-items-center justify-content-center justify-content-sm-end cart-empty mt-3 mt-sm-0">
                    <button onClick={handleEmptyCart} className=" btn btn-secondary rounded-0 bg-white text-black cart-empty-btn">
                        <span>Remove All  </span> 
                        <FontAwesomeIcon icon={faXmark} style={{color: "#000",}} />
                    </button>
                </div>
              : ''}
              
              <div className="col-4">               
              </div>
            </div>
                      
            {cartLength ? 
                <div className="row mx-1">
                    <div className="col-md-8 px-2">
                        {returnList(cartItems, handleChange)}                
                    </div>
                    <div className="col-md-4 text-center cart-summary">
                        <div className="bg-light h-100 py-5 px-4">
                            <CartSummary total={cartTotal} shipping={0} tax={0}/>
                            <button className="btn btn-dark checkout-btn rounded-0 w-100 mt-5">
                                <Link  to="/checkout">
                                    Checkout
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div className="row justify-content-center cart-empty-note">                    
                        <div className="col-md-5 text-center px-3">
                            <p className="fs-2">No Items in the Cart. </p>                        
                            <Link className="btn btn-dark rounded-0 py-3 px-4 fs-4 mt-4" to='/shop'>Browse Products</Link>
                        </div>                    
                </div>                
            }
        </div>       
    )  
}

