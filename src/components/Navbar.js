import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { FaShoppingCart, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileUserDropdown, setMobileUserDropdown] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const closeMenu = () => {
    setIsOpen(false);
    setMobileUserDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="bg-[#292e37] shadow-lg p-4 hidden md:flex justify-between items-center fixed top-0 w-full z-50 transition-all duration-300">
        <Link to="/">
          <img src={logo} alt="ScoopNest Logo" className="h-12 transform hover:scale-110 transition-transform duration-300" />
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Home</Link>
          <Link to="/products" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Products</Link>
          <Link to="/about" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">About Us</Link>
          <Link to="/contact" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Contact</Link>
        </div>

        <div className="flex space-x-6 items-center">
          {loading ? null : isUserLoggedIn ? (
            <>
              <FaShoppingCart className="text-white h-6 w-6" />
              <div className="relative user-dropdown">
                <FaUser className="text-white h-6 w-6 mr-4 cursor-pointer" onClick={() => setUserDropdownOpen(!userDropdownOpen)} />
                {userDropdownOpen && (
                  <div className="absolute mt-2 w-56 bg-white rounded-lg shadow-xl z-10 -right-2 transition-transform duration-300 transform origin-top scale-95">
                    <Link to="/account" className="block px-6 py-3 text-black hover:bg-gray-100 transition-colors duration-200 rounded-t-lg">Your Account</Link>
                    <Link to="/orders" className="block px-6 py-3 text-black hover:bg-gray-100 transition-colors duration-200 rounded-b-lg">Your Orders</Link>
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Register</Link>
              <Link to="/login" className="text-white hover:text-gray-400 transform hover:scale-105 transition-transform duration-300">Login</Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="bg-[#292e37] shadow-lg p-4 md:hidden flex justify-between items-center fixed top-0 w-full z-50 transition-all duration-300">

        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl focus:outline-none">☰</button>
        <Link to="/">
          <img src={logo} alt="ScoopNest Logo" className="h-10 transform hover:scale-110 transition-transform duration-300" />
        </Link>
      </nav>

      {/* Mobile Slide-In Menu */}
      <div className={`bg-black opacity-50 fixed top-0 left-0 h-full w-full z-40 ${isOpen ? "block" : "hidden"} transition-opacity duration-300`} onClick={closeMenu}></div>
      <div className={`bg-white fixed top-0 left-0 h-full w-64 z-50 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={closeMenu} className="text-black absolute top-4 right-4 focus:outline-none">✖️</button>
        <ul className="flex flex-col space-y-4 mt-8 ml-4">
          <Link to="/" className="text-black hover:text-gray-400" onClick={closeMenu}>Home</Link>
          <Link to="/products" className="text-black hover:text-gray-400" onClick={closeMenu}>Products</Link>
          <Link to="/about" className="text-black hover:text-gray-400" onClick={closeMenu}>About Us</Link>
          <Link to="/contact" className="text-black hover:text-gray-400" onClick={closeMenu}>Contact</Link>

          {!loading && isUserLoggedIn && (
            <>
              <li className="flex items-center space-x-3">
                <FaShoppingCart className="text-black h-6 w-6" />
                <Link to="/cart" className="text-black hover:text-gray-400" onClick={closeMenu}>Cart</Link>
              </li>
              <li className="flex items-center space-x-3 justify-between">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setMobileUserDropdown(!mobileUserDropdown)}>
                  <FaUser className="text-black h-6 w-6" />
                  <span>Profile</span>
                  {mobileUserDropdown ? <FaChevronUp className="text-black h-4 w-4"/> : <FaChevronDown className="text-black h-4 w-4"/>}
                </div>
              </li>
              {mobileUserDropdown && (
                <div className="ml-6">
                  <li>
                    <Link to="/account" className="text-black hover:text-gray-400" onClick={closeMenu}>Your Account</Link>
                  </li>
                  <li>
                    <Link to="/orders" className="text-black hover:text-gray-400" onClick={closeMenu}>Your Orders</Link>
                  </li>
                </div>
              )}
              <li>
                <button onClick={handleLogout} className="text-black hover:text-gray-400 ml-4">Logout</button>
              </li>
            </>
          )}
          {!loading && !isUserLoggedIn && (
            <>
              <Link to="/register" className="text-black hover:text-gray-400" onClick={closeMenu}>Register</Link>
              <Link to="/login" className="text-black hover:text-gray-400" onClick={closeMenu}>Login</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
