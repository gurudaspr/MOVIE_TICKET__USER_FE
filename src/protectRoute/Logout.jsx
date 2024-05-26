import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {  useEffect } from 'react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('/api/user/logout');
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