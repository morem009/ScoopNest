import React from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="flex justify-center mt-8 space-x-4">
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    className={`text-lg font-medium ${
                        currentPage === index + 1 ? "text-[#F28B82]" : "text-gray-600"
                    }`}
                    onClick={() => onPageChange(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
