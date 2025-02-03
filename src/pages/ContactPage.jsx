import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Stack, Button, Carousel, Card, Form } from 'react-bootstrap';

function Contact() {
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email && !telephone) {
      setError('Merci de saisir au moins un contact valide');
  };
  }
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
                <p>Nous Contacter</p>
              </h1>
            </div>
            <div className='d-flex bulle p-4 m-1 flex-row align-content-start'>
              <Col md={12}>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Control type='text' placeholder='Votre nom' />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                        <Form.Control type='text' placeholder='Votre prénom' />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                      <Form.Control type='email' placeholder='Votre email' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                      <Form.Control type='text' placeholder='Votre numéro de téléphone' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                      <Form.Label>Message</Form.Label>
                      <Form.Control as='textarea' rows={3} placeholder='Votre message' />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Button variant='primary' type='submit'>
                      Envoyer
                    </Button>
                  </Row>
                </Form>
              </Col>
            </div>
          </Stack>
        </Col>
        <Col md={3} className='p-0 img'>
          <Image className='roundedright' src='décoration_converted.avif' alt='décor zen' />
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
