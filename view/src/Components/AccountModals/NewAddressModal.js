import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal/Modal';


export default function NewAddressModal({ onSubmit, isOpen, onClose }) {
    
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        country: '',
        state: '',
        postal_code: '',
        isdefault: false
    });

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSubmit(formState);
        //clear form if new address added is succesful
        if (success){
            setFormState({
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                city: '',
                country: '',
                state: '',
                postal_code: '',
                isdefault: false
            });
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >   
            {!formState ? '' :
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <label for="ea_first_name" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="na_first_name" name="first_name" value={formState.first_name} onChange={handleInputChange} required/>
                        </div>
                        <div class="col-6 mb-3">
                            <label for="ea_last_name" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="na_last_name" name="last_name" value={formState.last_name} onChange={handleInputChange} required/>
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="na_address_1" class="form-label">Address 1</label>
                            <input type="text" class="form-control" id="na_address_1" name="address_1" value={formState.address_1} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="na_address_2" class="form-label">Apartment, suite, etc(optional)</label>
                            <input type="text" class="form-control" id="na_address_2" name="address_2" value={formState.address_2} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <label for="na_city" class="form-label">City</label>
                            <input type="text" class="form-control" id="na_city" name="city" value={formState.city} onChange={handleInputChange}/>
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label for="na_country" class="form-label">Country</label>
                            <input type="text" class="form-control" id="na_country" name="country" value={formState.country} onChange={handleInputChange}/>
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label for="na_state" class="form-label">State</label>
                            <input type="text" class="form-control" id="na_state" name="state" value={formState.state} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="na_postal_code" class="form-label">Zip Code</label>
                            <input type="text" class="form-control" id="na_postal_code" name="postal_code" value={formState.postal_code} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div class="row">                   
                            
                                <div class="col mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="na_isdefault" onChange={checkHandler}/>
                            <label class="form-check-label" for="na_isdefault">
                                 Make Default?
                            </label>
                            </div>                         
                    </div>
                    <div class="row">
                        <div class="mb-3 d-flex justify-content-center">
                            <button class="btn btn-secondary mt-3" type="submit">Add Address</button>
                        </div>                    
                    </div>
                     
                        
                </form>
            }
        </Modal> 
    )
}