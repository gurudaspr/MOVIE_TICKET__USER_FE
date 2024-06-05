import React from 'react';
import { format } from 'date-fns';

export default function ShowReview({ reviews }) {
  return (
    <div className="reviews mt-8">
      <h2 className="text-3xl font-bold mb-6 ml-5">Reviews</h2>
      <div className="bg-base-100">
        {reviews.map(review => (
          <div key={review._id} className=" p-6 rounded-lg">
            <p className="mb-2 text-xl text-neutral-content">
              {review.userId.name.charAt(0).toUpperCase() + review.userId.name.slice(1).toLowerCase()}
            </p>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <div className="rating rating-sm gap-1 pointer-events-none">
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
            <p className="mb-4 text-gray-700">{review.review}</p>
            <p className="text-gray-500 text-sm">
              <strong>Date:</strong> {format(new Date(review.date), 'dd MMMM yyyy')}
            </p>
            <div className='divider'></div>
          </div>
          
          
        ))
        }
        
      </div>
    </div>
  );
}
