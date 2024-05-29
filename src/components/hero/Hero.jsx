import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="hero h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D )'}}>
  <div className="hero-overlay  w-full bg-base-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 "></div>
  <div className="hero-content text-center text-white">
    <div className="max-w-full">
      <h1 className="mb-5 text-3xl md:text-5xl lg:text-8xl   text-primary-content font-bold">Welcome <span className='text-primary'>Filmgooo...!</span></h1>

      <p className="mb-5 md:text-2xl text-primary-content"> Book your tickets now and enjoy an unforgettable movie experience!</p>
      <Link to={'/userHome'}>  <button className="btn bg-primary  border-none text-primary-content hover:bg-primary-hover" >BOOK NOW</button> </Link>
    </div>
  </div>
</div>
    );
}
