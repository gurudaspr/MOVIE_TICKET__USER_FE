import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl/baseUrl';

const ReviewModal = ({ booking, onClose }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); // State to manage rating

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        movie: booking.movieId,
        movieName: booking.movieName,
        review: reviewText,
        rating: rating ,
      };

      await axios.post(`${baseUrl}/api/add-review`, reviewData);
      alert('Review added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again.');
    }
  };

  return (
    <>
      <input type="checkbox" id="review_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add Review</h3>
          <p className="py-4">Write your review for {}</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea
                id="review"
                rows="3"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <input
                    key={value}
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green-500"
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Submit Review
              </button>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="review_modal" className="btn" onClick={onClose}>Close</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
