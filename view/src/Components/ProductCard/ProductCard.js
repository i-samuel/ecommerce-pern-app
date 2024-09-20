import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const { id, title, price, image_url } = product;
    return(
        <div className="col px-4 py-3">
            <div className="card border-0 h-100 text-start">
                <Link to={`/product/${id}/${title.replace(" ", "-")}`}>
                    <img className="card-img-top" src={`/images/${image_url}`}/>
                </Link>                  
                             
                <h3 className="card-title fs-6 fs-md-5">
                    <Link to={`/product/${id}/${title.replace(" ", "-")}`}>
                        {title}
                    </Link>
                </h3>
                <span className="fs-6">{`$${price}`}</span>                
            </div>
        </div>
        
    );
}