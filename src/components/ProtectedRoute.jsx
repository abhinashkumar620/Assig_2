import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    toast.error("Please login first!");
    return <Navigate to="/" />;
  }

  return (
    <>
      {children}
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default ProtectedRoute;
