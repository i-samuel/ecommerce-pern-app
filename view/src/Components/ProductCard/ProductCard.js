import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const { id, title, price, image_url } = product;
    return(
        <div class="col px-4 py-3">
            <div class="card border-0 h-100 text-start">
                <a href="https://google.com">
                    <img class="card-img-top" src={`/images/${image_url}`}/>
                </a>                
                <h3 class="card-title fs-6 fs-md-5">
                    <Link to={`/product/${id}/${title.replace(" ", "-")}`}>
                        {title}
                    </Link>
                </h3>
                <span class="fs-6">{`$${price}`}</span>                
            </div>
        </div>
        
    );
}