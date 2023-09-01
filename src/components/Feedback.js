import React, { useState, useEffect } from 'react';
import { ref, set, get, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FaStar, FaRegStar, FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function FeedbackComponent({ orderKey, productId }) {
  const auth = getAuth();
  const db = getDatabase();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    const feedbackRef = ref(db, `users/${auth.currentUser.uid}/orders/${orderKey}/${productId}/feedback`);
    await set(feedbackRef, {
      rating: rating,
      review: review,
    });
    toast.success('Thank you for your feedback!');
    setSubmitted(true);
    setEditMode(false);
  };

  return (
    <div className="border p-4 rounded mt-2 bg-gray-100">
      <h4 className="text-lg font-semibold mb-2 flex justify-between">
        Leave a Feedback 
        {submitted && !editMode && (
          <FaPencilAlt onClick={() => setEditMode(true)} className="text-[#F28B82] cursor-pointer" />
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
