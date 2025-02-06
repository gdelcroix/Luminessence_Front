import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import context from '../context/Context';
import AuthService from './AuthService';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user, setUser } = useContext(context);
  console.log('RouteP'); // TODO log a supprimer
  // on vérifie le role pour les routes qui le nécessitent.
  // on vérifie qu'on a quelqu'un d'autentifié,
  if (isAuthenticated) {
    // si c'est le cas, on vérifie que user existe ou pas
    if (!user) {
      // authentifié = token présent, donc on recupere user puisqu'on a le token.
      setUser(AuthService.getUser());
    }
    //   avant de vérifier user.role si .role existe (?. opérateur de chaine facultative)
    if (allowedRoles.includes(user?.role)) {
      return element;
    }
    return <Navigate to='/' replace />; // Redirige vers la page de connexion ou non autorisé
  }
};

export default PrivateRoute;
