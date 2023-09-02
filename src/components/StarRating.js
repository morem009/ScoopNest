import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FaStar } from 'react-icons/fa';
import { toast } from "react-toastify";

function StarRating({ productId }) {
  const db = getDatabase();
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const feedbacksRef = ref(db, `products/${productId}/feedback`);
    const unsubscribe = onValue(feedbacksRef, snapshot => {
      if (snapshot.exists()) {
        const feedbacksData = snapshot.val();
        const allFeedbacks = Object.values(feedbacksData);
        const totalRating = allFeedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
        const avgRating = totalRating / allFeedbacks.length;
        setRating(avgRating);
        setFeedbacks(allFeedbacks);
      }
    }, error => {
      console.error('Error fetching product feedbacks:', error);
      toast.error('Error fetching product feedbacks. Please try again later.');
    });

    return () => {
      unsubscribe();
    };
  }, [db, productId]);

  return (
    <>
      <div className="flex cursor-pointer" onClick={() => setShowDialog(true)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i + 1 <= rating ? <FaStar className="text-[#F28B82]" /> : <FaStar className="text-gray-300" />}
          </span>
        ))}
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, idx) => (
                <div key={idx} className="border-b pb-4 mb-4">
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i + 1 <= feedback.rating ? <FaStar className="text-[#F28B82] mr-1" /> : <FaStar className="text-gray-300 mr-1" />}
                      </span>
                    ))}
                  </div>
                  <p>{feedback.review}</p>
                </div>
              ))
            ) : (
              <p>No feedback available for this product.</p>
            )}
            <button className="mt-4 bg-[#F28B82] text-white p-2 rounded" onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default StarRating;
