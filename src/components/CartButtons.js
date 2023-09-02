import React from 'react';

export const DecrementButton = ({ handleDecrement, productId }) => {
    return <button onClick={() => handleDecrement(productId)} className="bg-red-500 p-2 rounded text-white">-</button>;
};

export const IncrementButton = ({ handleIncrement, productId }) => {
    return <button onClick={() => handleIncrement(productId)} className="bg-green-500 p-2 rounded text-white">+</button>;
};

export const RemoveButton = ({ handleRemove, productId }) => {
    return <button onClick={() => handleRemove(productId)} className="bg-gray-500 p-2 rounded text-white ml-4">Remove</button>;
};
