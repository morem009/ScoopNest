import React, { useState } from "react";
import promotionImage from "../assets/promotion.jpg";
import { FaTelegram, FaFacebookF, FaWhatsapp, FaStar, FaRegStar } from 'react-icons/fa';


function Homepage() {
  const [playVideo, setPlayVideo] = useState(false);
  const currentURL = window.location.href;
  const socialMediaLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentURL)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=Check%20out%20this%20awesome%20product!`,
  }
  const products = [
    { 
      id: 1, 
      name: "Vanilla Delight", 
      imgSrc: "https://media.istockphoto.com/id/522386716/photo/scoop-of-vanilla-ice-cream-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=qmayTJQvywngUmDn36XLDsvcEKQuNpL25Tb9mcwdWVE=", 
      rating: 4,
      telegram: socialMediaLinks.telegram,
      facebook: socialMediaLinks.facebook,
      whatsapp: socialMediaLinks.whatsapp
    },
    {
      id: 2, 
      name: "ChocoScoop", 
      imgSrc: "https://media.istockphoto.com/id/486976605/photo/chocolate-ice-cream.jpg?s=612x612&w=0&k=20&c=eHJlcVuWHfqZhWS6Sd9LOULZDnBo-VQFox-Q_PO7Oyo=", 
      rating: 4.5,
      telegram: socialMediaLinks.telegram,
      facebook: socialMediaLinks.facebook,
      whatsapp: socialMediaLinks.whatsapp
    },
    {
      id: 3, 
      name: "Strawberry Bliss", 
      imgSrc: "https://media.istockphoto.com/id/175000914/photo/scoop-of-strawberry-ice-cream-isolated-on-white.jpg?s=612x612&w=0&k=20&c=DRRkFdJ_1w-HXnoCuT2npVEGvQe4MZcKoNasiAeD2-E=", 
      rating: 4.8,
      telegram: socialMediaLinks.telegram,
      facebook: socialMediaLinks.facebook,
      whatsapp: socialMediaLinks.whatsapp
    }
  ];

  const handleVideoClick = () => {
    setPlayVideo(!playVideo);
  };

  return (
    <div className="bg-gray-100 min-h-screen m-0 p-0">
      {/* Top Selling Products */}
      <div className="mb-8 mx-auto max-w-6xl px-4">
    <h2 className="text-2xl font-extrabold mb-4">Top Selling Ice Creams</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="w-48 h-48 rounded-full mx-auto overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={product.imgSrc} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">{product.name}</h3>
              <div className="flex mb-4 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  i < product.rating ? 
                    <FaStar className="text-[#F28B82] mx-1" key={i} /> :
                    <FaRegStar className="text-[#F28B82] mx-1" key={i} />
                ))}
              </div>
              <div className="flex justify-center space-x-4">
                <a href={product.telegram} target="_blank" rel="noreferrer" className="text-[#F28B82] hover:text-[#F0696A]">
                  <FaTelegram size={24} />
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
      </div>

      {/* Video and Promotional Content */}
      <div className="mb-8 mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-extrabold mb-4">
          Our Ice Cream Making Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Video */}
          <div className="relative rounded-lg shadow-lg overflow-hidden">
            {playVideo ? (
              <>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/kWpXIlvZyGY?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className="absolute top-2 right-2 bg-white bg-opacity-70 text-black rounded-full focus:outline-none p-2"
                  onClick={handleVideoClick}
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <img
                  className="w-full h-56 md:h-64 lg:h-80 object-cover"
                  src={promotionImage}
                  alt="Video Thumbnail"
                  onClick={handleVideoClick}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg bg-opacity-70">
                  <button
                    className="text-black text-3xl focus:outline-none"
                    onClick={handleVideoClick}
                  >
                    ▶️
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Promotional Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Delightful Flavors</h3>
            <p className="text-gray-700">
              Dive into our wide range of flavors crafted with utmost care. From
              classics like Vanilla and Chocolate to exotic delights such as
              Mango Tango and Raspberry Ripple, there's something for everyone
              at Scoopnest. Every scoop of our ice cream is a story of passion,
              precision, and pure ingredients. Join us on this delicious
              journey, and discover your next favorite flavor!
            </p>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="mb-8 mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-extrabold mb-4">About Scoopnest</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-700">
            Scoopnest is a premium ice cream brand offering a variety of
            delightful flavors...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
