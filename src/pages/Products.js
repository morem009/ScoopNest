import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { getDatabase, ref, onValue } from "firebase/database";

function Products() {
  const [products, setProducts] = useState([]);
  const productsPerPage = 12; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const db = getDatabase();
    const productsRef = ref(db, 'products');

    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = Object.keys(data).map(key => ({
        ...data[key],
        id: key,
      }));
      setProducts(productsArray);
    });
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);

  const handlePageChange = (index) => {
    setCurrentPage(index + 1);
    window.scrollTo(0, 450); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#F28B82] text-white py-8 md:py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">
            Dive into our delectable range of ice creams. Each flavor crafted to perfection.
          </p>
        </div>
      </section>
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">Explore Flavors</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {productsToShow.map(product => (
            <div key={product.id} className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-48 h-48 rounded-full mx-auto overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={product.imgSrc} alt={product.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="mb-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={i <= product.rating ? "text-[#F28B82]" : "text-gray-300"}>
                    {i <= product.rating ? "★" : "☆"}
                  </span>
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
        <div className="flex justify-center mt-8 space-x-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`text-lg font-medium ${
                currentPage === index + 1 ? "text-[#F28B82]" : "text-gray-600"
              }`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;
