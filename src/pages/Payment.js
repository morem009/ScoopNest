import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { auth } from "../firebaseConfig";
import { getDatabase, ref, remove, set, get, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cartSlice";
import { toast } from 'react-toastify';

const stripePromise = loadStripe(
  "pk_test_51NkVpiSDsnTfu1uhPVAwNomrqbgrPjDB6WTSWnpehcUvKny2SZhuUsH5bVJ52EaPWt7aZdZATUwrGyQ5uGSdrndx0004QcwrGj"
);

const PaymentForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    const result = await stripe.createToken(elements.getElement(CardElement));

    if (result.error) {
        console.error(result.error.message);
        toast.error("Error occurred. Your order has not been confirmed.");
        setErrorMessage(result.error.message);
    } else {
        setErrorMessage("");
        toast.success("Your order has been confirmed.");

        const userUid = auth.currentUser.uid;
        const db = getDatabase();
        const cartRef = ref(db, `users/${userUid}/cart`);
        const ordersRef = ref(db, `users/${userUid}/orders`);
        const purchaseDate = new Date().toISOString(); // Get purchase date

        get(cartRef).then((snapshot) => {
            const cartItems = snapshot.val();
            if (cartItems) {
                const orderItems = {};
                Object.entries(cartItems).forEach(([productID, productDetails]) => {
                    orderItems[productID] = {
                        ...productDetails,
                        purchaseDate,
                    };
                });

                const newOrderRef = push(ordersRef);
                set(newOrderRef, orderItems);
                remove(cartRef);
                dispatch(resetCart());

                setTimeout(() => {
                    navigate("/orders");
                }, 2000);
            }
        });
    }
};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <div className="p-4 border rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Name on Card
          </label>
          <input
            className="border rounded-lg w-full p-2"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {errorMessage && (
          <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <button
        onClick={handlePayment}
        className="bg-[#F28B82] text-white px-6 py-3 rounded mt-4 block mx-auto hover:bg-[#f16255]"
      >
        Pay Now
      </button>
    </div>
  );
};

const Payment = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
