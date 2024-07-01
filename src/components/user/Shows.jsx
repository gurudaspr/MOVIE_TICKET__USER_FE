import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import { movieTitleState } from '../../store/movieTitleAtom';
import { useRecoilValue } from 'recoil';

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const movieTitle = useRecoilValue(movieTitleState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await axios.get(`${baseUrl}/api/user/shows?date=${formattedDate}&movieId=${id}`, { withCredentials: true });
        setShows(response.data);
       
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, [selectedDate, id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderDateTabs = () => {
    const dateTabs = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dateTabs.push(
        <button
          key={i}
          className={`px-4 py-2  rounded-md mr-2 border-none hover:bg-primary-hover text-primary-content ${selectedDate.toDateString() === date.toDateString() ? 'bg-primary' : ' bg-base-300'}`}
          onClick={() => handleDateChange(date)}
        >
          {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </button>
      );
    }
    return dateTabs;
  };

  const ShowSeat = (showId) => {
    navigate(`/showSeat/${showId}`);
  };

  return (
    <div className="container h-screen mx-auto  px-5 md:px-10 py-20 animate-fade-in">
      <h1 className="text-3xl font-semibold mb-4">{movieTitle}</h1>
      <div className="flex mb-4">
        {renderDateTabs()}
      </div>
      <div className="divider"></div>
      <ul>
        {shows
          .filter((show) => show.showTimes.length > 0)
          .map((show) => (
            <li key={`${show.theater}-${show.movieTitle}`} className="py-4">
              <h2 className="text-xl font-semibold mb-1">{show.theater}</h2>
              <span className='text-sm pt-5'>{show.theaterLocation}</span>
              <p className="text-lg mb-2"></p>
              <div className="flex flex-wrap">
                {show.showTimes.map(({ showTime, showId }) => (
                  <button
                    onClick={() => ShowSeat(showId)}
                    key={showId}
                    className="bg-base-200 hover:bg-base-300 text-gray-700 border-white rounded-lg w-20 h-10 mb-3 mr-1"
                  >
                    {showTime}
                  </button>
                ))}
              </div>
              <div className="divider"></div>
            </li>
          ))}
      </ul>
    </div>
  );
}
