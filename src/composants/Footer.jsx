import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar className='FooterContainer' style={{ backgroundColor:"#6b5137"}}>
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand href='/' className='logo d-flex align-items-center'>
          <img src='/luminessence.jpg' alt='Luminessence du savoir' style={{ height: '40px' }} />
        </Navbar.Brand>
        <Nav className='ms-auto d-flex align-items-center'>
          <Nav.Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook'></i>
          </Nav.Link>
          <Nav.Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram'></i>
          </Nav.Link>
          <Nav.Link href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin'></i>
          </Nav.Link>
        </Nav>
        <Nav className='d-flex align-items-center'>
          <Nav.Link href='/mentions-legales'>Mentions Légales</Nav.Link>
          <Nav.Link href='/politique-de-confidentialite'>Politique de Confidentialité</Nav.Link>
          <Nav.Link href='/cgv'>CGV</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
