import React from 'react';
import { FaSearch } from "react-icons/fa";

function SearchComponent({ searchTerm, onSearchChange, onSearch, suggestions, onSuggestionClick }) {
    return (
        <div className="relative w-full md:w-2/3 lg:w-1/3 mb-12">
            <div className="flex rounded-full overflow-hidden border border-gray-300 w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                    onKeyDown={(e) => (e.key === "Enter" ? onSearch() : null)}
                    placeholder="Search products..."
                    className="flex-grow px-2 py-2 pl-4 bg-white text-[#F28B82] focus:ring-2 focus:ring-[#F0696A] focus:outline-none"
                />
                <div className="bg-[#F28B82] cursor-pointer p-4" onClick={onSearch}>
                    <FaSearch className="text-white" />
                </div>
            </div>
            <div className="absolute mt-1 w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-md z-50">
                {suggestions.map((product) => (
                    <div
                        key={product.id}
                        className="p-2 hover:bg-[#F28B82] hover:text-white rounded-lg cursor-pointer"
                        onClick={() => onSuggestionClick(product)}
                    >
                        {product.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchComponent;
