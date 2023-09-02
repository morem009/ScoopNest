import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { selectCartProducts, setCart } from "../redux/cartSlice";
import { toast } from 'react-toastify';
import CartItem from '../components/CartItem';

function Cart() {
  const cartProducts = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCartData = async () => {
    const userCartRef = ref(db, `users/${auth.currentUser.uid}/cart`);
    const snapshot = await get(userCartRef);
    if (snapshot.exists()) {
      const cartData = snapshot.val();
      dispatch(setCart(cartData));
      setCartData(cartData);
    }
    setIsLoading(false);
  };

  const proceedToCheckout = async () => {
    if (Object.keys(cartData).length === 0) {
      toast.warn('Your cart is empty!');
      return;
    }
    if (!auth.currentUser) {
      toast.error('You need to be logged in to proceed.');
      navigate("/login");
      return;
    }
    const userRef = ref(db, `users/${auth.currentUser.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.address && userData.address !== "None") {
            navigate("/payment");
        } else {
            toast.warn('Kindly provide your address before proceeding to checkout.');
            navigate("/account");
        }
    } else {
        console.warn("Snapshot does not exist for user: ", auth.currentUser.uid);
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
  }, [auth, db]);

  useEffect(() => {
    let total = 0;
    Object.entries(cartData).forEach(([_, productDetails]) => {
      const productPrice = parseFloat(productDetails.price);
      const productCount = productDetails.count;
      total += productPrice * productCount;
    });
    setGrandTotal(total);
  }, [cartData]);

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      <div className="flex flex-col items-center">
        {Object.entries(cartData).map(([productID, productDetails]) => (
          <CartItem
            key={productID}
            productID={productID}
            productDetails={productDetails}
            cartData={cartData}
            setCartData={setCartData}
            cartProducts={cartProducts}
          />
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
