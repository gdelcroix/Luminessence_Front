import { useContext, useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import Context from '../context/Context';

function Estime({ scrollToSection }) {
  const { currentSection, setCurrentSection } = useContext(Context);

  useEffect(() => {
    setCurrentSection(currentSection); // TODO a configurer : les redirections
  });

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
                  <p>Formations</p>Estime de Soi
                </h1>
              </div>
              <div className='d-flex bulle p-4 m-1 flex-row align-content-start'>
                <Col md={8}>Accédez directement au planning des prochaines formations</Col>
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
        <Row className='d-flex flex-row gap-3 mx-5 justify-content-between'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Renforcer la Confiance en Soi au Quotidien</Card.Title>
              <Card.Text>Découvrez des stratégies pratiques pour améliorer votre estime de soi chaque jour.</Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('massagesAyurvediques')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='top' src='image-6.avif' />
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>L&apos;Art de la Communication Assertive</Card.Title>
              <Card.Text>
                Maîtrisez des techniques pour exprimer vos idées et besoins avec assurance et respect.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('formationEstimeDeSoi')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='bottom' src='image-8.avif' />
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Développer une Image de Soi Positive</Card.Title>
              <Card.Text>
                Apprenez à renforcer votre perception de vous-même et à cultiver une image positive.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('ateliersBienEtre')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='bottom' src='image-7.avif' />
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Gérer le Stress et l&apos;Anxiété pour une Meilleure Estime de Soi</Card.Title>
              <Card.Text>
                Apprenez des techniques pratiques pour réduire le stress et l&apos;anxiété, et boostez votre confiance en
                vous.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('boutique')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='bottom' src='image-9.avif' />
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default Estime;
