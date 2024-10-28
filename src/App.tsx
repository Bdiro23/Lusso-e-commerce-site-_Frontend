//import Login from './componenets/Login/Login.tsx'
//import React from 'react';
import Home from './Home';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './componenets/Products/Products.tsx'
import {CartProvider} from "./Context/Cart.tsx";
import CartPage from "./componenets/Panier/CartPage.tsx";
import About from "./componenets/About/About.tsx";
import Contact from "./componenets/Contact/Contact.tsx";
import FavorisPage from "./componenets/Favoris/FavorisPage.tsx";
import Login from "./componenets/Login/Login.tsx";
import Signup from "./componenets/Signup/Signup.tsx";
import Checkout from "./componenets/Sheckout/Checkout.tsx";
import ProductDetail from "./componenets/Products/ProductPage.tsx";
import {AuthProvider} from "./Context/Auth.tsx";
//import Navbar from "./componenets/Navbar/Navbar.tsx";

function App() {


  return (
      <AuthProvider>
          <CartProvider>
              <Router>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products/:categoryId" element={<Products />} />
                      <Route path="/about" element={<About/>}/>
                      <Route path="/panier" element={<CartPage/>}/>
                      <Route path="/contact" element={<Contact/>}/>
                      <Route path="/favoris" element={<FavorisPage/>}/>
                      <Route path="/login"   element={<Login/>}/>
                      <Route path="/signup"  element={<Signup/>}/>
                      <Route path="/checkout" element={<Checkout/>}/>
                      <Route path="/product/:id" element={<ProductDetail/>}/>
                  </Routes>
              </Router>
          </CartProvider>
      </AuthProvider>


  )
}

export default App
