import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils";
import { removeAccount } from "../../features/account/accountSlice";
import { cartEmpty } from "../../features/cart/cartSlice";
import { logOutUser, selectUser } from "../../features/session/sessionSlice";
import SearchBar from "./SearchBar.js/SearchBar";
import { trim } from "validator";
import TopMenu from "./TopMenu/TopMenu";

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [searchTerm, setSearchTerm] = useState('');
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

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(trim(searchTerm).length > 0){
            navigate(`/search?s=${searchTerm}`);
        }
        setSearchTerm('');
    }
    
    return(
        <div className="shop-header">
            <TopMenu user={user} logOutHandler={handleLogout}/>
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
                            <li className="nav-item">
                                <Link className="nav-link" to='/shop/category/4/electronics'>Electronics</Link>
                            </li>                           
                        </ul>
                        <SearchBar
                            term={searchTerm}
                            onChangeHandler={handleInputChange}
                            onSubmitHandler={handleSearchSubmit}
                        />
                    </div>
                </div>
            </nav>
        </div>     
    );
}