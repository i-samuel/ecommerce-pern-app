import React, { useState } from "react";
import { isEmpty, isEmail } from "validator";
import { signUp } from "../../utils";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if(isEmail(email) && !isEmpty(password) && !isEmpty(username)) {
            const isRegistered = await signUp(email, username, password);
            if(isRegistered === 'success') {
                alert('Successfully created account! Please Login');
                setEmail('');
                setUsername('');
                setPassword('');
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
        <div className="col-sm-5 mt-5 mt-sm-0">
            <h2 className="display-6 ">New Customer?</h2>
            <p className="fs-5">Create an account</p>
            <form className="row g-3 mt-3" onSubmit={handleSignUp}>
                <div className="col-12">
                    <label htmlFor="regEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="regEmail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="regPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="regPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="col-12 mt-5">
                    <button type="submit" className="btn btn-dark rounded-0 px-5">REGISTER</button>
                </div>
            </form>
        </div>    
   )
}