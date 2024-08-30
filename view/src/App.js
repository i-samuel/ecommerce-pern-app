import React from 'react';
import { RouterProvider, Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Shop from './Components/Shop';
import SingleProduct from './features/singleProduct/SingleProduct';
import Root from './Components/Root/Root';

function App() {

  const router = createBrowserRouter(createRoutesFromElements([
    <Route path='/' element={<Root/>}>
      <Route path='/shop' element={ <Shop/>}/>
      <Route path='/product/:id/:title' element={ <SingleProduct/>}/>
    </Route>
    
  ]))

  return (
    <RouterProvider router= { router }/>
  );
}

export default App;