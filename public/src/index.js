import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// import your route components too
import Products from './components/Products';
import Product from './components/Product';
import Profile from './components/Profile';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Products />} />
        <Route path="products/:productId" element={<Product />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
