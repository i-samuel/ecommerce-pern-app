import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils";
import { removeAccount } from "../../features/account/accountSlice";
import { cartEmpty } from "../../features/cart/cartSlice";
import { logOutUser, selectUser } from "../../features/session/sessionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    //Handle LogOut, Clear State
    const handleLogout= async () =>{
        const success = await logout();
        if (success) {
            dispatch(removeAccount());
            dispatch(logOutUser());
            dispatch(cartEmpty());
            navigate('/');
        } else {
            alert('Log Out Failed');
        }
    }
    
    return(
        <div className="shop-header">
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
                                    <button onClick={handleLogout} className="btn btn-link text-uppercase ms-2">Log Out</button>
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
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex container-fluid">
                    <Link className="navbar-brand me-4" href="/"><img className="shop-logo" alt="logo" src='images/logo.png'/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="shop-main-menu navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/shop'>Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/account'>My Account</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/cart'>Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/checkout'>Checkout</Link>
                            </li>                          
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control rounded-0" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-dark rounded-0" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>     
    );
}