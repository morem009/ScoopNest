import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, set, remove, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { selectCartProducts, removeProduct, setCart } from "../redux/cartSlice";
import { toast } from 'react-toastify';


function Cart() {
  const cartProducts = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState({});
  const [subtotal, setSubtotal] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCartData = async () => {
    const userCartRef = ref(db, `users/${auth.currentUser.uid}/cart`);

    try {
      const snapshot = await get(userCartRef);

      if (snapshot.exists()) {
        const cartData = snapshot.val();
        dispatch(setCart(cartData));
        setCartData(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }

    setIsLoading(false);
  };

  const proceedToCheckout = async () => {
    console.log("Attempting to proceed to checkout...");

    // Check if the cart is empty and show a toast notification if it is
    if (Object.keys(cartData).length === 0) {
      toast.warn('Your cart is empty!');
      return;
    }

    if (!auth.currentUser) {
      toast.error('You need to be logged in to proceed.');
      navigate("/login");
      return;
    }
    
    try {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.address && userData.address !== "None") {
              navigate("/payment");
          } else {
              toast.warn('Kindly provide your address before proceeding to checkout.');
              navigate("/account"); // navigate to account page for address update
          }
      } else {
          console.warn("Snapshot does not exist for user: ", auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error while checking user's address:", error);
      toast.error("Error while checking user's address.");
    }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCartData();
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [auth, db]);

  useEffect(() => {
    const newSubtotal = {};
    let total = 0;

    Object.entries(cartData).forEach(([productName, productDetails]) => {
      const productPrice = parseFloat(productDetails.price);
      const productCount = productDetails.count;
      newSubtotal[productName] = productPrice * productCount;
      total += newSubtotal[productName];
    });

    setSubtotal(newSubtotal);
    setGrandTotal(total);
  }, [cartData]);

  const handleIncrement = async (productName) => {
    const productRef = ref(
      db,
      `users/${auth.currentUser.uid}/cart/${productName}`
    );
    const snapshot = await get(productRef);
    const existingData = snapshot.val();
    const newCount = (existingData?.count || 0) + 1;
    const updatedData = {
      ...existingData,
      count: newCount,
      image: cartProducts[productName]?.image,
    };
    set(productRef, updatedData);
    const updatedCartData = { ...cartData, [productName]: updatedData };
    setCartData(updatedCartData);
  };

  const handleDecrement = async (productName) => {
    const productRef = ref(
      db,
      `users/${auth.currentUser.uid}/cart/${productName}`
    );

    const snapshot = await get(productRef);
    const existingData = snapshot.val();
    const newCount = existingData?.count - 1;

    if (newCount === 0) {
      dispatch(removeProduct(productName));
      await remove(productRef);

      // Remove the product from the local cartData state
      const updatedCartData = { ...cartData };
      delete updatedCartData[productName];
      setCartData(updatedCartData);
    } else {
      // Update the count property while maintaining other properties
      const updatedData = {
        ...existingData,
        count: newCount,
        image: cartProducts[productName]?.image,
      };

      // Set the updated data back to the database
      set(productRef, updatedData);

      // Update the local cartData state with the new count
      const updatedCartData = { ...cartData, [productName]: updatedData };
      setCartData(updatedCartData);
    }
  };

  const handleRemove = async (productName) => {
    const productRef = ref(
      db,
      `users/${auth.currentUser.uid}/cart/${productName}`
    );

    dispatch(removeProduct(productName));
    await remove(productRef);

    // Remove the product from the local cartData state
    const updatedCartData = { ...cartData };
    delete updatedCartData[productName];
    setCartData(updatedCartData);
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      <div className="flex flex-col items-center">
        {Object.entries(cartData).map(([productName, productDetails]) => (
          <div key={productName} className="bg-white shadow-md rounded p-6 mb-4 flex items-center md:w-2/3 lg:w-1/2">
            <img
              src={productDetails.image}
              alt={productName}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{productName}</h3>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecrement(productName)}
                  className="bg-red-500 p-2 rounded text-white"
                >
                  -
                </button>
                <p className="px-4">{productDetails.count}</p>
                <button
                  onClick={() => handleIncrement(productName)}
                  className="bg-green-500 p-2 rounded text-white"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(productName)}
              className="bg-gray-500 p-2 rounded text-white ml-4"
            >
              Remove
            </button>
            <p className="px-4">Price: {productDetails.price}</p>
            <p className="px-4">Subtotal: {subtotal[productName]}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <p className="font-semibold">Grand Total: {grandTotal}</p>
      </div>
      <button onClick={proceedToCheckout} className="bg-[#F28B82] text-white p-4 rounded mt-4 block mx-auto hover:bg-[#f16255]">
    Proceed to Checkout
</button>
    </div>
  );
}

export default Cart;
