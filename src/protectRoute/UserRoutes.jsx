import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../baseUrl/baseUrl';


const UserRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/user/check-user`,{ withCredentials: true}
        );
        const data = res.data;
        console.log('datauser', data);
        if (data.success) {
          navigate('/home', { replace: true });
        }
        
        if (data.success === false) {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/login", { replace: true });
      }
    };
    checkUser();
  },[navigate] );
  
  return children;
};

export default UserRoutes;