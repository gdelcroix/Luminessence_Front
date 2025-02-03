import { useState } from 'react';
import { Alert, Container, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import { getAllUsers, inscription } from '../service/ApiCalls';

const Register = ({ setShowRegisterModal }) => {
  const [user, setUser] = useState({
    Nom: '',
    Prenom: '',
    Email: '',
    Telephone: '',
    Adresse: '',
    CodePostal: '',
    Ville: '',
    Mdp: ''
  });
  const [touched, setTouched] = useState({});
  const [valide, setValide] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTouch = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateInput = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    return emailPattern.test(input) || phonePattern.test(input);
  };

  const validatePassword = (Mdp) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(Mdp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput(user.Email) && !validateInput(user.Telephone)) {
      setErrorMessage('Identifiant manquant ou invalide, veuillez saisir votre email ou numéro de téléphone');
      return;
    }
    if (!validatePassword(user.Mdp)) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères, dont des lettres majuscules, minuscules, et des chiffres.');
      return;
    }
    setValide(true);
    try {
      const response = await inscription(user);
      console.log(response.message);
      if (response.user) {
        setShowRegisterModal(false);
      } else {
        setErrorMessage("Erreur d'enregistrement, vérifiez les champs en rouge");
      }
    } catch (err) {
      console.error('Erreur :', err);
      setErrorMessage(err.message || 'Une erreur est survenue');
      setValide(false);
    }
  };

  const test = () => { // TODO a supprimer
    console.log('test');
    getAllUsers().then(response => console.log(response)).catch(error => console.log(error));
  };

  return (
    <Container className='d-flex flex-column align-items-center'>
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
      <Form className='col-8 mt-3' noValidate validated={valide} onSubmit={handleSubmit}>
        <Row className='w-auto mb-2'>
          <Col xs='auto' className='d-flex align-items-start'>
            <InputGroup.Text id='identifiant'>Identifiant</InputGroup.Text>
          </Col>
          <Col>
            <Form.Control
              className='mb-1'
              aria-describedby='identifiant'
              aria-label='email'
              name='Email'
              type='email'
              placeholder='Email'
              value={user.Email}
              onChange={handleChange}
              onBlur={handleTouch}
              isInvalid={touched.Email && !validateInput(user.Email)}
            />
            <Form.Control.Feedback type='invalid'>Veuillez entrer un email valide.</Form.Control.Feedback>
            <Form.Control
              aria-describedby='identifiant'
              aria-label='telephone'
              name='Telephone'
              type='tel'
              placeholder='Numéro de téléphone'
              value={user.Telephone}
              onChange={handleChange}
              onBlur={handleTouch}
              isInvalid={touched.Telephone && !validateInput(user.Telephone)}
            />
            <Form.Control.Feedback type='invalid'>Veuillez entrer un numéro de téléphone valide.</Form.Control.Feedback>
          </Col>
        </Row>

        <InputGroup className='mb-2'>
          <InputGroup.Text id='password'>Mot de passe</InputGroup.Text>
          <Form.Control
            aria-label='password'
            aria-describedby='password'
            name='Mdp'
            type='password'
            placeholder='Minimum 8 lettres et chiffres'
            value={user.Mdp}
            onChange={handleChange}
            onBlur={handleTouch}
            isInvalid={touched.Mdp && !validatePassword(user.Mdp)}
          />
        </InputGroup>
        <InputGroup className='mb-2'>
          <InputGroup.Text id='nom'>Nom</InputGroup.Text>
          <Form.Control
            aria-describedby='nom'
            aria-label='Nom'
            name='Nom'
            value={user.Nom}
            onChange={handleChange}
            onBlur={handleTouch}
            required
            isInvalid={touched.Nom && !user.Nom}
          />
          <Form.Control.Feedback type='invalid'>Veuillez saisir votre nom.</Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-2'>
          <InputGroup.Text id='prenom'>Prénom</InputGroup.Text>
          <Form.Control
            name='Prenom'
            value={user.Prenom}
            onChange={handleChange}
            onBlur={handleTouch}
            required
            isInvalid={touched.Prenom && !user.Prenom}
          />
          <Form.Control.Feedback type='invalid'>Veuillez saisir votre prénom.</Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-2'>
          <InputGroup.Text id='adresse'>Adresse</InputGroup.Text>
          <div className='w-100'>
            <Form.Control
              name='Adresse'
              type='text'
              placeholder='Adresse: numéro et rue'
              value={user.Adresse}
              onChange={handleChange}
              onBlur={handleTouch}
              required
              isInvalid={touched.Adresse && !user.Adresse}
            />
            <Form.Control.Feedback type='invalid'>Veuillez entrer votre adresse.</Form.Control.Feedback>
            <Form.Control
              placeholder='Code Postal'
              name='CodePostal'
              type='number'
              value={user.CodePostal}
              onChange={handleChange}
              onBlur={handleTouch}
              required
              isInvalid={touched.CodePostal && !user.CodePostal}
            />
            <Form.Control.Feedback type='invalid'>Veuillez entrer votre code postal.</Form.Control.Feedback>
            <Form.Control
              placeholder='Ville'
              name='Ville'
              type='text'
              value={user.Ville}
              onChange={handleChange}
              required
              isInvalid={touched.Ville && !user.Ville}
            />
            <Form.Control.Feedback type='invalid'>Veuillez entrer votre commune de résidence.</Form.Control.Feedback>
          </div>
        </InputGroup>
        <Form.Control type='submit' value='Sinscrire' className='btn btn-success' />
      </Form>
      <Button onClick={test}>Test</Button>
    </Container>
  );
};

export default Register;
