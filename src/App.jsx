import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from './pages/Home';
import ComptePage from './pages/ComptePage';

import Context from './context/Context';

import AuthService from './service/AuthService';
import PrivateRoute from './service/RouteProtection';
import { modulesListe } from './service/ApiCalls';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentSection, setCurrentSection] = useState('accueil');
  const [panier, setPanier] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    console.log('app is valid 10mn interval useEffect');
    const interval = setInterval(() => {
      const isValid = AuthService.isValid();
      if (!isValid) {
        AuthService.logout(setIsAuthenticated);
      }
    }, 10 * 60 * 1000); // Check every 10 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //charger les sections depuis le localStorage ou établir la liste depuis la bdd si pas existant
    let modulesData = async () => {
      try {
        if (!modulesData) {
          modulesData = await modulesListe();
          localStorage.setItem('modulesData', JSON.stringify(modulesData));
        } else {
          modulesData = JSON.parse(localStorage.getItem('modulesData'));
        }
      } catch (error) {
        throw new Error('erreur de récupération des modules',error);
      }
    };
    setModules(modulesData);
  }, [modules]);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        currentSection,
        setCurrentSection,
        panier,
        setPanier,
      }}
    >
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
    </Context.Provider>
  );
}

export default App;
