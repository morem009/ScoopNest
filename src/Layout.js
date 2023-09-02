import React from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Carousel />
            {children} 
            <Footer />
        </div>
    );
}

export default Layout;
