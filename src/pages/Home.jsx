import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown,faSquareCaretUp,faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import NavBar from '../composants/NavBar';
import Footer from '../composants/Footer';
import { useIsVisible } from '../composants/useIsVisible';

import context from '../context/Context';

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
  const { currentSection, setCurrentSection } = useContext(context);

  const refAccueil = useRef(null);
  const refMassages = useRef(null);
  const refFormation = useRef(null);
  const refAteliers = useRef(null);
  const refBoutique = useRef(null);
  const refAPropos = useRef(null);
  const refContact = useRef(null);

  useIsVisible(refAccueil, setCurrentSection, isObserverActive);
  useIsVisible(refMassages, setCurrentSection, isObserverActive);
  useIsVisible(refFormation, setCurrentSection, isObserverActive);
  useIsVisible(refAteliers, setCurrentSection, isObserverActive);
  useIsVisible(refBoutique, setCurrentSection, isObserverActive);
  useIsVisible(refAPropos, setCurrentSection, isObserverActive);
  useIsVisible(refContact, setCurrentSection, isObserverActive);

  useEffect(() => {
    if (currentSection && refAccueil.current) {
      scrollToSection(currentSection);
    }
  }, [currentSection, setCurrentSection]);

  const scrollToSection = (valeur) => {
    setIsObserverActive(false); // Désactive l'observateur

    const scrollToElement = (ref) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Vérifie si le bouton ScrollToTop doit être visible (le haut de la page est + élevé le top du 2eme écran)
        if (ref.current.offsetTop > (refMassages.current.offsetTop-10)) {
          setShowScrollBtn(true);
        } else {
          setShowScrollBtn(false);
        }

        // Réactive l'observateur après le défilement, par un compteur de 500ms
        setTimeout(() => {
          setIsObserverActive(true);
        }, 500);
      }
    };
    // switch pour déclencher le scroll vers la section attendue
    switch (valeur) {
      case 'accueil':
        scrollToElement(refAccueil);
        console.log('switch Accueil');
        break;
      case 'massagesAyurvediques':
        scrollToElement(refMassages);
        console.log('switch MassagesAyurvediques');
        break;
      case 'formationEstimeDeSoi':
        scrollToElement(refFormation);
        console.log('switch formation');
        break;
      case 'ateliersBienEtre':
        scrollToElement(refAteliers);
        console.log('switch ateliersBienEtre');
        break;
      case 'boutique':
        scrollToElement(refBoutique);
        console.log('switch boutique');
        break;
      case 'aPropos':
        scrollToElement(refAPropos);
        console.log('switch apropos');
        break;
      case 'contact':
        scrollToElement(refContact);
        console.log('switch contact');
        break;
      default:
        console.log('case default: accueil');
        scrollToElement(refAccueil);
    }
  };

  const changeNavbar = () => {
    setNbVisible(!nbVisible);
  };

  const scrollTop = () => {
    setIsObserverActive(false); // Désactiver l'observateur
    refAccueil.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                <FontAwesomeIcon icon={faSquareCaretUp}/>
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
        </div>{' '}
        <div
          className='content-container'
          style={{ marginTop: nbVisible ? '85px' : '0px', overflow: 'auto', height: '100vh' }}
        >
          <div id='accueil' ref={refAccueil} className='bloc' section='accueil'>
            <Accueil />
          </div>
          <div id='massagesAyurvediques' className='bloc' ref={refMassages} section='massagesAyurvediques'>
            <Massages />
          </div>
          <div id='formationEstimeDeSoi' className='bloc' ref={refFormation} section='formationEstimeDeSoi'>
            <Estime />
          </div>
          <div id='ateliersBienEtre' className='bloc' ref={refAteliers} section='ateliersBienEtre'>
            <BienEtre />
          </div>
          <div id='boutique' className='bloc' ref={refBoutique} section='boutique'>
            <Boutique />
          </div>
          <div id='aPropos' className='bloc' ref={refAPropos} section='aPropos'>
            <APropos />
          </div>
          <div id='contact' className='bloc' ref={refContact} section='contact'>
            <Contact />
          </div>
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
