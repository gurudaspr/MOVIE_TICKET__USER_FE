import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import {  useEffect } from 'react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${baseUrl}/api/user/logout`,{ withCredentials: true});
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