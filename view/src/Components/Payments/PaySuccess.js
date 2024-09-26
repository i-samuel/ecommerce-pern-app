import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function PaySuccess() {
    return (
        <div className="row justify-content-center cart-empty-note">                    
            <div className="col-md-5 text-center px-3">                
                <p className="fs-2 text-uppercase"><span><FontAwesomeIcon icon={faCircleCheck} style={{color: "#63E6BE",}} /></span>   Payment Successful</p>
                <div className="row justify-content-center">
                    <div className="col-lg-4 p-0 justify-content-end">
                        <Link className="btn btn-dark rounded-0 py-2 px-3 fs-5 mt-4" to='/shop'>Continue Shopping</Link>                        
                    </div>
                    <div className="col-lg-4 p-0 justify-content-start">
                        <Link className="btn btn-dark rounded-0 py-2 px-3 fs-5 mt-4" to='/account'>My Account</Link>                        
                    </div>
                </div>                        
                
            </div>                    
        </div>   
    )
}