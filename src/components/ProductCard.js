import React from 'react';
import { FaTelegram, FaFacebookF, FaWhatsapp, FaCartPlus, FaHeart } from "react-icons/fa";
import StarRating from '../components/StarRating';

function ProductCard({ product, onAddToCart, socialMediaLinks }) {
    return (
        <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-48 h-48 rounded-full mx-auto overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                    src={product.imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
            </div>
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-xl font-semibold mb-4">{product.price}</p>
            <div className="mb-6 flex justify-center">
                <StarRating productId={product.id} />
            </div>
            <div className="flex md:justify-between justify-center items-center mb-4 space-x-4 md:space-x-0">
            <button
  onClick={() => onAddToCart(product.id, product.name, product.imgSrc, product.price)}
  className="bg-[#F28B82] hover:bg-[#F0696A] text-white rounded-full py-1 px-3 flex items-center text-sm"
>
  <FaCartPlus className="mr-1" /> Cart
</button>

                <button className="text-[#F28B82] hover:text-[#F0696A] bg-transparent border border-[#F28B82] hover:border-[#F0696A] rounded-full py-1 px-3 flex items-center text-sm">
                    <FaHeart className="mr-1" /> Wishlist
                </button>
            </div>
            <div className="flex justify-center space-x-4">
                <a
                    href={socialMediaLinks.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F28B82] hover:text-[#F0696A]"
                >
                    <FaTelegram size={24} />
                </a>
                <a
                    href={socialMediaLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1877F2] hover:text-[#0b5ed7]"
                >
                    <FaFacebookF size={24} />
                </a>
                <a
                    href={socialMediaLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#25D366] hover:text-[#128C7E]"
                >
                    <FaWhatsapp size={24} />
                </a>
            </div>
        </div>
    );
}

export default ProductCard;
