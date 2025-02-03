import { createContext } from 'react';

export default createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
  user: null,
  setUser: (value) => {},
  currentSection: null,
  setCurrentSection: (value) => {},
});