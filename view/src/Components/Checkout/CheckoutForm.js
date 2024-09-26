import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { updateFailOrder } from "../../utils";
import './checkout.css';

//Stripe Checkout Payment Details Form
export default function CheckoutForm({dpmCheckerLink, handleNewOrder}) {
  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error) => {
    setIsLoading(false);
    setMessage(error.message);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    
    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    //create order on sercver & get payment intent
    const order =  await handleNewOrder();

    //if order creation unsuccessfull on server, return
    if(!order){
      setIsLoading(false);
      alert('Check details again');
      return;   
    }
    
    //order id, payment intent id received from server
    const { orderId, client_secret: clientSecret } = order;

    //Charge Payment
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        //redirect url when successfull payment
        //if payment success, webhook is sent to update order status
       return_url: 'http://localhost:3000/payment-success',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
   
    //if payment failed, update order status to failed on server  
    if( error ){
      await updateFailOrder(orderId);
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="mt-4">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="btn btn-dark mt-4 px-5 py-2" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        
      </div>
    </div>
  );
}