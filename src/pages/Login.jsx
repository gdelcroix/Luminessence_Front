import { useContext, useState } from 'react';
import { Alert, Container, Form, InputGroup } from 'react-bootstrap';
import context from '../context/Context';
import AuthService from '../service/AuthService';
import { toast } from 'react-toastify';

const Login = ({ setShowLoginModal }) => {
  // déclaration des variables et constantes
  const [user, setUser] = useState({ identifiant: '', mdp: '' }); // identifiants de cnx
  const [errorMessage, setErrorMessage] = useState(''); // message d'erreur
  const { isAuthenticated, setIsAuthenticated, setUser: setAuthUser } = useContext(context); // initialisation des etats d'authentification

  // gère les changements dans les champs du formulaire, sans recharger la page
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // fonction pour vérifier la validité de l'identifiant (mail ou tel)
  const validateInput = (identifiant) => {
    // Expression régulière (Regex) pour les emails (caractères sauf @ + @ + caractères sauf @ + . + caractères sauf @)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex pour les numéros de téléphone à 10 chiffres
    const phonePattern = /^\d{10}$/;
    if (emailPattern.test(identifiant)) {
      return true;
    } else if (phonePattern.test(identifiant)) {
      return true;
    } else {
      return false;
    }
  };

  // gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // empèche le rechargement de la page pendant la saisie
    if (!validateInput(user.identifiant)) {
      setErrorMessage('identifiant invalide, veuillez saisir votre mail ou numéro de téléphone'); // message d'erreur
      return;
    }
    try {
      const reponse = await AuthService.login(user); // appel au service de connexion

      if (reponse.data) {
        let token = reponse.data.token;
        localStorage.setItem('token', token); // sauvegarde du token renvoyé par le serveur
        console.log('Token saved'); // console pour tracer l'étape
        AuthService.setAxiosToken();
        let isValid = AuthService.isValid();
        if (isValid) {
          setIsAuthenticated(isValid);
          console.log('isAuthenticated après connexion:', isAuthenticated);
          const user = AuthService.getUser();
          setAuthUser(user);
          console.log('User décodé:', user);
          toast(`Bienvenue, ${user.prenom}`);
        }
        setShowLoginModal(false); // fermeture de la modal
      } else {
        setErrorMessage('Erreur de connexion');
      }
    } catch (err) {
      console.error('erreur :', err);
      setErrorMessage('une erreur est survenue'); // message d'erreur générique pour l'utilisateur
    }
  };
  // formulaire
  return (
    <Container className='d-flex flex-column align-items-center'>
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert> /*affichage de l'erreur si erreur de cnx */}
      {/* appel de la fonction de validation */}
      <Form className='col-6 mt-3' onSubmit={handleSubmit}>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='basic-addon2'>Identifiant</InputGroup.Text>
          <Form.Control
            aria-describedby='basic-addon2'
            aria-label='identifiant'
            name='identifiant'
            type='text'
            placeholder='Email ou numéro de téléphone'
            onChange={handleChange}
          />
          {/* handleChange = appel de la fonction de mise à jour de la variable */}
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='basic-addon2'>Password</InputGroup.Text>
          <Form.Control
            type='password'
            placeholder='Mot de passe'
            onChange={handleChange}
            aria-label='password'
            aria-describedby='basic-addon2'
            name='mdp'
          />
        </InputGroup>
        <Form.Control type='submit' value='Se connecter' className='btn btn-success' />
      </Form>
    </Container>
  );
};

export default Login;
