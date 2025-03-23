import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faSquareCaretUp, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import NavBar from '../composants/NavBar';
import Footer from '../composants/Footer';
import { useIsVisible } from '../composants/useIsVisible';

import Context from '../context/Context';

import Accueil from './AccueilPage';
import Massages from './MassagePage';
import Estime from './EstimePage';
import BienEtre from './BienEtrePage';
import Contact from './ContactPage';
import APropos from './AProposPage';
import Boutique from './BoutiquePage';

function Home() {
  const [nbVisible, setNbVisible] = useState(true);
  const [isObserverActive, setIsObserverActive] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { currentSection, setCurrentSection } = useContext(Context);
  const [sectionActive, setSectionActive] = useState([]);
  const [prevModulesData, setPrevModulesData] = useState(null);

  const sections = [
    { id: 'accueil', component: Accueil },
    { id: 'massagesAyurvediques', component: Massages },
    { id: 'formationEstimeDeSoi', component: Estime },
    { id: 'ateliersBienEtre', component: BienEtre },
    { id: 'boutique', component: Boutique },
    { id: 'aPropos', component: APropos },
    { id: 'contact', component: Contact },
  ];

  const sectionRefs = useRef(
    sections.reduce((acc, section) => {
      acc[section.id] = React.createRef();
      return acc;
    }, {})
  );

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      return useIsVisible(sectionRefs.current[id], setCurrentSection, isObserverActive);
    });
    return () => {
      observers.forEach((observer) => observer && observer.disconnect && observer.disconnect());
    };
  }, [isObserverActive, setCurrentSection]);

  useEffect(() => {
    if (currentSection && sectionRefs.current[currentSection]) {
      scrollToSection(currentSection);
    }
  }, [currentSection, setCurrentSection]);

  useEffect(() => {
    const extract = JSON.parse(localStorage.getItem('modulesData'));
    if (JSON.stringify(extract) !== JSON.stringify(prevModulesData)) {
      setSectionActive(extract);
      setPrevModulesData(extract);
    }
  }, [prevModulesData]);

  console.log('sections :', sectionActive);

  const scrollToSection = (valeur) => {
    setIsObserverActive(false); // Désactive l'observateur
    const ref = sectionRefs.current[valeur];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Vérifie si le bouton ScrollToTop doit être visible (le haut de la page est + élevé le top du 2eme écran)
      setShowScrollBtn(ref.current.offsetTop > sectionRefs.current['massagesAyurvediques'].current.offsetTop - 10);
      // Réactive l'observateur après le défilement, par un compteur de 500ms
      setTimeout(() => setIsObserverActive(true), 500);
    }
  };

  const changeNavbar = () => {
    setNbVisible(!nbVisible);
  };

  const scrollTop = () => {
    setIsObserverActive(false); // Désactiver l'observateur
    sectionRefs.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      setIsObserverActive(true);
    }, 500);
  };

  return (
    <>
      <Container fluid className='d-flex flex-column-reverse vh-100 p-0'>
        <div className='fixed-top p-0 bg-light flex-fill'>
          {nbVisible ? (
            <>
              <NavBar scrollToSection={scrollToSection} />
              <button
                className='btn btn-sm btn-outline-secondary position-absolute end-0 bottom-0 m-2'
                onClick={changeNavbar}
              >
                <FontAwesomeIcon icon={faSquareCaretUp} />
              </button>
            </>
          ) : (
            <button
              className='btn btn-sm btn-outline-secondary position-absolute end-0 top-0 m-2'
              onClick={changeNavbar}
            >
              <FontAwesomeIcon icon={faSquareCaretDown} />
            </button>
          )}
        </div>
        <div
          className='content-container'
          style={{ marginTop: nbVisible ? '85px' : '0px', overflow: 'auto', height: '100vh' }}
        >
          {sections.map(({ id, component: Component }) => (
            <div
              key={id}
              id={id}
              ref={sectionRefs.current[id]}
              className='bloc'
              hidden={!sectionActive.some((section) => section.nomSection === id && section.active)}
            >
              <Component />
            </div>
          ))}
          <Footer />
        </div>
        {showScrollBtn && (
          <FontAwesomeIcon icon={faAngleDoubleUp} className='top-btn-position top-btn-style' onClick={scrollTop} /> // montrer le bouton de retour en haut.
        )}
      </Container>
    </>
  );
}

export default Home;
