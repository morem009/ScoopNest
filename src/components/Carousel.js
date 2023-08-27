import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import carouselImage1 from "../assets/carousel-1.jpg";
import carouselImage2 from "../assets/carousel-2.jpg";

function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const location = useLocation();

  let texts1 = { header: "Traditional & Delicious", subtext: "Traditional Ice Cream Since 2018" };
  let texts2 = { header: "Pure & Fresh", subtext: "Made From Our Own Organic Milk" };

  switch (location.pathname) {
    case '/products':
      texts1 = { header: "Tasty Selection", subtext: "Discover our range of flavors" };
      texts2 = { header: "Natural Ingredients", subtext: "Quality that you can taste" };
      break;
    case '/contact':
      texts1 = { header: "Reach Out", subtext: "We're here to help and answer questions" };
      texts2 = { header: "Stay Connected", subtext: "Join our community and share moments" };
      break;
    case '/about':
      texts1 = { header: "Our Journey", subtext: "Learn more about our beginnings" };
      texts2 = { header: "Our Mission", subtext: "Serving joy one scoop at a time" };
      break;
    case '/login':
      texts1 = { header: "Welcome Back", subtext: "Delicious moments await you" };
      texts2 = { header: "Login", subtext: "Access your account" };
      break;
    case '/register':
      texts1 = { header: "Join Us", subtext: "Experience the sweet world of ScoopNest" };
      texts2 = { header: "Sign Up", subtext: "Begin your journey" };
      break;
    default:
      break;
  }

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + 2) % 2);
  };
  return (
    <div className="relative  w-full overflow-hidden">
      <div className="rounded shadow relative h-auto md:h-96 lg:h-112 transition-all duration-300">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeSlide * 50}%)`,
            width: "200%",
          }}
        >
          <div className="w-1/2 h-full relative hover:opacity-90 transition-opacity duration-300">
            <img
              src={carouselImage1}
              alt="Ice Cream 1"
              className="w-full object-cover h-full md:h-96 lg:h-112"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-50">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                {texts1.header}
              </h2>
              <p className="text-lg md:text-xl text-white">
                {texts1.subtext}
              </p>
            </div>
          </div>

          <div className="w-1/2 h-full relative hover:opacity-90 transition-opacity duration-300">
            <img
              src={carouselImage2}
              alt="Ice Cream 2"
              className="w-full object-cover h-full md:h-96 lg:h-112"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-50">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                {texts2.header}
              </h2>
              <p className="text-lg md:text-xl text-white">
                {texts2.subtext}
              </p>
            </div>
          </div>
        </div>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 text-black rounded-full focus:outline-none hover:bg-opacity-75 transition-all duration-300 shadow-md z-10"
          onClick={prevSlide}
        >
          &#8592;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 text-black rounded-full focus:outline-none hover:bg-opacity-75 transition-all duration-300 shadow-md z-10"
          onClick={nextSlide}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default Carousel;
