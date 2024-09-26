import React, { useState } from "react";
import { login } from "../../utils";
import { isEmpty, isEmail } from "validator";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { receiveCurrent } from "../../features/session/sessionSlice";

//Login Component
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    //login submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmail(email) && !isEmpty(password)) {
            const loginSuccess = await login(email, password);
            if(loginSuccess) {
                alert('success');
                dispatch(receiveCurrent());
            } else {
                alert('Email/ password wrong! Please check again!');
            }
        } else {
            alert('please check the your credentials again');
        }        
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return(    
        <div className="col-sm-5 px-3">
            <h2 className="display-6">Login</h2>                    
            <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                <div className="col">
                    <p className="mb-2">Email: user@reactshop.com</p>
                    <p className="mb-2">Password: user3030</p>
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" value={email} onChange={handleEmailChange}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className="col-12 mt-5">
                    <button type="submit" className="btn btn-dark text-uppercase rounded-0 px-5">Login</button>
                </div>
            </form>
        </div>        
    )
}