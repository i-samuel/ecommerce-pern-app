
/*import React, { useEffect, useState } from "react";
import { loadCart, selectCartItems, selectCartTotal, changeSingleQuantity } from "./cartSlice";
import { useDispatch,useSelector } from "react-redux";
import { updateCart } from "../../utils";
import cartSlice from "./cartSlice";


export default function CartPage() {
   // const [quantityVals, setquantityVals] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);   
    let timeout = 0;

    if(timeout){
        console.log(timeout, "timer is true");
    }
    console.log('cartItems',cartItems);
    useEffect(() => {
        console.log("useeffect here");
        dispatch(loadCart());
    }, [dispatch]);
/*
    useEffect(() => {
        let obj = {};
        cartItems.forEach((item) => {
            obj[item.id] = item.cart_quantity;
        })
        setquantityVals(obj);
    },[cartItems]);*/
/*
    const handle2 = async (e) => {
        const itemId = e.target.dataset.id;
        const prevQuantity = cartItems.find((item) => item.id == itemId).cart_quantity;
        const newQuantity = parseInt(e.target.value);
        dispatch(changeSingleQuantity({id: itemId, quantity: newQuantity}));
        const cartSuccess = await updateCart(itemId, newQuantity);
        if(cartSuccess){            
           
            alert("cart updated");
        } else {
            alert("Error updating");
            dispatch(loadCart());
        }
    }
    /*
    const handleCountChange = (e) => {
        if(timeout) clearTimeout(timeout);
        const itemId = e.target.dataset.id;
        if(e.target.value != quantityVals[itemId] ){
            console.log('changed');
        }
        const newQuantity = parseInt(e.target.value);
        
        setquantityVals((obj) => ({...obj, [itemId]: newQuantity}));

        
        console.log(itemId);
                     
        timeout = setTimeout(()=>{
            sendCartChangeRequest(itemId, newQuantity, e);
        }, 2000)
        
        
    }

    const sendCartChangeRequest = async (itemId, newQuantity, e) => {
        const prevQuantity = cartItems.find((item) => item.id == itemId).cart_quantity;
        const cartSuccess = await updateCart(itemId, newQuantity);
        if(cartSuccess){            
            dispatch(changeSingleQuantity({id: itemId, quantity: newQuantity}));
            alert("cart updated");
        } else {
            alert("Error updating");
            setquantityVals((obj) => ({...obj, [itemId]: prevQuantity}));
        }
    }
    */
   
/*
    const increment = () => {
        dispatch(changeSingleQuantity({id: itemId, quantity: newQuantity}))
    }*/
/*
    return(
        <div className="container">
            <h1>Cart</h1>
            
            <p>{cartTotal}</p>
            <div className="row">
                <div className="col-8">
                {cartItems.map((item, index) =>{

                    //valueArr[item.id] =item.cart_quantity;
                    return(
                        <div key={index} className="row g-0">
                        <div className="col-3">
                            <img src={`/images/${item.image_url}`} className="img-fluid rounded-start" alt={item.title}/>
                        </div>
                        <div className="col-6">
                            
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{`$${item.price}`}</p>
                            
                        </div>
                        
                        <div className="col-3">
                            <div className="row align-items-center">
                                <div className="col-4 px-0">
                                    <button className="btn btn-secondary px-3" /*onClick={incrementCount}>+</button>
                                </div>
                                <div className="col-4 px-0">
                                    <input data-id={item.id} className="form-control" type="number" value={item.cart_quantity || 0}/*value={quantityVals[item.id] || 0} /*min="0" max={item.quantity} onChange={handle2}/>
                                </div>
                                <div className="col-4 px-0">
                                    <button className="btn btn-secondary px-3"/*onClick={decrementCount}>-</button>
                                </div>    
                            </div>
                           
                        </div>
                    </div>
                    )
                } 
                   
                )}
                
                </div>
                <div className="col-4">

                </div>
            </div>
        </div>
        
        
    )
}
*/