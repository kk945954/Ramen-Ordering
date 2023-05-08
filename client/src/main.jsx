import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'

import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import ramenReducer, { getAllRamens } from './features/ramenSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/userSlice';


const store = configureStore({
    reducer: {
      cart: cartReducer,
      ramen: ramenReducer,
      user: userReducer
    },
});

store.dispatch(getAllRamens());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
