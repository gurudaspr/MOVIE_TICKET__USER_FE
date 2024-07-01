import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import toast from 'react-hot-toast';
import { createOrder, handlePayment } from '../../config/razorpay';
import 'https://checkout.razorpay.com/v1/checkout.js';

export default function ShowSeat() {
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeatingPattern = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/show-seats/${showId}`, { withCredentials: true });
        
        setSeats(response.data.showSeating);
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching seating pattern:', error);
      }
    };

    fetchSeatingPattern();
  }, []);

  const handleSeat = (rowIndex, seatIndex) => {
    const newSeats = [...seats];
    const seat = newSeats[rowIndex][seatIndex];
    let newSelectedSeats = [...selectedSeats];

    if (seat.status === 'available') {
      if (newSelectedSeats.length < 10) {
        seat.status = 'selected';
        newSelectedSeats = [...newSelectedSeats, seat.seat];
      } else {
        toast.error('You can only book up to 10 seats at a time.');
      }
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      newSelectedSeats = newSelectedSeats.filter(selectedSeat => selectedSeat !== seat.seat);
    }

    setSeats(newSeats);
    setSelectedSeats(newSelectedSeats);

   
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      if (selectedSeats.length === 0) {
        toast.error('Please select a seat to book.');
        setLoading(false); 
        return;
      }
      
      const order = await createOrder(selectedSeats.length * price, selectedSeats, showId);
      setLoading(false)
      handlePayment(order, async (paymentId, razorpay_signature) => {
        const bookingData = {
          showId,
          seats: selectedSeats,
          totalPrice: selectedSeats.length * price,
          paymentId,
          razorpay_signature,
          orderId: order.id,
        };
        
        try {
          const response = await axios.post(`${baseUrl}/api/user/verify-payment`, bookingData, { withCredentials: true });

          if (response.status === 200) {
            setSelectedSeats([]);
            toast.success('Booking successful!');
            navigate('/bookings');
          } else {
            toast.error('Booking failed. Please try again.');
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            console.error('Error during booking:', error);
            toast.error('Booking failed. Please try again.');
          }
        } finally {
          setLoading(false); 
        }
      });
    } catch (error) {
      console.error('Error during booking:', error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        console.error('Error during booking:', error);
        toast.error('Booking failed. Please try again.');
      }
      setLoading(false); 
    }
  };


  return (
    <div className='container h-screen mx-auto px-5 pt-5  '>
      <div className="flex justify-center items-center h-[70vh] overflow-x-auto animate-fade-in">
        <div className="rounded-lg p-10 min-w-96 w-auto min-h-72 max-h-96 flex flex-col gap-2">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="row flex justify-between">
              {row.some(seat => seat !== null) && (
                <div className="row-label w-6 mr-2 pr-5 ">
                  {row.find(seat => seat !== null).seat[0]}
                </div>
              )}
              {row.map((seat, seatIndex) => (
                <div key={seatIndex}>
                  {seat !== null ? (
                    <div
                      className={`seat w-6 h-6 mr-1 lg:mr-2 lg:mb-2 rounded-md cursor-pointer text-center text-sm 
                        ${seat.status === 'booked' || seat.status === 'reserved' ? 'bg-base-300' : seat.status === 'selected' ? 'bg-success' : 'bg-info'}
                        ${seat.status === 'booked' || seat.status === 'reserved' ? '' : 'lg:hover:bg-success'}`}
                      style={{ cursor: seat.status === 'booked' || seat.status === 'reserved' ? 'default' : 'pointer' }}
                      onClick={() => (seat.status === 'available' || seat.status === 'selected') && handleSeat(rowIndex, seatIndex)}
                    >
                      <span className="text-xs text-primary-content">{seat.seat.slice(1)}</span>
                    </div>
                  ) : (
                    <div className="h-6 w-6 mr-1  lg:mr-2 lg:mb-2 " />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className=' flex justify-center my-3'>
      <span className="flex font-mono">
        SCREEN THIS WAY
      </span>
      </div>
      <div className=' flex justify-evenly'>
        <div className='flex felx-col'>
          <div className=' w-6 h-6 mr-1 lg:mr-5 lg:mb-5 rounded-md  text-center text-sm bg-info' ><span></span></div>
          <span>Available</span>
        </div>
        <div className='flex'>
          <div className=' w-6 h-6 mr-1 lg:mr-5 lg:mb-5 rounded-md r text-center text-sm bg-base-300' ></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="divider"></div>
      <div className="flex flex-row justify-between items-center">
        <h1 className='text-left text-sm md:text-xl lg:text-2xl mr-5'>Price: {price} rs</h1>
        <h1 className='text-left text-sm md:text-xl lg:text-2xl mr-5'>Total: {selectedSeats.length * price} rs</h1>
        <button
      
          onClick={handleBooking}
          className="btn btn-primary w-28"disabled={loading}>{loading ? <span className='loading loading-spinner bg-primary '></span> : "Book Seat"}
        </button>
      </div>
    </div>
  );
}