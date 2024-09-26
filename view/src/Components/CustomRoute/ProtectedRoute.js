import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/session/sessionSlice";
import { Navigate } from "react-router-dom";
//import { fetchSession } from "../../utils";

export default function ProtectedRoute ({ children }) {
    const user = useSelector(selectUser);

    if(!user) {
        return <Navigate to="/signup"/>
    }
    return children;
}