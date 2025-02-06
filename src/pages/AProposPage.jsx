import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Image, Stack, Button, Carousel, Card } from 'react-bootstrap';
import context from '../context/Context';

function AProposPage() {
  const { currentSection, setCurrentSection } = useContext(context);

  useEffect(() => {
    setCurrentSection(currentSection); // TODO a configurer : les redirections
  }, []);

  // className='mt-1 p-0'
  return (
    <Container fluid>
      <Row className='d-flex flex-start p-0 mx-5 hero'>
        <Col md={{ span: 3 }} className='p-0 img'>
          <Image className='roundedleft' src='massage0.avif' alt='masseuse en action' />
        </Col>
        <Col md={6} className='d-flex flex-column mx-auto justify-content-center align-items-center'>
          <Stack gap={2} className='w-100 mt-2 mx-auto'>
            <div className='bulle p-3 m-1'>
              <h1>
                <p>A Propos</p>
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
          <Image className='roundedright' src='décoration.avif' alt='décor zen' />
        </Col>
      </Row>
      <Row className='d-flex flex-row gap-3 mx-5 p-3 justify-content-center bulle'>
        BlaBla à propos de :<br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Row>
      <Row className='d-flex gap-3 mx-5'>
        
      </Row>
    </Container>
  );
}

export default AProposPage;
