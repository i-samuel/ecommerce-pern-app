import React from "react";
import './cartSummary.css';

export default function CartSummary({ total, shipping, tax }){
    return (        
            <>
                <h4 className="fs-6 text-uppercase">Order Summary</h4>
                <hr/>
                <div className="row cart-summary mt-2">
                    <div className="col d-flex justify-content-between">
                        <span>Sub Toal</span>
                        <span>{`$ ${total.toFixed(2)}`}</span>
                    </div>
                </div>
                <div className="row cart-summary mt-2">
                    <div className="col d-flex justify-content-between">
                        <span>Shipping</span>
                        <span>{`$ ${shipping}`}</span>
                    </div>
                </div>
                <div className="row cart-summary mt-2">
                    <div className="col d-flex justify-content-between">
                        <span>Estimated Tax</span>
                        <span>{`$ ${tax}`}</span>
                    </div>
                </div>
                
            </>        
        );
}