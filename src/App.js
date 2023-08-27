import React from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Product from './pages/Products';

import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Homepage />} exact />
                    <Route path="/login" element={<Login />} />
                    <Route path = "/register" element={<Register />} />
                    <Route path = "/forgot-password" element={<ForgotPassword />} />
                    <Route path = "/about" element={<AboutUs/>} />
                    <Route path = "/contact" element={<Contact/>} />
                    <Route path = "/products" element={<Product/>} />
                    {/* Add more routes as needed */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
