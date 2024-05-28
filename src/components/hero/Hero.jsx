import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="hero min-h-screen bg-base-100 ">
            <div className="hero-content flex-col lg:flex-row-reverse animate-fade-in">
                <img 
                    src="/hero-img.svg" 
                    className="max-w-lg bg-base-100"
                    alt="Cinema"
                />
                <div className="lg:mr-8">
                    <h1 className="text-5xl font-bold ">Welcome to  <span className='text-primary'>FilmGooo... !</span></h1>
                    <p className="text-xl py-6">Experience the magic of cinema with the latest box office hits. Book your tickets now and enjoy an unforgettable movie experience!</p>
                  <Link to={'/movies'}>  <button className="btn bg-primary border-none text-primary-content hover:bg-primary-hover" >BOOK NOW</button> </Link>
                </div>
            </div>
        </div>
    );
}
