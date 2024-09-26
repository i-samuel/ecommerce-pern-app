import React from "react";
import './cartItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function cartItem({itemObj, handleChange, handleUnfocus, incrementHandler, decrementhandler, removeHandler, qty}) {

    return(
        <div className="row gx-2 pb-4 mt-3 border-bottom">
            <div className="col-3 col-md-2 cart-item-img justify-content-center">
                <img src={`/images/${itemObj.image_url}`} className="img-fluid rounded-start" alt={itemObj.title}/>
            </div>
            <div className="col-6 col-md-7 cart-item mt-lg-3">                
                    <h5 className="card-title cart-item-title">{itemObj.title}</h5>
                    <p className="card-text">{`$${itemObj.price}`}</p>
                    <FontAwesomeIcon className="cart-remove" onClick={() => removeHandler(itemObj.id)} icon={faTrashCan}/>                
            </div>            

            <div className="col-3 d-flex cart-count-parent justify-content-end">               
                        <button onClick={() => decrementhandler(itemObj.id)} className="btn btn-secondary px-auto py-0 rounded-0 text-center" >-</button>                 
                        <input data-id={itemObj.id} className="form-control rounded-0 px-0 text-center" type="number" value={qty} onChange={(e) => handleChange(e.target.value, itemObj.id)} onBlur={(e) => handleUnfocus(e, itemObj.id)}/>
                        <button onClick={() => incrementHandler(itemObj.id)} className="btn btn-secondary px-auto py-0 rounded-0 text-center">+</button>                   
            </div>
        </div>
    );
}