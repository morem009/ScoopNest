import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

// Importing images
import VanillaImage from '../assets/Vanilla.png';
import ChocolateImage from '../assets/Chocolate.png';
import StrawberryImage from '../assets/Strawberry.png';

function Products() {
  const products = [
    {
      name: "Vanilla Delight",
      imgSrc: VanillaImage,
      rating: 4.5,
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      whatsapp: "https://www.whatsapp.com/"
    },
    {
      name: "Chocolate Fantasy",
      imgSrc: ChocolateImage,
      rating: 4.7,
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      whatsapp: "https://www.whatsapp.com/"
    },
    {
      name: "Strawberry Bliss",
      imgSrc: StrawberryImage,
      rating: 4.8,
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      whatsapp: "https://www.whatsapp.com/"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-[#F28B82] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">
            Dive into our delectable range of ice creams. Each flavor crafted to perfection.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">Explore Flavors</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          {products.map(product => (
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-48 h-48 rounded-full mx-auto overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={product.imgSrc} alt={product.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="mb-6">
                {/* Display stars for rating */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < product.rating ? "text-[#F28B82]" : "text-gray-300"}>★</span>
                ))}
              </div>
              <div className="flex justify-center space-x-4">
                <a href={product.instagram} target="_blank" rel="noreferrer" className="text-[#F28B82] hover:text-[#F0696A]">
                  <FaInstagram size={24} />
                </a>
                <a href={product.facebook} target="_blank" rel="noreferrer" className="text-[#1877F2] hover:text-[#0b5ed7]">
                  <FaFacebookF size={24} />
                </a>
                <a href={product.whatsapp} target="_blank" rel="noreferrer" className="text-[#25D366] hover:text-[#128C7E]">
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;