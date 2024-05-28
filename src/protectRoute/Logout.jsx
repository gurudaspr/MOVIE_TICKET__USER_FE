import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  useEffect } from 'react';
import { baseUrl } from '../baseUrl/baseUrl';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        Cookies.remove('token');
        navigate('/signin', { replace: true });
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;