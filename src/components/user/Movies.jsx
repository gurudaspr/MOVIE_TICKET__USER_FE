import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import axios from 'axios';

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/movies`,{withCredentials: true});
        setMovies(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container pt-20 mx-auto'>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 animate-fade-in">
          {movies.map((movie, index) => (
            <Link key={index} to={`/movie/${movie._id}`} className="card w-72 bg-base-200 ">
              <figure>
                <img src={movie.image} alt={movie.title} className="w-full h-72 object-fit" />
              </figure>
              <div className="card-body p-4"> 
                <h2 className="card-title mb-2">{movie.title} <p className=" text-right text-base ">{movie.genre}</p></h2>
               
                <p className="">{movie.language}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
