import React, { useEffect } from 'react';
import { RouterProvider, Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Shop from './Components/Shop/Shop';
import SingleProduct from './features/singleProduct/SingleProduct';
import Root from './Components/Root/Root';
import CartPage from './features/cart/CartPage';
import Account from './features/account/Account';
import Checkout from './Components/Checkout/Checkout';
import AuthRoute from './Components/CustomRoute/AuthRoute';
import ProtectedRoute from './Components/CustomRoute/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { setUser } from './features/session/sessionSlice';
import AuthPage from './Components/AuthPage/AuthPage';
import { loadCart } from './features/cart/cartSlice';
import { loadAccount } from './features/account/accountSlice';
import Home from './Components/Home/Home';
import PaySuccess from './Components/Payments/PaySuccess';

function App({user}) {
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setUser(user));
    if(user){
      dispatch(loadCart());
      dispatch(loadAccount(user));
    }
  },[dispatch, user]);

  const router = createBrowserRouter(createRoutesFromElements([
    <>
    <Route path='/' element={ <Root/> }>
      <Route index element={ <Home/> }/>
      <Route path='/shop' element={ <Shop/> }/>
      <Route path='/product/:id/:title' element={ <SingleProduct/>}/>
      <Route path='/signup' element={ <AuthRoute><AuthPage/></AuthRoute> }/>
      <Route path='/cart' element={ <ProtectedRoute><CartPage/></ProtectedRoute> }/>
      <Route path='/account' element={ <ProtectedRoute><Account/></ProtectedRoute> }/>
      <Route path='/payment-success' element={ <ProtectedRoute><PaySuccess/></ProtectedRoute> }/>     
    </Route> 
    <Route path='/checkout' element={ <ProtectedRoute><Checkout/></ProtectedRoute> }/>   
    </>
  ]));
  
  return (
    <RouterProvider router= { router }/>
  );
}

export default App;