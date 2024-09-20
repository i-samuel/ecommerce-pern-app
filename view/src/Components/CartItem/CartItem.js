import React from "react";
import './cartItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function cartItem({itemObj, handleChange, handleUnfocus, incrementHandler, decrementhandler, removeHandler, qty}) {

    return(
        <div key={itemObj.id} className="row g-0 pb-4 mt-3 border-bottom">
            <div className="col-3">
                <img src={`/images/${itemObj.image_url}`} className="img-fluid rounded-start" alt={itemObj.title}/>
            </div>
            <div className="col-6 mt-lg-3">
                
                    <h5 className="card-title cart-item-title">{itemObj.title}</h5>
                    <p className="card-text">{`$${itemObj.price}`}</p>
                    <FontAwesomeIcon onClick={() => removeHandler(itemObj.id)} icon={faTrashCan} style={{color: "#4a4a4a",}} />
                
            </div>
            

            <div className="col-3 d-flex cart-count-parent justify-content-end">
                
                    
                        <button onClick={() => decrementhandler(itemObj.id)} className="btn btn-secondary px-auto py-0 rounded-0 text-center" >-</button>                        
                    
                    
                        <input data-id={itemObj.id} className="form-control rounded-0 px-0 text-center" type="number" value={qty} /*min="0" max={item.quantity}*/ onChange={(e) => handleChange(e.target.value, itemObj.id)} onBlur={(e) => handleUnfocus(e, itemObj.id)}/>
                    
                    
                        <button onClick={() => incrementHandler(itemObj.id)} className="btn btn-secondary px-auto py-0 rounded-0 text-center">+</button>
                     
                
               
            </div>
        </div>
    );
}