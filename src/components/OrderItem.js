// OrderItem.js
import React from "react";

function OrderItem({ orderKey, orderItems }) {
  return (
    <div key={orderKey} className="bg-white shadow-md rounded p-6 mb-4">
      <h3 className="text-lg font-semibold">Order ID: {orderKey}</h3>
      <ul className="mt-2">
        {Object.entries(orderItems).map(([productName, productDetails]) => (
          <li key={productName}>
            <div className="flex items-center space-x-4">
              <img src={productDetails.image} alt={productName} className="w-16 h-16" />
              <div>
                {productName} - Quantity: {productDetails.count}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderItem;
