import React, { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../composants/NavBar';
import Footer from '../composants/Footer';
import { Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import { FaRegCaretSquareDown, FaRegCaretSquareUp, FaAngleDoubleUp } from 'react-icons/fa';
import { useIsVisible } from '../composants/useIsVisible'; // Importez le hook personnalisé

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

  const refAccueil = useRef(null);
  const refMassages = useRef(null);
  const refFormation = useRef(null);
  const refAteliers = useRef(null);
  const refBoutique = useRef(null);
  const refAPropos = useRef(null);
  const refContact = useRef(null);

  const { currentSection, setCurrentSection } = useContext(AuthContext);

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
    setIsObserverActive(false); // Désactiver l'observateur

    const scrollToElement = (ref) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Vérifier si le bouton ScrollToTop doit être visible
        if (ref.current.offsetTop > 300) {
          setShowScrollBtn(true);
        } else {
          setShowScrollBtn(false);
        }

        // Réactiver l'observateur après le défilement
        setTimeout(() => {
          setIsObserverActive(true);
        }, 500); // Ajustez le délai si nécessaire
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
                <FaRegCaretSquareUp />
              </button>
            </>
          ) : (
            <button
              className='btn btn-sm btn-outline-secondary position-absolute end-0 top-0 m-2'
              onClick={changeNavbar}
            >
              <FaRegCaretSquareDown />
            </button>
          )}
        </div>{' '}
        <div
          className='content-container'
          style={{ marginTop: nbVisible ? '85px' : '0px', overflow: 'auto', height: '100vh' }}
        >
          <div id='accueil' ref={refAccueil} section='accueil'>
            <Accueil />
          </div>
          <div id='massagesAyurvediques' className='bloc1 mx-5' ref={refMassages} section='massagesAyurvediques'>
            <Massages />
          </div>
          <div id='formationEstimeDeSoi' className='bloc0' ref={refFormation} section='formationEstimeDeSoi'>
            <Estime />
          </div>
          <div id='ateliersBienEtre' className='bloc1' ref={refAteliers} section='ateliersBienEtre'>
            <BienEtre />
          </div>
          <div id='boutique' className='bloc0' ref={refBoutique} section='boutique'>
            <Boutique />
          </div>
          <div id='aPropos' className='bloc1' ref={refAPropos} section='aPropos'>
            <APropos />
          </div>
          <div id='contact' className='bloc0' ref={refContact} section='contact'>
            <Contact />
          </div>
          <Footer />
        </div>
        {showScrollBtn && (
          <FaAngleDoubleUp className='top-btn-position top-btn-style' onClick={scrollTop} /> // montrer le bouton de retour en haut.
        )}
      </Container>
    </>
  );
}

export default Home;
