import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/session/sessionSlice";


export default function AuthRoute ({ children })  {    

    const user = useSelector(selectUser);

    if(user) {
        return <Navigate to="/shop"/>
    }
    return children;
}



