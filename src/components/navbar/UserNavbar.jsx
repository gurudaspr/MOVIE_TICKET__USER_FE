import React from 'react';
import { Link, useNavigate,} from 'react-router-dom';
import ToggleTheme from '../../ui/ToggleTheme';
import axios from 'axios';
import { baseUrl } from '../../baseUrl/baseUrl';
import toast from 'react-hot-toast';
import { set } from 'react-hook-form';

const UserNavbar = () => {
  const navigate = useNavigate();
  const links = [
    { name: 'HOME', path: '/home' },
    { name: 'MOVIES', path: '/userHome' },
    { name: 'MY BOOKINGS', path: '/bookings'}
  ];
  const handleLogout = async () => {
    try {
     await axios.post(`${baseUrl}/api/user/logout`,'',{  withCredentials: true });
      toast.success('Logged out successfully');

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <div className="navbar bg-base-200 h-10 fixed z-50">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
            {links.map(link => (
              <li className='text-3xl' key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/home" className="btn btn-ghost text-xl"><img className="mask mask-squircle w-11 hidden sm:block " src='/filmgo.png' alt=""/>FilmGo</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map(link => (
            <li key={link.name} className='text-lg'>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ToggleTheme />
        {/* <Link  to='/logout' className="btn bg-primary text-primary-content border-none hover:bg-primary-hover ">LOGOUT</Link> */}
        <button onClick={handleLogout} className="btn bg-primary text-primary-content border-none hover:bg-primary-hover ">LOGOUT </button>
      </div>

    </div>
  );
};

export default UserNavbar;
