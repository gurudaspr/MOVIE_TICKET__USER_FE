import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { selectedSeatsState } from '../../store/SeatAtom';
import { useRecoilState } from 'recoil';
import { baseUrl } from '../../baseUrl/baseUrl';

export default function ShowSeat() {
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { showId } = useParams();

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
  }, [showId]); 

  const handleSeat = (rowIndex, seatIndex) => {
    const newSeats = [...seats]; // Shallow copy seats array
    const seat = newSeats[rowIndex][seatIndex];
    if (seat.status === 'available') {
      seat.status = 'selected';
      setSelectedSeats([...selectedSeats, seat.seat]);
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seat.seat));
    }
    setSeats(newSeats);
  };

  const handleBooking = () => {
    console.log('Selected seats:', selectedSeats);

  };

  return (
    <div className="flex justify-center items-center h-screen overflow-x-auto animate-fade-in">
    <div className="py-32">
      <div className="rounded-lg p-10 min-w-96 w-auto min-h-72 h-auto flex flex-col gap-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row flex justify-between">
            {row.some(seat => seat !== null) && (
              <div className="row-label w-6">
                {row.find(seat => seat !== null).seat[0]}
              </div>
            )}
            {row.map((seat, seatIndex) => (
              <div key={seatIndex}>
                {seat !== null ? (
                  <div
                    className={`seat w-6 h-6 mr-1 lg:mr-5 lg:mb-5 rounded-md cursor-pointer text-center text-sm 
                      ${seat.status === 'booked' ? 'bg-base-300' : seat.status === 'selected' ? 'bg-success' : 'bg-info'}
                      ${seat.status !== 'booked' ? 'hover:bg-success' : ''}`}
                    style={{ cursor: seat.status === 'booked' ? 'default' : 'pointer' }}
                    onClick={() => seat.status !== 'booked' && handleSeat(rowIndex, seatIndex)}
                  >
                    <span className="text-xs text-primary-content">{seat.seat.slice(1)}</span>
                  </div>
                ) : (
                  <div className="h-6 w-6 mr-1 lg:mr-5  " />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
          <h1 className='text-left text-2xl mr-5'>Amount: {selectedSeats.length * price}</h1>
          {/* <h2 className='text-left text-2xl'> {selectedSeats.join(', ')}</h2> */}
          
         
          <button
            className="btn btn-primary mt-2 text-right"
            onClick={handleBooking}
          >
            Book Seat
          </button>
          </div>
    </div>
  </div>
  );
}