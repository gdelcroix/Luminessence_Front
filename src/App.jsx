import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// import toastify
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// import page from './pages/Page';
import Home from './pages/Home';
import AccueilPage from './pages/AccueilPage';
import ComptePage from './pages/ComptePage';
import MassagePage from './pages/MassagePage';
import EstimePage from './pages/EstimePage';
import Boutique from './pages/BoutiquePage';
import AProposPage from './pages/AProposPage';
import ContactPage from './pages/ContactPage';

// import context from './context/context';
import AuthContext from './context/AuthContext';

// import service from './service/service';
import AuthService from './service/AuthService';
import PrivateRoute from './service/RouteProtection';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentSection, setCurrentSection] = useState('accueil');

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
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, currentSection, setCurrentSection }}
    >
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={true} />
      <BrowserRouter>
        <Routes>
          {/* routes publiques */}
          <Route path='/' element={<Home />} />
          <Route path='/accueil' element={<AccueilPage />} />
          <Route path='/massages' element={<MassagePage />} />
          <Route path='/estime' element={<EstimePage />} />
          <Route path='/boutique' element={<Boutique />} />
          <Route path='/aPropos' element={<AProposPage />} />
          <Route path='/contact' element={<ContactPage />} />

          {/* routes uniquement accessibles si token présent */}
          <Route
            path='/compte'
            element={<PrivateRoute element={<ComptePage />} allowedRoles={['Client', 'admin']} />}
          />
          {/* routes uniquement accessibles si admin */}
          <Route path='/modifAdmin' element={<PrivateRoute element={<ComptePage />} allowedRoles={['admin']} />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
