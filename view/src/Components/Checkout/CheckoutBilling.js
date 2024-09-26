import React from "react";
import AddressOption from "./AddressOption";
import NewAddressForm from "./NewAddressForm";
import './checkout.css';

//Billing Address section in checkout
export default function CheckoutBilling({ shipId, shipSelectHandler, defaultAdd, otherAdd, newAddObj, inputHandler, radioBtnHandler, sameAsShipping }) {
    return (
        <div className="row py-4">
            <div className="col shipping-col">
                <h4 className="fs-4 mb-3">Billing address</h4>
                <div className={sameAsShipping ? 'row clicked-rd' : 'row'}>
                  <div className="col">
                    <div className="form-check py-3">
                      <input className="form-check-input" onChange={radioBtnHandler}  type="radio" value="1" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked/>
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Same as shipping address
                      </label>
                    </div>
                  </div>
                </div>
                <div className={sameAsShipping ? 'row' : 'row clicked-rd'}>
                  <div className="col pb-5">
                    <div className="form-check py-3">
                      <input className="form-check-input" onChange={radioBtnHandler} type="radio" value="0" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className="form-check-label " htmlFor="flexRadioDefault2">
                        Use a different billing address
                      </label>
                    </div>
                    {sameAsShipping ? '' :
                    <div className="col checkout-address mt-4 mx-2">
                        <label className="form-label fs-5" htmlFor="selectAdd">
                            Saved addresses
                        </label>
                        <select id="selectAdd" value={shipId} onChange={shipSelectHandler} className="form-select my-2" aria-label="Default select" >
                            {defaultAdd ? <AddressOption addressObj={defaultAdd}></AddressOption> : '' }
                            
                            {otherAdd? otherAdd.map(item => (<AddressOption key={item.id} addressObj={item}></AddressOption>)) : ''}

                            <option value="new">Add New Address</option>
                        </select>
                        
                        {shipId === 'new' ? 
                            <NewAddressForm addObj={newAddObj} inputChangeHandler={inputHandler}/>
                            : 
                            ''
                        }
                    </div>
                    }
                  </div>
                </div>
            </div>
        </div>
    )
}