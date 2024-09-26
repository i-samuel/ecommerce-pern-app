import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

export default function AddressEditModal({ addressData, onSubmit, isOpen, onClose }) {
    
    const [formState, setFormState] = useState(addressData);
    
    useEffect(() => {
        setFormState(addressData);        
    },[isOpen, addressData]);

    //input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevObj) => ({...prevObj, [name] : value}));
    };

    //checkbox change state handler
    const checkHandler = (e) => {
        const checked = e.target.checked;
        setFormState((prev) => ({...prev, isdefault: checked}));
    }

    //form onsubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >   
            {!formState ? '' :
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="ea_first_name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="ea_first_name" name="first_name" value={formState.first_name} onChange={handleInputChange} required/>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="ea_last_name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="ea_last_name" name="last_name" value={formState.last_name} onChange={handleInputChange} required/>
                        </div>                        
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="address_1" className="form-label">Address 1</label>
                            <input type="text" className="form-control" id="address_1" name="address_1" value={formState.address_1} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="address_2" className="form-label">Apartment, suite, etc(optional)</label>
                            <input type="text" className="form-control" id="address_2" name="address_2" value={formState.address_2} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={formState.city} onChange={handleInputChange}/>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" name="country" value={formState.country} onChange={handleInputChange}/>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" className="form-control" id="state" name="state" value={formState.state} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="postal_code" className="form-label">Zip Code</label>
                            <input type="text" className="form-control" id="postal_code" name="postal_code" value={formState.postal_code} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className="row">                   
                            
                        <div className="col mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={checkHandler}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                 Make Default?
                            </label>
                        </div>                         
                    </div>
                    <div className="row">
                        <div className="mb-3 d-flex justify-content-center">
                            <button className="btn btn-secondary mt-3" type="submit">Save</button>
                        </div>                    
                    </div>                    
                </form>
            }
        </Modal> 
    )
}