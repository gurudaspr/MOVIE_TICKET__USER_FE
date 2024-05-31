
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import { useRecoilState } from 'recoil';
import { movieTitleState } from '../../store/movieTitleAtom';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieTitle , setMovieTitle] =  useRecoilState(movieTitleState);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/movie-details/${id}`, { withCredentials: true });
        console.log('Movie details:', response.data);
        setMovie(response.data);
        setMovieTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const yellowStars = Math.floor(movie.avgRating);
  return (
    <div className='container h-screen mx-auto pt-20'>
      <div className="grid grid-cols-12 gap-6 p-6 rounded-lg bg-base-100 animate-fade-in">
        <div className="col-span-12 lg:col-span-6 lg:text-left ">
          <img src={movie.image} alt={movie.title} className="max-w-full lg:max-w-sm mx-auto rounded-lg" />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between lg:justify-start lg:text-left">
          <div className="p-6">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg mb-2"><strong>Genre:</strong> {movie.genre}</p>
            <p className="text-lg mb-2"><strong>Language:</strong> {movie.language}</p>
            <p className="text-lg mb-2"><strong>Duration:</strong> {movie.duration} Minutes</p>
            <div className="flex items-center mb-2">
              <div className="rating  gap-1">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <input key={index} type="radio" name="avgRating" disabled className={`mask mask-heart ${index < yellowStars ? 'bg-warning' : ''} ${index < yellowStars ? 'checked' : ''}`} />
                  
                ))}
              </div>
            </div>
            <div className="text-right lg:text-left lg:pt-40">
              <Link to={`/shows/${movie._id}`}>
                <button className="btn btn-primary mt-4 lg:mt-0 self-end">BOOK TICKETS NOW</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

