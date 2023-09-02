import React, { useState, useEffect } from "react";
import { ref, set, get, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaPencilAlt } from "react-icons/fa";

function FeedbackComponent({ orderKey, productId }) {
  const auth = getAuth();
  const db = getDatabase();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(productId)

  useEffect(() => {
    const fetchFeedback = async () => {
        const feedbackRef = ref(db, `users/${auth.currentUser.uid}/orders/${orderKey}/${productId}/feedback`);
        const snapshot = await get(feedbackRef);

        if (snapshot.exists()) {
            setRating(snapshot.val().rating);
            setReview(snapshot.val().review);
            setSubmitted(true);
        }
    };

    fetchFeedback();
}, [auth, db, orderKey, productId]);

const handleFeedbackSubmit = async () => {
  setIsLoading(true);
  try {
      // Save feedback under the user's order
      const feedbackUserRef = ref(
          db,
          `users/${auth.currentUser.uid}/orders/${orderKey}/${productId}/feedback`
      );
      await set(feedbackUserRef, { rating, review });

      // Push feedback to the product's feedback section
      const feedbackProductListRef = ref(db, `products/${productId}/feedback`);
      await push(feedbackProductListRef, {
          userId: auth.currentUser.uid,  // store userId as well, in case you want to attribute feedback
          rating,
          review,
          orderId: orderKey
      });

      toast.success("Thank you for your feedback!");
      setSubmitted(true);
      setEditMode(false);
      setIsLoading(false);

  } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting feedback:", error);
      setIsLoading(false);
  }
};


  return (
    <div className="border p-4 rounded mt-2 bg-gray-100">
      <h4 className="text-lg font-semibold mb-2 flex justify-between">
        Leave a Feedback
        {submitted && !editMode && (
          <FaPencilAlt
            onClick={() => setEditMode(true)}
            className="text-[#F28B82] cursor-pointer"
          />
        )}
      </h4>
      {!submitted || editMode ? (
        <>
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                onClick={() => setRating(i + 1)}
                key={i}
                className="focus:outline-none"
              >
                {i < rating ? (
                  <FaStar className="text-[#F28B82] mx-1" />
                ) : (
                  <FaRegStar className="text-[#F28B82] mx-1" />
                )}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            rows={4}
          />
          <button
    onClick={handleFeedbackSubmit}
    className="bg-[#F28B82] text-white p-2 rounded"
    disabled={isLoading} // assuming you add an isLoading state when saving
>
    Submit Feedback
</button>
        </>
      ) : (
        <>
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < rating ? (
                  <FaStar className="text-[#F28B82] mx-1" />
                ) : (
                  <FaRegStar className="text-[#F28B82] mx-1" />
                )}
              </span>
            ))}
          </div>
          <p className="border rounded p-2">{review}</p>
        </>
      )}
    </div>
  );
}

export default FeedbackComponent;
