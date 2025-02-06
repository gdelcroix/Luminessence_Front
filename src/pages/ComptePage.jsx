import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import context from '../context/Context';

function ComptePage() {
     const { user } = useContext(context);
  console.log('ComptePage');

  return (
    <Container>
      <h1>Mon Compte</h1>
      <p>
        Bienvenue ${user.prenom} ${user.nom}
      </p>
    </Container>
  );
}

export default ComptePage;
