import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/Context';
import AuthService from './AuthService';
import PropTypes from 'prop-types';

// on vérifie le role pour les routes qui le nécessitent.
const PrivateRoute = ({ element, allowedRoles }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, setUser } = useContext(Context);
  // on vérifie qu'on a quelqu'un d'authentifié,
  if (isAuthenticated) {
    // si c'est le cas, on vérifie que user existe ou pas
    if (!user) {
      // authentifié = token présent, donc on récupère user puisqu'on a le token.
      setUser(AuthService.getUser());
    }
    //   on vérifie user.role uniquement si .role existe (?. opérateur de chaîne facultative)
    if (allowedRoles.includes(user?.role)) {
      return element;
    }
    navigate('/'); // Redirige vers la page de connexion ou non autorisé
  }
  navigate('/login');
};

PrivateRoute.propTypes = {
  element: PropTypes.string.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
