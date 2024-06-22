import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../baseUrl/baseUrl';

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/user/check-user`, { withCredentials: true ,crossDomain: true}
        );
        const data = res.data;
        console.log('datauser', data);
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/login", { replace: true });
      } finally {
        setAuthChecked(true);
      }
    };
    checkUser();
  }, [navigate]);

  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? children : null;
};

export default UserRoutes;
