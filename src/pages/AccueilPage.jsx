import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import Context from '../context/Context';
import { modulesListe } from '../service/ApiCalls';

function Accueil() {
  const { currentSection, setCurrentSection } = useContext(Context);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const modulesData = localStorage.getItem('modulesData');
    if (modulesData) {
      setSections(JSON.parse(modulesData));
    } else {
      modulesListe().then((data) => {
        setSections(data);
        localStorage.setItem('modulesData', JSON.stringify(data));
      });
    }
  }, []);

  console.log('accueil modules', sections);
  useEffect(() => {
    setCurrentSection(currentSection);
  });

  // className='mt-1 ms-0 p-0 mx-5'
  return (
    <>
      <Container fluid>
        <Row className='p-0 mx-5 d-flex flex-row flex-start hero'>
          <Col md={3} className='p-0 img'>
            <Image className='roundedLeft' src='massage0.avif' alt='masseuse en action' />
          </Col>
          <Col md={6} className='d-flex flex-column mx-auto justify-content-center align-items-center'>
            <Stack gap={2} className='w-100 mt-2 mx-auto'>
              <div className='bulle p-3 m-1'>
                <h1 className='slide-down'>
                  <p>Prenez soin de vous :</p> Luminessence du savoir
                </h1>
              </div>
              <div className='d-flex bulle p-4 m-1 flex-row align-content-start'>
                <Col md={8}>
                  Découvrez nos massages ayurvédiques, formations en estime de soi et ateliers bien-être pour une vie
                  harmonieuse
                </Col>
                <Col>
                  <Button>Réserver</Button>
                </Col>
              </div>
            </Stack>
          </Col>
          <Col md={3} className='p-0 img'>
            <Image className='roundedRight' src='décoration.avif' alt='décor zen' />
          </Col>
        </Row>
        <Row className='d-flex flex-row gap-3 mx-5 justify-content-around'>
          {sections.some((section) => section.nomSection === 'massagesAyurvediques' && section.active == 1) ? (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Massages Ayurvédiques</Card.Title>
                  <Card.Text>
                    Découvrez la sérénité des massages ayurvédiques, une tradition ancestrale pour équilibrer corps et
                    esprit.
                  </Card.Text>
                  <Button variant='primary' onClick={() => setCurrentSection('massagesAyurvediques')}>
                    En savoir plus
                  </Button>
                </Card.Body>
                <Card.Img variant='top' src='image-6.avif' />
              </Card>
            </>
          ) : (
            <></>
          )}
          {sections.some((section) => section.nomSection === 'formationEstimeDeSoi' && section.active == 1) ? (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Formations Estime de Soi</Card.Title>
                  <Card.Text>
                    Reprenez confiance en vous avec nos formations, conçues pour renforcer l&apos;estime de soi et
                    l&apos;épanouissement personnel.
                  </Card.Text>
                  <Button variant='primary' onClick={() => setCurrentSection('formationEstimeDeSoi')}>
                    En savoir plus
                  </Button>
                </Card.Body>
                <Card.Img variant='bottom' src='image-8.avif' />
              </Card>
            </>
          ) : (
            <></>
          )}
          {sections.some((section) => section.nomSection === 'ateliersBienEtre' && section.active == 1) ? (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Ateliers Bien-être</Card.Title>
                  <Card.Text>
                    Participez à nos ateliers bien-être et explorez des techniques holistiques pour vivre une vie
                    équilibrée et harmonieuse.
                  </Card.Text>
                  <Button variant='primary' onClick={() => setCurrentSection('ateliersBienEtre')}>
                    En savoir plus
                  </Button>
                </Card.Body>
                <Card.Img variant='bottom' src='image-7.avif' />
              </Card>
            </>
          ) : (
            <></>
          )}
          {sections.some((section) => section.nomSection === 'boutique' && section.active == 1) ? (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Boutique</Card.Title>
                  <Card.Text>
                    Découvrez notre boutique en ligne de produits bien-être et accessoires, dédiée à votre santé et à
                    votre relaxation.
                  </Card.Text>
                  <Button variant='primary' onClick={() => setCurrentSection('boutique')}>
                    En savoir plus
                  </Button>
                </Card.Body>
                <Card.Img variant='bottom' src='image-9.avif' />
              </Card>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Accueil;
