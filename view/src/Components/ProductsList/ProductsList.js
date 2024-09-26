import React from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsList({itemArr, limit}) {
    return(
        <div className="row row-cols-2 row-cols-md-3 gx-5 gy-5">
            {itemArr.map((item, index) =>
                <ProductCard key={index} product={item}/>
            )}
        </div> 
    )
}