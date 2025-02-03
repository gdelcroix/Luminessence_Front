import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Stack, Button, Carousel, Card } from 'react-bootstrap';

function BoutiquePage() {
  
  return (
    <Container fluid className='mt-1 p-0'>
      <Row className='p-0 d-flex flex-row flex-start hero'>
        <Col md={3} className='p-0 img'>
          <Image className='roundedleft' src='massage0.png' alt='masseuse en action' />
        </Col>
        <Col md={6} className='d-flex flex-column mx-auto justify-content-center align-items-center'>
          <Stack gap={2} className='w-100 mt-2 mx-auto'>
            <div className='bulle p-3 m-1'>
              <h1>
                <p>Boutique</p>
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
          <Image className='roundedright' src='décoration_converted.avif' alt='décor zen' />
        </Col>
      </Row>
      <Row className='d-flex flex-row gap-3 p-2 justify-content-center bulle'>
        description massages ayurvédiques :<br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Row>
      <Row className='d-flex flex-row gap-3 p-2'>
        <Col md={{ span: 8 }}>
          <Carousel indicators={false}>
            <Carousel.Item>
              <img className='d-block w-100' src='massage0.png' alt='First slide' />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src='self hug.png' alt='Second slide' />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src='décoration_converted.avif' alt='Thrird slide' />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col >
          <Row className='d-flex flex-row p-4 m-1 gap-3'>
            Some quick example text to build on the card title and make up the bulk of the card's content.
            <Button variant='primary'>Go somewhere</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BoutiquePage;
