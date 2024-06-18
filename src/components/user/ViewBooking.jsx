import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl/baseUrl';
import { parse, format } from 'date-fns';
import ReviewModal from './ReviewModel';
import {BookingSkeleton} from '../../ui/Skeletons'

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovieName, setSelectedMovieName] = useState(null);



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/view-booking`, { withCredentials: true });
        const sortedBookings = response.data.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        const reversedBookings = sortedBookings.reverse();
        setBookings(reversedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const isShowStarted = (showDate, showTime) => {
    const combinedDateTimeString = `${showDate} ${showTime}`;
    const showDateTime = parse(combinedDateTimeString, "yyyy-MM-dd h:mm a", new Date());
    return (showDateTime <= new Date());
  };

  const handleOpenModal = (movieId, movieName) => {
    setSelectedMovieId(movieId);
    setSelectedMovieName(movieName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovieId(null);
    setSelectedMovieName(null);
  };
  
  return (
    <div className="min-h-screen bg-base-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking List</h1>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full max-w-4xl  rounded-lg mx-auto">
              <BookingSkeleton /> 
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="card bg-base-200 w-full max-w-4xl bg-white shadow-xl p-4 rounded-lg mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl w-3/4 font-bold">{booking.movieName}</h2>
                <span className="badge badge-lg badge-info text-clip w-2/4  md:w-32 text-sm  text-primary-content">
                  {format(new Date(booking.showDate), "d MMMM yyyy")}
                </span>
              </div>
              <div className="divider"></div>
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-auto mb-2 lg:w-1/2">
                  <span className="font-semibold">Booking ID: </span>
                  <span>{booking.id}</span>
                </div>
                <div className="w-full md:w-auto mb-2 lg:w-1/2">
                  <span className="font-semibold">Theater: </span>
                  <span>{booking.theaterName}</span>
                </div>
                <div className="w-full md:w-auto mb-2 lg:w-1/2">
                  <span className="font-semibold">Show Date: </span>
                  <span>{new Date(booking.showDate).toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-auto mb-2 lg:w-1/2">
                  <span className="font-semibold">Show Time: </span>
                  <span>{booking.showTime}</span>
                </div>
                <div className="w-full md:w-auto mb-2 lg:w-1/2">
                  <span className="font-semibold">Booked Seats: </span>
                  <span>{booking.seats ? booking.seats.join(', ') : 'No booked seats'}</span>
                </div>
                <div className="w-full md:w-auto mb-2 lg:w-1/2 text-right">
                  {isShowStarted(booking.showDate, booking.showTime) && (
                    <button onClick={() => handleOpenModal(booking.movieId, booking.movieName)} className="btn btn-success text-primary-content">Add Review</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ReviewModal isOpen={showModal} onClose={handleCloseModal} movieId={selectedMovieId} movieName={selectedMovieName} />
    </div>
  );
};

export default ViewBooking;
