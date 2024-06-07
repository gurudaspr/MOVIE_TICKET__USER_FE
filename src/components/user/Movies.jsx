import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import axios from 'axios';

const Movie = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/movies`, { withCredentials: true });
        const currentDate = new Date();
        
        const nowPlaying = response.data.filter(movie => new Date(movie.releaseDate) <= currentDate);
        const upcoming = response.data.filter(movie => new Date(movie.releaseDate) > currentDate);

        setNowPlayingMovies(nowPlaying);
        setUpcomingMovies(upcoming);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} className="card w-72 bg-base-200 flex-shrink-0">
        <figure className="skeleton w-full h-72"></figure>
        <div className="card-body p-4 flex flex-col justify-between">
          <div className="skeleton w-3/4 h-6 mb-2"></div>
          <div className="flex justify-between">
            <div className="skeleton w-1/4 h-6"></div>
            <div className="skeleton w-1/4 h-6"></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className='container min-h-screen h-full pt-20 mx-auto'>
      <h1 className="text-4xl font-bold mb-6 text-center">Now Playing</h1>
      <div className="flex justify-center">
        <div className="flex gap-4 overflow-x-auto flex-nowrap p-4 animate-fade-in sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {loading ? renderSkeletons(4) : nowPlayingMovies.map((movie, index) => (
            <Link key={index} to={`/movie/${movie._id}`} className="card w-72 bg-base-200 flex-shrink-0">
              <figure>
                <img src={movie.image} alt={movie.title} className="w-full h-72 object-cover" />
              </figure>
              <div className="card-body p-4 flex flex-col justify-between">
                <h2 className="card-title mb-2">{movie.title}</h2>
                <div className="flex justify-between">
                  <p className="text-left">{movie.language}</p>
                  <p className="text-right">{movie.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-center mt-10">Upcoming</h1>
      <div className="flex justify-center">
        <div className="flex gap-4 overflow-x-auto flex-nowrap p-4 animate-fade-in sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {loading ? renderSkeletons(4) : upcomingMovies.map((movie, index) => (
            <Link key={index} to={`/movie/${movie._id}`} className="card w-72 bg-base-200 flex-shrink-0">
              <figure>
                <img src={movie.image} alt={movie.title} className="w-full h-72 object-cover" />
              </figure>
              <div className="card-body p-4 flex flex-col justify-between">
                <h2 className="card-title mb-2">{movie.title}</h2>
                <div className="flex justify-between">
                  <p className="text-left">{movie.language}</p>
                  <p className="text-right">{movie.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
