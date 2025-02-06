import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Nav, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import context from '../context/Context';
import AuthService from '../service/AuthService';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const NavBtn = ({ name, value, currentSection, handleSelect }) => (
  <ToggleButton
    className='navbar-btn align-content-center'
    type='radio'
    id={value}
    value={value}
    checked={currentSection === value}
    onChange={handleSelect}
  >
    {name}
  </ToggleButton>
);

const AuthBtn = ({ isAuthenticated, navigate, handleLogout, setShowLoginModal, setShowRegisterModal }) => (
  <>
    {isAuthenticated ? (
      <div className='d-flex mx-3 px-4 align-content-end no-wrap'>
        <Button onClick={() => navigate('/compte')} className='login-btn px-3 text-align-center align-content-center'>
          Mon Compte
        </Button>
        <Button onClick={handleLogout} className='deco-btn px-3 text-align-center align-content-center'>
          Quitter
        </Button>
      </div>
    ) : (
      <>
        <div className='d-flex mx-3 px-4 align-content-end no-wrap'>
          <Button className='login-btn text-align-center align-content-center' onClick={() => setShowLoginModal(true)}>
            Se connecter
          </Button>
          <Button
            className='register-btn text-align-center align-content-center'
            onClick={() => setShowRegisterModal(true)}
          >
            S'Inscrire
          </Button>
        </div>
      </>
    )}
  </>
);
function MyNavbar({ scrollToSection }) {
  const { isAuthenticated, setIsAuthenticated, user, currentSection, setCurrentSection } = useContext(context);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      console.log('il y a user !');
      if (user.role && user.role.includes('admin')) {
        console.log('actions specifiques au compte admin');
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      AuthService.setAxiosToken();
      const isValid = AuthService.isValid();
      if (isValid) {
        setIsAuthenticated(true);
        const user = AuthService.getUser();
        setCurrentSection(user.role);
      }
    }
  }, [setIsAuthenticated, setCurrentSection]);

  const handleLogout = () => {
    AuthService.logout(setIsAuthenticated);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const target = e.currentTarget.value;
    scrollToSection(target);
  };

  const radios = [
    { name: 'Accueil', value: 'accueil' },
    { name: 'Massages Ayurvédiques', value: 'massagesAyurvediques' },
    { name: 'Formation Estime de Soi', value: 'formationEstimeDeSoi' },
    { name: 'Ateliers Bien-Être', value: 'ateliersBienEtre' },
    { name: 'Boutique', value: 'boutique' },
    { name: 'A Propos', value: 'aPropos' },
    { name: 'Contact', value: 'contact' },
  ];

  return (
    <>
      <Navbar className='HeaderContainer'>
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href='/' className='logo px-4 d-flex align-items-center'>
            <img src='/luminessence.avif' alt='Luminessence du savoir' style={{ height: '60px' }} />
          </Navbar.Brand>
          <Nav className='ms-auto d-flex align-items-center'>
            <ButtonGroup className='align-content-center'>
              {radios.map((radio, idx) => (
                <NavBtn key={idx} {...radio} currentSection={currentSection} handleSelect={handleSelect} />
              ))}
            </ButtonGroup>
          </Nav>
          {isAuthenticated ? (
            <>
              <div className='d-flex mx-3 px-4 align-content-end no-wrap'>
                <Button
                  onClick={() => navigate('/compte')}
                  className='login-btn px-3 text-align-center align-content-center'
                >
                  Mon Compte
                </Button>
                <Button onClick={handleLogout} className='deco-btn px-3 text-align-center align-content-center'>
                  Quitter
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className='d-flex mx-3 px-4 align-content-end no-wrap'>
                <Button
                  className='login-btn text-align-center align-content-center'
                  onClick={() => setShowLoginModal(true)}
                >
                  Se connecter
                </Button>
                <Button
                  className='register-btn text-align-center align-content-center'
                  onClick={() => setShowRegisterModal(true)}
                >
                  S'Inscrire
                </Button>
              </div>
            </>
          )}
          <LoginModal
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            setShowLoginModal={setShowLoginModal}
          />
          <RegisterModal
            show={showRegisterModal}
            onHide={() => setShowRegisterModal(false)}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
