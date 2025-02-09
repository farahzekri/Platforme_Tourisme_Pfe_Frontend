import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../ApiSlice/authSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthorized = useSelector(selectIsAuthorized); 
  console.log('mche wala le ',isAuthorized)
  let location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
