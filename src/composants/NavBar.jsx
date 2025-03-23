import { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Nav, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import AuthService from '../service/AuthService';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { modulesListe } from '../service/ApiCalls';
import PropTypes from 'prop-types';

const NavBtn = ({ name, value, hidden, currentSection, handleSelect }) => (
  <ToggleButton
    className='navbar-btn align-content-center'
    type='radio'
    id={value}
    value={value}
    checked={currentSection === value}
    onChange={handleSelect}
    hidden={hidden}
  >
    {name}
  </ToggleButton>
);
// l'usage des validations de props : documenter, faciliter la maintenance, la compréhension, éviter les bugs (erreur de type de valeur) faciliter les tests.
NavBtn.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  currentSection: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
// defaultProps permet d'éviter une valeur undefined par défaut, de simplifier le contrôle, et l'éventuel réutilisation de la fonction.
NavBtn.defaultProps = {
  hidden: false,
};


function MyNavbar({ scrollToSection }) {
  const { isAuthenticated, setIsAuthenticated, user, currentSection, setCurrentSection } = useContext(Context);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [updatedRadios, setUpdatedRadios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      console.log('il y a user !');
      if (user.role && user.role.includes('admin')) {
        console.log('actions spécifiques au compte admin');
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
  useEffect(() => {
    const modules = async () => {
      let modulesData = JSON.parse(localStorage.getItem('modulesData'));

      if (!modulesData) {
        modulesData = await modulesListe();
        localStorage.setItem('modulesData', JSON.stringify(modulesData));
      }

      const updateRadios = radios.map((radio) => {
        const module = modulesData.find((m) => m.nomSection === radio.value);
        return {
          ...radio,
          hidden: module ? !module.active : false,
        };
      });
      setUpdatedRadios(updateRadios);
    };
    modules();
  });

  return (
    <>
      <Navbar className='HeaderContainer'>
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href='/' className='logo px-4 d-flex align-items-center'>
            <img src='/luminessence.avif' alt='Luminessence du savoir' style={{ height: '60px' }} />
          </Navbar.Brand>
          <Nav className='ms-auto d-flex align-items-center'>
            <ButtonGroup className='align-content-center'>
              {updatedRadios.map((radio, idx) => (
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
                  S&apos;Inscrire
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

MyNavbar.propTypes = {
  scrollToSection: PropTypes.string
}

export default MyNavbar;
