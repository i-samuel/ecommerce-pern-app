import React from "react";


export default function CartSummary({ total, shipping, tax }){
    return (
        <div className="col-md-4 text-center">
            <div className="bg-light h-100 py-5 px-4">
                <h4 className="fs-6 text-uppercase">Order Summary</h4>
                <hr/>
                <div class="row cart-summary mt-2">
                    <div class="col d-flex justify-content-between">
                        <span>Sub Toal</span>
                        <span>{`$ ${total}`}</span>
                    </div>
                </div>
                <div class="row cart-summary mt-2">
                    <div class="col d-flex justify-content-between">
                        <span>Shipping</span>
                        <span>{`$ ${shipping}`}</span>
                    </div>
                </div>
                <div class="row cart-summary mt-2">
                    <div class="col d-flex justify-content-between">
                        <span>Estimated Tax</span>
                        <span>{`$ ${tax}`}</span>
                    </div>
                </div>
                
                <button className="btn btn-dark rounded-0 w-100 mt-5">
                    Checkout
                </button>
            </div>
        </div>
    )
}