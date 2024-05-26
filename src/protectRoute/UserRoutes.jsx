import axios from '../config/axiosConfig'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "/api/user/check-user"
        );

        const data = res.data;
        console.log(data);
        
        if (data.success === false) {
          navigate("/signup", { replace: true });
        }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/signup", { replace: true });
      }
    };
    checkUser();
  }, [navigate]);

  return children;
};

export default UserRoutes;