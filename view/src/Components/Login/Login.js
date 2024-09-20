import React, { useState } from "react";
import { login } from "../../utils";
import { isEmpty, isEmail } from "validator";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { receiveCurrent } from "../../features/session/sessionSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmail(email) && !isEmpty(password)) {
            const loginSuccess = await login(email, password);
            if(loginSuccess) {
                alert('success');
                //navigate('/shop');
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
    
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className="col-12">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" value={password} onChange={handlePasswordChange}/>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}