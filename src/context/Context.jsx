import { createContext } from 'react';

const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  currentSection: null,
  setCurrentSection: () => {},
  panier: [],
  setPanier: () => {},
});

export default Context;
