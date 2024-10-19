import React from "react";
import { Link } from "react-router-dom";
import './topMenu.css';

export default function TopMenu({ user, logOutHandler }){
    return(
        <nav className="navbar shop-secondary-menu navbar-expand bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container d-flex justify-content-end">
                <div className="d-flex">         
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">                            
                        {user ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to='/cart'>Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/account'>My Account</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={logOutHandler} className="btn btn-link text-uppercase ms-2">Log Out</button>
                            </li>
                        </>
                        :
                        <li className="nav-item">
                            <Link className="nav-link" to='/signup'>Login/Signup</Link>
                        </li>
                        }   
                    </ul>
                </div>                    
            </div>                
        </nav>
    )
}