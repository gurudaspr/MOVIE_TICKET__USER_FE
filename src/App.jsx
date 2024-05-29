
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/Routes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const router = createBrowserRouter(routes);
  

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" duration={500} />
    </>
  );
}
