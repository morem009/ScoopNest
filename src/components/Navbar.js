import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom'; 

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Desktop Navbar */}
            <nav className="bg-[#292e37] shadow-lg p-4 hidden md:flex justify-between items-center fixed top-0 w-full z-50 transition-all duration-300">
                <Link to="/"><img src={logo} alt="ScoopNest Logo" className="h-12 transform hover:scale-110 transition-transform duration-300" /></Link>

                <div className="space-x-6">
                    <Link to="/" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Home</Link>
                    <Link to="/products" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Products</Link>
                    <Link to="/about" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">About Us</Link>
                    <Link to="/contact" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Contact</Link>
                </div>

                <div className="space-x-6">
                    <Link to="/register" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Register</Link>
                    <Link to="/login" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Login</Link>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="bg-[#292e37] shadow-lg p-4 md:hidden flex justify-between items-center fixed top-0 w-full z-50 transition-all duration-300">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                    ☰
                </button>
                <Link to="/"><img src={logo} alt="ScoopNest Logo" className="h-12 transform hover:scale-110 transition-transform duration-300" /></Link>
            </nav>

            {/* Mobile Slide-In Menu */}
            {isOpen && (
                <div className="bg-white fixed top-0 left-0 h-full w-64 z-50 shadow-xl transition-transform transform translate-x-0 md:translate-x-full">
                    <button onClick={() => setIsOpen(false)} className="text-black absolute top-4 right-4 focus:outline-none">✖️</button>
                    <ul className="flex flex-col space-y-4 mt-8 ml-4">
                        <li><Link to="/" className="text-black hover:text-gray-400">Home</Link></li>
                        <li><Link to="/products" className="text-black hover:text-gray-400">Products</Link></li>
                        <li><Link to="/about" className="text-black hover:text-gray-400">About Us</Link></li>
                        <li><Link to="/contact" className="text-black hover:text-gray-400">Contact</Link></li>
                        <li><Link to="/register" className="text-black hover:text-gray-400">Register</Link></li>
                        <li><Link to="/Login" className="text-black hover:text-gray-400">Login</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;
