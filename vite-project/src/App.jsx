import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Ourshoes from "./components/Ourshoes"; 
import Login from "./components/Login"; 
import Ourblog from "./components/Ourblog"; 
import Contact from "./components/Contact"; 
import Signup from './components/Signup';

import Dashboard from "./admin/Dashbord"; 
import Customer from "./admin/Customer";
import Fetch from "./admin/Productfetch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/our-shoes" element={<Ourshoes />} />
        <Route path="/our-blog" element={<Ourblog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/adminproducts" element={<Fetch />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;