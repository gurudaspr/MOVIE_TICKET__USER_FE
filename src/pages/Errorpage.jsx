import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  
  
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-base-100 pt-20 mx-auto">
    <h1 className="text-6xl font-bold mb-6">404</h1>
    <h2 className="text-xl md:text-3xl font-semibold mb-4">Uh oh! That page doesn't exist 😕</h2>
    <p className="text-lg mb-6">
      Looks like we couldn't find what you were looking for. But don't worry, you can:
    </p>
    <button onClick={handleGoBack} className="btn btn-primary">Go Back</button>
  </div>
  );
};

export default ErrorPage;