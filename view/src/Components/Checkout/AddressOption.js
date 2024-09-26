import React from "react";

//address option for select on checkout
export default function AddressOption({ addressObj }){
    return(
        <option value={addressObj.id}>
            {`${addressObj.first_name} ${addressObj.last_name} - 
            ${addressObj.address_1}, ${addressObj.address_2}, 
            ${addressObj.city}, 
            ${addressObj.state} 
            ${addressObj.postal_code}, 
            ${addressObj.country}`}
        </option>
    );
}