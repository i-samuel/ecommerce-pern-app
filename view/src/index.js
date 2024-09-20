import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';
import { Provider } from 'react-redux';
import { fetchSession } from './utils';
import reportWebVitals from './reportWebVitals';
//Bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = (user)=> {
  const store = configureStore({
    reducer: reducer, 
    preloadedState:{
      session: {
        user: user,
      }
    }
  });
  root.render(
    <Provider store={store}>
      <App user={user}/>
    </Provider>    
    
  );
}

(async () => renderApp(await fetchSession()))();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
