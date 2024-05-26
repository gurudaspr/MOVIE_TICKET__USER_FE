import React, { useEffect } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EasyMethod = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);

    if (token === undefined) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return children;
};

export default EasyMethod