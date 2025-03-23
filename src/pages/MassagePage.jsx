import { useContext, useEffect } from 'react';
import { Container, Row, Col, Image, Stack, Button, Carousel } from 'react-bootstrap';
import Context from '../context/Context';

function MassagePage() {
  const { currentSection, setCurrentSection } = useContext(Context);

  useEffect(() => {
    setCurrentSection(currentSection); // TODO a configurer : les redirections
  });
  // className='mt-1 p-0'
  return (
    <Container fluid>
      <Row className='d-flex flex-start p-0 mx-5 hero'>
        <Col md={3} className='p-0 img'>
          <Image className='roundedLeft' src='massage0.avif' alt='masseuse en action' />
        </Col>
        <Col md={6} className='d-flex flex-column mx-auto justify-content-center align-items-center'>
          <Stack gap={2} className='w-100 mt-2 mx-auto'>
            <div className='bulle p-3 m-1'>
              <h1>
                <p>Massages Ayurvédiques</p>
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
      <Row className='d-flex flex-row gap-3 mx-5 p-3 justify-content-center bulle'>
        description massages ayurvédiques :<br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Row>
      <Row className='d-flex gap-3 mx-5'>
        <Col md={8} sm={8} xs={8} className='p-0'>
          <Carousel controls={false}>
            <Carousel.Item>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <img className='d-block w-100' src='massage0.avif' alt='First slide' />
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <span>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </span>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <img className='d-block w-100' src='self-hug.avif' alt='Second slide' />
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <span>
                    <h3>Second slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </span>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <img className='d-block w-100' src='décoration.avif' alt='Third slide' />
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <span>
                    <h3>Third slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </span>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <Row className='d-flex flex-row p-4 m-1 gap-3'>
            Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
            <Button variant='primary'>Go somewhere</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MassagePage;
