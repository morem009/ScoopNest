import React from "react";
import { getDatabase, ref, set, remove, get } from "firebase/database";
import { getAuth } from "firebase/auth";

function CartItem({ productID, productDetails, cartData, setCartData, cartProducts }) {
  const auth = getAuth();
  const db = getDatabase();

  const handleIncrement = async () => {
    const productRef = ref(db, `users/${auth.currentUser.uid}/cart/${productID}`);
    const snapshot = await get(productRef);
    const existingData = snapshot.val();
    const newCount = (existingData?.count || 0) + 1;
    const updatedData = {
      ...existingData,
      count: newCount,
      image: cartProducts[productID]?.image,
    };
    await set(productRef, updatedData);
    const updatedCartData = { ...cartData, [productID]: updatedData };
    setCartData(updatedCartData);
  };

  const handleDecrement = async () => {
    const productRef = ref(db, `users/${auth.currentUser.uid}/cart/${productID}`);
    const snapshot = await get(productRef);
    const existingData = snapshot.val();
    const newCount = existingData?.count - 1;
    if (newCount === 0) {
      await remove(productRef);
      const updatedCartData = { ...cartData };
      delete updatedCartData[productID];
      setCartData(updatedCartData);
    } else {
      const updatedData = {
        ...existingData,
        count: newCount,
        image: cartProducts[productID]?.image,
      };
      await set(productRef, updatedData);
      const updatedCartData = { ...cartData, [productID]: updatedData };
      setCartData(updatedCartData);
    }
  };

  const handleRemove = async () => {
    const productRef = ref(db, `users/${auth.currentUser.uid}/cart/${productID}`);
    await remove(productRef);
    const updatedCartData = { ...cartData };
    delete updatedCartData[productID];
    setCartData(updatedCartData);
  };

  const price = parseFloat(productDetails.price);
  const count = parseInt(productDetails.count, 10);
  const subtotal = price * count;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col md:flex-row md:items-center w-full md:w-2/3 lg:w-1/2 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col items-center w-full md:w-1/4 mb-4 md:mb-0">
            <img src={productDetails.image} alt={productDetails.name} className="w-16 h-16 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{productDetails.name}</h3>
        </div>
        <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
            <button onClick={handleDecrement} className="bg-red-500 p-2 rounded text-white">-</button>
            <p>{count}</p>
            <button onClick={handleIncrement} className="bg-green-500 p-2 rounded text-white">+</button>
        </div>
        <div className="w-full md:w-auto">
            <button onClick={handleRemove} className="bg-gray-500 p-2 rounded text-white w-full md:w-auto">Remove</button>
        </div>
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4 w-full md:w-auto mb-4 md:mb-0">
            <p className="text-xl font-semibold">Price: {price}</p>
            <p className="text-xl font-semibold">Subtotal: {subtotal}</p>
        </div>
    </div>
);

}

export default CartItem;
