import React from 'react';

export default function ShowReview({ reviews }) {
  return (
    <div className="reviews mt-8">
      <h2 className="text-3xl font-bold mb-6">Reviews</h2>
      {reviews.map(review => (
        <div key={review._id} className="mb-6 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <div className="rating gap-1">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <input
                    key={index}
                    type="radio"
                    name={`rating-${review._id}`}
                    disabled
                    className={`mask mask-star-2 ${index < review.rating ? 'bg-warning' : ''} ${index < review.rating ? 'checked' : ''}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{review.rating} out of 5</span>
            </div>
          </div>
          <p className="mb-2 text-gray-800"><strong>User:</strong> {review.userId.name}</p>
          <p className="mb-4 text-gray-700">{review.review}</p>
          <p className="text-gray-500 text-sm"><strong>Date:</strong> {new Date(review.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
