import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AuthService from './AuthService';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user, setUser } = useContext(AuthContext);
  console.log('rp', isAuthenticated, user);
  if (!user) {
    if (isAuthenticated) {
      setUser = [AuthService.getUser()];
    }
    if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
    // Redirige vers la page de connexion ou non autorisé
    return <Navigate to='/' replace />;
  }}
  return element;
};

export default PrivateRoute;
