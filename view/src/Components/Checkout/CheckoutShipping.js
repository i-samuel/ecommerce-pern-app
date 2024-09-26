import React from "react";
import AddressOption from "./AddressOption";
import NewAddressForm from "./NewAddressForm";

export default function CheckoutShipping({shipId, shipSelectHandler, defaultAdd, otherAdd, newAddObj, inputHandler}) {
    return (
        <div className="row py-4 border-bottom">
            <div className="col shipping-col">
                <h4 className="fs-4 mb-3">Shipping address</h4>
                <div className="col mt-4 ms-2">
                    <label className="form-label fs-5" htmlFor="selectAdd">
                        Saved addresses
                    </label>
                    <select id="selectAdd" value={shipId} onChange={shipSelectHandler} className="form-select my-2" aria-label="Default select example" >
                        {defaultAdd ? <AddressOption addressObj={defaultAdd}></AddressOption> : ''}                    
                        {otherAdd? otherAdd.map(item => 
                            (<AddressOption key={item.id} addressObj={item}></AddressOption>)) 
                            : ''
                        }
                        <option value="new">Add New Address</option>
                    </select>

                    {shipId === 'new' ? 
                        <NewAddressForm addObj={newAddObj} inputChangeHandler={inputHandler}/>
                        : 
                        ''
                    }
                </div>                
            </div>
        </div>
    )
}