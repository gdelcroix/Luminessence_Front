import { useState } from 'react';
import { Container, Row, Col, Image, Stack, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { formulaireContact } from '../service/ApiCalls';

function Contact() {
  const [touched, setTouched] = useState({
    nom: false,
    prenom: false,
    email: false,
    telephone: false,
    message: false,
  });
  const [formulaire, setFormulaire] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    honeypot: '',
  });

  const validateEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  const validateTel = (input) => {
    const phonePattern = /^\d{10}$/;
    console.log('regex tel :', phonePattern.test(input));
    return phonePattern.test(input);
  };

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: DOMPurify.sanitize(e.target.value) });
  };

  const gereTouche = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formulaire.honeypot) {
      console.log('tentative par bot standard'); // un champ caché ne peut être rempli que par un bot, on bloque.
      return;
    }
    if (!formulaire.email && !formulaire.telephone) {
      toast.error('Merci de saisir au moins un contact valide');
    }
    if (!formulaire.message) {
      toast.error("merci de préciser l'objet de votre prise de contact");
      return;
    }
    if (!validateEmail(formulaire.email) && !validateTel(formulaire.telephone)) {
      // si FAUX (!=not) &&(et) FAUX(! encore) = (on veut au moins un élément valide !)
      toast.error(
        'email et/ou téléphone manquant ou invalide, veuillez saisir une adresse mail et/ou numéro de téléphone valides'
      );
      return;
    } else {
      // Envoyer le message
      try {
        await formulaireContact(formulaire);
        console.log('Envoi du message:', formulaire);
        toast.success('Message envoyé');
      } catch (e) {
        console.error("Erreur lors de l'envoi du message :", e);
        toast.error("erreur d'envoi");
      }
    }
  };

  return (
    <Container fluid>
      <Row className='d-flex flex-start p-0 mx-5 hero'>
        <Col md={3} className='p-0 img'>
          <Image className='roundedLeft' src='massage0.avif' alt='masseuse en action' />
        </Col>
        <Col md={6} className='d-flex flex-column mx-auto justify-content-center align-items-center'>
          <Stack gap={2} className='w-100 mt-2 mx-auto'>
            <Row className='bulle p-3 mx-1 align-content-center'>
              <h1>
                <p>Nous Contacter</p>
              </h1>
            </Row>
            <Row className='d-flex bulle p-4 m-1 flex-row align-content-start'>
              <Form className='col-12 p-0' onSubmit={handleSubmit}>
                <Row className='p-0'>
                  <Col>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                      <Form.Control
                        className='mb-1'
                        aria-describedby='nom'
                        aria-label='nom'
                        name='nom'
                        type='text'
                        legend='zone dédiée au nom'
                        placeholder='Votre nom'
                        autoComplete='family-name'
                        value={formulaire.nom}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      name='honeypot'
                      style={{ display: 'none' }}
                      value={formulaire.honeypot}
                      onChange={handleChange}
                    />
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                      <Form.Control
                        className='mb-1'
                        aria-describedby='prenom'
                        aria-label='prenom'
                        name='prenom'
                        type='text'
                        placeholder='Votre prénom'
                        autoComplete='given-name'
                        value={formulaire.prenom}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='p-0'>
                  <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                    <Form.Control
                      className='mb-1'
                      aria-describedby='email'
                      aria-label='Email'
                      name='email'
                      type='email'
                      placeholder='Email'
                      autoComplete='email'
                      value={formulaire.email}
                      onChange={handleChange}
                      onBlur={gereTouche}
                      isInvalid={touched.email && (formulaire.telephone || formulaire.email)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Veuillez saisir un moyen de contact valide.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                    <Form.Control
                      aria-describedby='telephone'
                      aria-label='telephone'
                      name='telephone'
                      type='tel'
                      placeholder='Numéro de téléphone'
                      autoComplete='tel'
                      value={formulaire.telephone}
                      onChange={handleChange}
                      onBlur={gereTouche}
                      isInvalid={touched.telephone && (formulaire.telephone || formulaire.email)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Veuillez saisir un moyen de contact valide.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      aria-describedby='votre message'
                      aria-label='message'
                      type='textarea'
                      name='message'
                      placeholder='Votre message'
                      value={formulaire.message}
                      required
                      onChange={handleChange}
                      onBlur={gereTouche}
                      isInvalid={touched.message && !formulaire.message}
                    />
                    <Form.Control.Feedback type='invalid'>Veuillez saisir un message.</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className='mx-1 p-0'>
                  <Button className='' variant='primary' type='submit'>
                    Envoyer
                  </Button>
                </Row>
              </Form>
            </Row>
          </Stack>
        </Col>
        <Col md={3} className='p-0 img'>
          <Image className='roundedRight' src='décoration.avif' alt='décor zen' />
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
