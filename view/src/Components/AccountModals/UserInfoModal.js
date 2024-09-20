import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal/Modal';
//import Modal from 'react-modal';

export default function UserInfoModal({ userData, onSubmit, isOpen, onClose }) {
    /*const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [email, setEmail] = useState(userData.email);*/

    const [formState, setFormState] = useState(userData);

    useEffect(() => {
        setFormState(userData);
    },[userData, isOpen]);

    console.log('formState',userData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevObj) => ({...prevObj, [name] : value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >   
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value={formState.email} onChange={handleInputChange} required/>
                </div>
                <div class="mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" name="first_name" value={formState.first_name} onChange={handleInputChange} required/>
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" name="last_name" value={formState.last_name} onChange={handleInputChange} required/>
                </div>
                <div class="mb-3 d-flex justify-content-center">
                 <button class="btn btn-secondary mt-3" type="submit">Submit</button>
                </div>
                
            </form>
        </Modal> 
    )
}