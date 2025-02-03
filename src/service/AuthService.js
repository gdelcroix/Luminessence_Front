import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:3001/api'; // URL de l'API

function login(user) {
  return axios.post(`${API_URL}/login/connexion`, user);
}

function setAxiosToken() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
}

function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('décodage impossible ', token, error);
    return null;
  }
}

function getUser() {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token && isValid()) {
    const { nom, prenom, ID, role, mail, telephone } = decodeToken(token);
    return { nom, prenom, ID, role, mail, telephone };
  }
  return null;
}

function logout(setIsAuthenticated) {
  localStorage.removeItem('token');
  delete axios.defaults.headers['Authorization'];
  if (setIsAuthenticated) {
    setIsAuthenticated(false);
  }
}

function isValid() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('pas de token');
    return false;
  }
  const checkup = decodeToken(token);
  const maintenant = Math.floor(Date.now() / 1000);
  if (checkup.exp < maintenant) {
    console.error('token expiré');
    logout();
    return false;
  }
  return true;
}

export default { isValid, getUser, login, logout, setAxiosToken };
