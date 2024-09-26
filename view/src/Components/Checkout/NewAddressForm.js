import React from "react";

export default function NewAddressForm({ addObj, inputChangeHandler }){
    return(
        <form>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="ea_first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="na_first_name" name="firstName" value={addObj.firstName} onChange={inputChangeHandler} required/>
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="ea_last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="na_last_name" name="lastName" value={addObj.lastName} onChange={inputChangeHandler} required/>
                </div>                        
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label htmlFor="na_address_1" className="form-label">Address 1</label>
                    <input type="text" className="form-control" id="na_address_1" name="address1" value={addObj.address1} onChange={inputChangeHandler} required/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label htmlFor="na_address_2" className="form-label">Address 2 (optional)</label>
                    <input type="text" className="form-control" id="na_address_2" name="address2" value={addObj.address2} onChange={inputChangeHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 mb-3">
                    <label htmlFor="na_city" className="form-label">City</label>
                    <input type="text" className="form-control" id="na_city" name="city" value={addObj.city} onChange={inputChangeHandler}/>
                </div>
                <div className="col-lg-4 mb-3">
                    <label htmlFor="na_country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="na_country" name="country" value={addObj.country} onChange={inputChangeHandler}/>
                </div>
                <div className="col-lg-4 mb-3">
                    <label htmlFor="na_state" className="form-label">State</label>
                    <input type="text" className="form-control" id="na_state" name="state" value={addObj.state} onChange={inputChangeHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label htmlFor="na_postal_code" className="form-label">Zip Code</label>
                    <input type="text" className="form-control" id="na_postal_code" name="postalCode" value={addObj.postalCode} onChange={inputChangeHandler} required/>
                </div>
            </div>
        </form>
    );
}