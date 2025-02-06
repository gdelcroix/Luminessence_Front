import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from './pages/Home';
import ComptePage from './pages/ComptePage';

import context from './context/Context';

import AuthService from './service/AuthService';
import PrivateRoute from './service/RouteProtection';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentSection, setCurrentSection] = useState('accueil');
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    console.log('app is valid 10mn interval useffect');
    const interval = setInterval(() => {
      const isValid = AuthService.isValid();
      if (!isValid) {
        AuthService.logout(setIsAuthenticated);
      }
    }, 10 * 60 * 1000); // Check every 10 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, currentSection, setCurrentSection, panier, setPanier }}>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={true} />
      <BrowserRouter>
        <Routes>
          {/* routes publiques */}
          <Route path='/' element={<Home />} />
          {/* <Route path='/accueil' element={<AccueilPage />} />
          <Route path='/massages' element={<MassagePage />} />
          <Route path='/estime' element={<EstimePage />} />
          <Route path='/boutique' element={<Boutique />} />
          <Route path='/aPropos' element={<AProposPage />} />
          <Route path='/contact' element={<ContactPage />} /> */}

          {/* routes uniquement accessibles si connecté */}
          <Route
            path='/compte'
            element={<PrivateRoute element={<ComptePage />} allowedRoles={['Client', 'admin']} />}
          />

          {/* routes uniquement accessibles si admin */}
          <Route path='/modifAdmin' element={<PrivateRoute element={<ComptePage />} allowedRoles={['admin']} />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
