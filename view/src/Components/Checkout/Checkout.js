import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import './checkout.css';
import { isLoadingAccount, loadAccount, selectDefault, selectExtra, selectInfo } from "../../features/account/accountSlice";
import { loadCart, selectCartTotal } from "../../features/cart/cartSlice";
import { selectUser } from "../../features/session/sessionSlice";
import CartSummary from "../CartSummary/CartSummary";
import CheckoutForm from "./CheckoutForm";
import CheckoutShipping from "./CheckoutShipping";
import CheckoutBilling from "./CheckoutBilling";
import { createNewOrder } from "../../utils";
import { validateAddress } from "../../utils/helpers";

const stripePromise = loadStripe('pk_test_51PdHgVRwTg3AQ4v27vhivxxKyvA1j2GZk78sljfiVCEHhHt69dUngpT5byN8jFZppGVOt8GA471BUIFdlrUawI8G00QN18OPQt');

const addressSamp = {
  firstName: '',
  lastName: '',
  address1: '',
  city: '',
  country: '',
  state: '',
  postalCode: ''
};

export default function Checkout() {

  const dispatch = useDispatch();
  //current user
  const user = useSelector(selectUser);
  //user info from state
  const personalInfo = useSelector(selectInfo) || null;
  //defaut address
  const defaultShip = useSelector(selectDefault) || null;
  //other addtress(non-default)
  const additionalShipping = useSelector(selectExtra) || null;  
  const isAccountLoading = useSelector(isLoadingAccount);
  //cart Total
  const cartTotal = useSelector(selectCartTotal); 

  //local states

  //Ship address order id selected by user
  const [orderShipId, setOrderShipId] = useState('');
  //New address for shipping, if selected
  const [newShipObj, setNewShipObj] = useState(addressSamp);
  //Bill address order id selected by user
  const [orderBillId, setOrderBillId] = useState('');
  //New address for billing, if selected
  const [newBillObj, setNewBillObj] = useState(addressSamp);
  //if billing is same as shipping address
  const [sameAsShipping, setSameAsShipping] = useState(true);

  useEffect(() =>{
    dispatch(loadAccount(user));
    dispatch(loadCart());
  },[dispatch]);

  //set selected values on load 
  useEffect(() => {
    if(defaultShip){
        setOrderShipId(defaultShip.id);
        setOrderBillId(defaultShip.id);
    } else if (additionalShipping && additionalShipping.length > 0){
        setOrderShipId(additionalShipping[0].id);
        setOrderBillId(additionalShipping[0].id);
    } else {
        setOrderShipId('new');
        setOrderBillId('new');
    }
  }, [defaultShip, additionalShipping]);

  /** Shipping address handlers**/

  const handleShippingSelect = (e) => {
    const val = e.target.value;
    setOrderShipId(val);
  }

  const handleShippingInput = (e) => {
        const { name, value } = e.target;
        setNewShipObj((prevObj) => ({...prevObj, [name] : value}));
  }

  /** Billing address handlers **/

  const handleBillingSelect = (e) => {
    const val = e.target.value;
    setOrderBillId(val);
  }

  const handleBillingInput = (e) => {
    const { name, value } = e.target;
    setNewBillObj((prevObj) => ({...prevObj, [name] : value}));
  }

  const handleBillingRadio = ({target}) => {
    if(target.value === '1'){
      setSameAsShipping(true);
    } else if (target.value === '0') {
      setSameAsShipping(false);
    }    
  }

  //stripe elements options
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    appearance: {theme: 'stripe'},
  };

  //create order on server 
  const handleCreateOrder = async () => {
        let shipping = {};
        let billing = {};

        //set shipping address for req
        if (orderShipId == 'new'){

          //validate new addresses
          if (!validateAddress(newShipObj)) {
            alert("Check Shipping Address Details Again");
            return;
          }

          shipping = {
            id: orderShipId,
            ...newShipObj
          };

        } else { 
          shipping = {
            id: orderShipId,
          };
        }
        
        //set billing address for req
        if (sameAsShipping){
          billing = {
            sameAsShipping: true,          
          }
        } else if(orderBillId == 'new') {
          //validate new addresses
          if(!validateAddress(newBillObj)){
            alert("Check Billing Address Details Again");
            return;
          }

          billing = {
            sameAsShipping: false,
            id: orderBillId,
            ...newBillObj,
          }

        } else {
          billing = {
            sameAsShipping: false,
            id: orderBillId
          }
        }

        //final object to send
        const reqObj = {
            shipping,
            billing
        };

        const orderSuccess = await createNewOrder(reqObj);
        return orderSuccess;
  };

  return (      
        <div className="container">
            <div className="row">
              <div className="col mt-4">
                <h1 className="fs-2 text-uppercase display-6 fw-semibold text-center ">Checkout</h1>
                <p className="text-center checkout-nav">
                  <span><Link to='/'>Home</Link></span>{'  >  '}<span><Link to='/cart'>Cart</Link></span>{'  >  '}<span>Checkout</span>
                </p>
              </div>
            </div>
            <div className="row mt-4 mb-5 mx-1 justify-content-center">
              <div className="col col-lg-8 col-xl-5 order-2">
                
                <div className="row py-4 border-bottom">
                    <div className="col">
                        <h4 className="fs-4">Contact</h4>
                        {personalInfo? 
                        <p className="fs-6">{`${personalInfo.first_name} ${personalInfo.last_name} (${personalInfo.email})`}</p>
                        : 
                        <p>Loading Data...</p>
                        }                        
                    </div>
                </div>
                {isAccountLoading ? 'loading Shipping data' :
                <CheckoutShipping 
                  shipId={orderShipId} 
                  shipSelectHandler={handleShippingSelect} 
                  defaultAdd={defaultShip} 
                  otherAdd={additionalShipping} 
                  newAddObj={newShipObj} 
                  inputHandler={handleShippingInput}
                />                
                }

                <div className="row py-4 border-bottom">
                    <div className="col">
                        <h4 className="fs-4">Payment Details</h4>
                        {cartTotal?
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm handleNewOrder={handleCreateOrder}/>
                        </Elements>
                        : ''
                        }
                        
                    </div>
                </div>                

                {isAccountLoading ? 'loading Shipping data' :
                <CheckoutBilling 
                  shipId={orderBillId} 
                  shipSelectHandler={handleBillingSelect} 
                  defaultAdd={defaultShip} 
                  otherAdd={additionalShipping} 
                  newAddObj={newBillObj} 
                  inputHandler={handleBillingInput} 
                  radioBtnHandler={handleBillingRadio} s
                  ameAsShipping={sameAsShipping}/>                
                }

              </div>
              <div className="col-lg-4 order-1 order-lg-3 text-center cart-summary">
                <div className="bg-light h-100 py-5 px-4 pt-6">
                  <CartSummary total={cartTotal} shipping={0} tax={0}/>
                </div>
              </div>
            </div>
        </div>
    );
}

