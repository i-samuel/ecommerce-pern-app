import React from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

export default function AuthPage() {
    return(
        <div className="container">
            <div className="row mt-5 px-3 px-sm-0">
                <Login/>
                <div className="col-1 col-lg-2"></div>
                <SignUp/>
            </div>
        </div>
    );
}