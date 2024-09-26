import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

export default function UserInfoModal({ userData, onSubmit, isOpen, onClose }) {

    const [formState, setFormState] = useState(userData);

    useEffect(() => {
        setFormState(userData);
    },[userData, isOpen]);

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
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formState.email} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="first_name" value={formState.first_name} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="last_name" value={formState.last_name} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                 <button className="btn btn-secondary mt-3" type="submit">Submit</button>
                </div>
                
            </form>
        </Modal> 
    )
}