import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import FeedbackComponent from "../components/Feedback";

function Orders() {
  const auth = getAuth();
  const db = getDatabase();
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const ordersRef = ref(db, `users/${userUid}/orders`);
        get(ordersRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setOrders(snapshot.val());
            }
          })
          .catch((error) => {
            toast.error("Error fetching orders:");
            console.error("Error fetching orders:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, db]);

  const filteredOrders = () => {
    const currentDate = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const past3Months = new Date();
    past3Months.setMonth(past3Months.getMonth() - 3);
    const past6Months = new Date();
    past6Months.setMonth(past6Months.getMonth() - 6);

    switch (filter) {
      case "lastMonth":
        return filterOrdersByDate(lastMonth, currentDate);
      case "past3Months":
        return filterOrdersByDate(past3Months, currentDate);
      case "past6Months":
        return filterOrdersByDate(past6Months, currentDate);
      default:
        return orders;
    }
  };

  const filterOrdersByDate = (startDate, endDate) => {
    const filtered = {};
    for (const orderId in orders) {
      for (const productId in orders[orderId]) {
        const purchaseDate = new Date(orders[orderId][productId].purchaseDate);
        if (purchaseDate >= startDate && purchaseDate <= endDate) {
          if (!filtered[orderId]) {
            filtered[orderId] = {};
          }
          filtered[orderId][productId] = orders[orderId][productId];
        }
      }
    }
    return filtered;
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
        <div className="mb-4 text-center">
          <label className="mr-2">Filter by:</label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="px-2 py-1 border rounded"
          >
            <option value="all">All Orders</option>
            <option value="lastMonth">Last Month</option>
            <option value="past3Months">Past 3 Months</option>
            <option value="past6Months">Past 6 Months</option>
          </select>
        </div>

        {Object.keys(filteredOrders()).length === 0 ? (
          <p className="text-center">No orders match the selected filter.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(filteredOrders()).map(([orderKey, orderItems]) => (
              <div key={orderKey} className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-semibold">Order ID: {orderKey}</h3>
                <ul className="mt-2">
                  {Object.entries(orderItems).map(
                    ([productKey, productDetails]) => (
                      <li key={productKey} className="mb-2">
                        <div className="flex items-center">
                          <img
                            src={productDetails.image}
                            alt={productDetails.name}
                            className="w-12 h-12 mr-2"
                          />
                          {productDetails.name} - Quantity:{" "}
                          {productDetails.count}
                        </div>
                        <p>
                          Purchase Date:{" "}
                          {new Date(
                            productDetails.purchaseDate
                          ).toLocaleString()}
                        </p>
                        <FeedbackComponent
                          orderKey={orderKey}
                          productId={productKey}
                        />
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
