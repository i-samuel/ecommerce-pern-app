import React, { useEffect, useState } from 'react';
import { RouterProvider, Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Shop from './Components/Shop';
import SingleProduct from './features/singleProduct/SingleProduct';
import Root from './Components/Root/Root';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

import CartPage from './features/cart/CartPage';
import Account from './features/account/Account';
import Checkout from './Components/Checkout/Checkout';
import AuthRoute from './Components/CustomRoute/AuthRoute';
import ProtectedRoute from './Components/CustomRoute/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { receiveCurrent, setUser } from './features/session/sessionSlice';



function App({user}) {
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setUser(user));
  },[]);


  const router = createBrowserRouter(createRoutesFromElements([
    <Route path='/' element={ <Root/> }>
      <Route path='/shop' element={ <Shop/> }/>
      <Route path='/product/:id/:title' element={ <SingleProduct/>}/>
      <Route path='/login' element={ <AuthRoute><Login/></AuthRoute> }/>
      <Route path='/register' element={ <AuthRoute><SignUp/></AuthRoute> }/>
      <Route path='/signup' element={ <AuthRoute><SignUp/></AuthRoute> }/>
      <Route path='/cart' element={ <ProtectedRoute><CartPage/></ProtectedRoute> }/>
      <Route path='/account' element={ <ProtectedRoute><Account/></ProtectedRoute> }/>      
      <Route path='/checkout' element={ <ProtectedRoute><Checkout/></ProtectedRoute> }/>
    </Route>    
  ]));

  
  return (
    <RouterProvider router= { router }/>
  );
}

export default App;