import React from "react";
import { Link } from "react-router-dom";

import './header.css';
import { fetchSession, logout } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { removeAccount, selectAddresses, selectInfo } from "../../features/account/accountSlice";
import { cartEmpty, selectCartItems, selectCartTotal } from "../../features/cart/cartSlice";
import { logOutUser, selectUser } from "../../features/session/sessionSlice";

export default function Header() {
    const dispatch = useDispatch();
    const account = useSelector(selectInfo);
    const add = useSelector(selectAddresses);
    const c1 = useSelector(selectCartItems);
    const c2 = useSelector(selectCartTotal);
    const sess = useSelector(selectUser);

    console.log('acc', account);
    console.log('add', add);
    console.log('cart', c1);
    console.log('ct', c2);
    console.log('sess', sess);

    const handleLogout= async () =>{
        const success = await logout();
        if (success) {
            alert('true');
            dispatch(removeAccount());
            dispatch(logOutUser());
            dispatch(cartEmpty());
        } else {
            alert('false');
        }
    }

    const getSession= async () =>{
        const success = await fetchSession();
        if (success) {
            console.log('session', success);
            alert('true');
        } else {
            console.log('session', success);
            alert('false');
        }
    }
    
    return(
        <div className="shop-header">
            <nav className="navbar shop-secondary-menu navbar-expand bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container container-fluid">
                    <div className="col-6"></div>
                    <div className="d-flex justify-content-end">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <button onClick={getSession}>session</button>
                                <button onClick={handleLogout}>Logout</button>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/account'>My Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/cart'>Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/checkout'>Checkout</Link>
                                </li>
                        </ul>
                    </div>
                </div>
                
            </nav>
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex container-fluid">
                    <a className="navbar-brand me-4" href="/"><img class="shop-logo" src='images/logo.png'/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="shop-main-menu navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/shop'>Shop</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link ">Clothing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link ">Electronics</a>
                            </li>
                            
                        
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>

     
    );
}