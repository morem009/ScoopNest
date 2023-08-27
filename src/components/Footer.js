import React from "react";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";  // <-- Import FaInstagram
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  }

  return (
    <div className="bg-gray-800 text-white py-6 mt-16">
      <div className="container mx-auto px-4">
        {/* Branding */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">ScoopNest</h1>
          <p className="text-sm mb-2">Crafting quality with passion</p>
        </div>

        {/* Links and Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-4">
         {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-400"
            onClick={() => handleNavigation("/")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="text-white hover:text-gray-400"
            onClick={() => handleNavigation("/products")}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white hover:text-gray-400"
            onClick={() => handleNavigation("/about")}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-white hover:text-gray-400"
            onClick={() => handleNavigation("/contact")}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>

         {/* Contacts */}
         <div>
            <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
            <ul className="space-y-2">
              <li>Address: Five Gardens, Matunga East, Mumbai</li>
              <li>Tel: 022 287 67890</li>
              <li>Email: support@scoopnest.com</li> {/* <-- Added email */}
            </ul>
          </div>
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
            <ul className="space-y-2">
              <li>Mon – Sat: 8AM – 5PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="pt-2">
          <div className="flex justify-center space-x-6 mb-3">
            <a
              href="https://twitter.com/"
              className="w-6 h-6 text-xl hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com/"
              className="w-6 h-6 text-xl hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"  
              className="w-6 h-6 text-xl hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />  {/* <-- Instagram icon */}
            </a>
            <a
              href="https://www.linkedin.com/"
              className="w-6 h-6 text-xl hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm">
              &copy; 2023 ScoopNest. Designed with ❤️ by Mandy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
