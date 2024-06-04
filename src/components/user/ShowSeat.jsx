import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import toast from 'react-hot-toast';
import { createOrder, handlePayment } from '../../config/razorpay'
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/userAtom';
import 'https://checkout.razorpay.com/v1/checkout.js'

export default function ShowSeat() {
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const userId = useRecoilValue(userIdState);
  const { showId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeatingPattern = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/show-seats/${showId}`, { withCredentials: true });
        console.log(response.data);
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
      if (newSelectedSeats.length < 6) {
        seat.status = 'selected';
        newSelectedSeats = [...newSelectedSeats, seat.seat];
      } else {
        toast.error('You can only book up to 6 seats at a time.');
      }
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      newSelectedSeats = newSelectedSeats.filter(selectedSeat => selectedSeat !== seat.seat);
    }
  
    setSeats(newSeats);
    setSelectedSeats(newSelectedSeats);
  
    console.log(newSelectedSeats, 'selectedSeats');
  };
  
  

  const handleBooking = async () => {
    try {
      if (selectedSeats.length === 0) {
        toast.error('Please select a seat to book.');
        return;
      }
      const order = await createOrder(selectedSeats.length * price,selectedSeats,showId);
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
          const response = await axios.post(`${baseUrl}/api/verify-payment`, bookingData, { withCredentials: true });
  
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
    }
  };

  return (
    <div className='container h-screen mx-auto px-5 '>
      <div className="flex justify-center items-center h-[75vh] overflow-x-auto animate-fade-in">
        <div className="rounded-lg p-10 min-w-96 w-auto min-h-72 h-auto flex flex-col gap-2">
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
                      className={`seat w-6 h-6 mr-1 lg:mr-5 lg:mb-5 rounded-md cursor-pointer text-center text-sm 
                        ${seat.status === 'booked' || seat.status === 'reserved' ? 'bg-base-300' : seat.status === 'selected' ? 'bg-success' : 'bg-info'}
                        ${seat.status === 'booked' || seat.status === 'reserved' ? '' : 'lg:hover:bg-success'}`}
                      style={{ cursor: seat.status === 'booked' || seat.status === 'reserved' ? 'default' : 'pointer' }}
                      onClick={() => (seat.status === 'available' || seat.status === 'selected') && handleSeat(rowIndex, seatIndex)}
                    >
                      <span className="text-xs text-primary-content">{seat.seat.slice(1)}</span>
                    </div>
                  ) : (
                    <div className="h-6 w-6 mr-1 lg:mr-5" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className=' flex justify-center mb-5'>
      <span className="flex font-mono">
        SCREEN THIS WAY
      </span>
      </div>
      <div className=' flex justify-evenly'>
        <div className='flex felx-col'>
          <div className=' w-6 h-6 mr-1 lg:mr-5 lg:mb-5 rounded-md cursor-pointer text-center text-sm bg-info' ><span></span></div>
          <span>Available</span>
        </div>
        <div className='flex'>
          <div className=' w-6 h-6 mr-1 lg:mr-5 lg:mb-5 rounded-md cursor-pointer text-center text-sm bg-base-300' ></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="divider"></div>
      <div className="flex flex-row justify-between items-center">
        <h1 className='text-left text-sm lg:text-2xl mr-5'>Price: {price} rs</h1>
        <h1 className='text-left text-sm lg:text-2xl mr-5'>Total amount: {selectedSeats.length * price} rs</h1>
        <button
          className="btn btn-primary mt-2 text-right"
          onClick={handleBooking}
        >
          Book Seat
        </button>
      </div>
    </div>
  );
}