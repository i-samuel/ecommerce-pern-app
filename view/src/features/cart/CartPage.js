import React, { useEffect, useState } from "react";
import { loadCart, selectCartItems, selectCartTotal, changeSingleQuantity } from "./cartSlice";
import { useDispatch,useSelector } from "react-redux";
import { deleteItemCart, emptyCart, updateCart } from "../../utils";
import CartItem from "../../Components/CartItem/CartItem";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './cartPage.css';
import CartSummary from "../../Components/CartSummary/CartSummary";


export default function CartPage() {
    const [quantityVals, setQuantityVals] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);  
    const[timer, setTimer] = useState({status: false, timerId: 0, itemId: null});

    //console.log('cartItems',cartItems);
    //console.log("timer0", timer);
    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    useEffect(() => {
        let obj = {};
        for(const item in cartItems){
            obj[item] = cartItems[item].cart_quantity;
        };
        setQuantityVals(obj);
    },[cartItems]);
    //console.log(quantityVals);
    

    const handleChange = (value, itemId) => {        

        setQuantityVals((prevState) => ({...prevState, [itemId]: value}));
        
        if(timer.status && timer.itemId === itemId){
            clearTimeout(timer.timerId);
            console.log("timer1", timer);
        }

        const newQuantity = parseInt(value);
        const prevQuantity = cartItems[itemId].cart_quantity;
        if(newQuantity && newQuantity > 0 && value%1 == 0){                            
            
            let t = setTimeout(async () =>{
                
                dispatch(changeSingleQuantity({id: itemId, quantity: newQuantity}));
                const cartSuccess = await updateCart(itemId, newQuantity);
                if(cartSuccess){        
                    alert("cart updated");
                } else {
                    alert("Error updating");
                    dispatch(changeSingleQuantity({id: itemId, quantity: prevQuantity}));
                }
            }, 2000);

            setTimer({timerId: t, status: true, itemId: itemId});
            console.log("timer2", timer);
        }
        
    }

    const handleIncrement = (itemId) => {
        const currentVal = parseInt(quantityVals[itemId]);
        if(currentVal && currentVal >= 0) {
            handleChange(currentVal + 1, itemId);
        }
         
     }
 
     const handleDecrement = (itemId) => {
        const currentVal = parseInt(quantityVals[itemId]);
        if(parseInt(currentVal) && currentVal > 1) {
            handleChange(currentVal - 1, itemId);
        }
     }

     const handleRemove = async (itemId) => {
        const removeSuccess = await deleteItemCart(itemId);
        if(removeSuccess){
            dispatch(loadCart());
        } else {
            alert("request failed");
        }
     }

     const handleEmptyCart = async () => {        
        if(Object.keys(cartItems).length) {
            const success = await emptyCart();
            if(!success){
                alert("request failed");
            } 
            dispatch(loadCart());
        }
     }

    const handleUnfocus = (e, itemId) => {
        const value = parseFloat(e.target.value);
        if(!value || value < 0 || value%1 !== 0){
            setQuantityVals((prevState) => ({...prevState, [itemId]: cartItems[itemId].cart_quantity}));
            alert("Please Enter Valid Value!!!");            
        }
    }    

    const returnList = (obj) => {
        const returnArr = [];
        for(const item in obj){
            
            returnArr.push(
            (
                <CartItem itemObj={cartItems[item]} handleChange={handleChange} handleUnfocus={handleUnfocus} incrementHandler={handleIncrement} decrementhandler={handleDecrement} removeHandler={handleRemove} qty={quantityVals[item]} timer={timer}/>
            
            ));                
        }        
        return returnArr;
    }

    const cartLength = Object.keys(cartItems).length;

    return(        
        <div className="container px-0">
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
                    <CartSummary total={cartTotal} shipping={0} tax={0}/>
                </div>

                :
                <div className="row justify-content-center cart-empty-note">
                    <div className="col-md-5 text-center px-3">
                        <p class="fs-2">No Items in the Cart. </p>
                    
                        <Link className="btn btn-primary py-3 px-4 fs-4 mt-4" to='/shop'>Browse Products</Link>
                    </div>
                </div>
                
            }
        </div>       
    )  
}

