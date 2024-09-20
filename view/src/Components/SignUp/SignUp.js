import React, { useState } from "react";
import { isEmpty, isEmail } from "validator";
import { signUp } from "../../utils";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();
        if(isEmail(email) && !isEmpty(password) && !isEmpty(username)) {
            const isRegistered = await signUp(email, username, password);
            if(isRegistered === 'success') {
                navigate('/login');
            } else {
                if(isRegistered.error === "Email Already exists" || isRegistered.error === "Username Already exists") {
                  alert(isRegistered.error);
                } else {
                  alert("Error!! Please check details & try Again");
                }
            }
        } else {
            alert('please check your details again');
        }        
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form className="row g-3" onSubmit={handleSignUp}>
                        <div className="col-12">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e) => setPassword(e.target.value)}/>
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