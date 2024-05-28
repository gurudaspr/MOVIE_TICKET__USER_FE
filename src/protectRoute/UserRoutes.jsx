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
        console.log('res', res);

        const data = res.data;
        console.log('datauser', data);
        
        if (data.success === false) {
          navigate("/signin", { replace: true });
        }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/signin", { replace: true });
      }
    };
    checkUser();
  }, );
  
  return children;
};

export default UserRoutes;