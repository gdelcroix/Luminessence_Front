import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Stack, Button, Card } from 'react-bootstrap';
import { tousProduits, img_url } from '../service/ApiCalls';
import Context from '../context/Context';

function BoutiquePage() {
  const [produits, setProduits] = useState([]); // initialisation tableau vide
  const { panier, setPanier } = useContext(Context);

  useEffect(() => {
    // appel bdd pour récupérer les produits
    const fetchProduits = async () => {
      try {
        const response = await tousProduits();
        setProduits(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    fetchProduits();
  }, []);

  const ajouter = (produit) => {
    const produitExiste = panier.find((p) => p.ID_Produit === produit.ID_Produit);

    if (produitExiste) {
      setPanier(
        panier.map((p) =>
          p.ID_Produit === produit.ID_Produit ? { ...produitExiste, quantite: produitExiste.quantite + 1 } : p
        )
      );
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
    console.log('Panier après ajout :', panier);
  };

  const supprimer = (produitId) => {
    setPanier(panier.filter((p) => p.ID_Produit !== produitId));
    console.log('Panier après suppression :', panier);
  };

  const modifierQuantite = (produitId, quantite) => {
    if (quantite < 1) {
      supprimer(produitId);
    } else {
      const produitExiste = panier.find((p) => p.ID_Produit === produitId);
      setPanier(panier.map((p) => (p.ID_Produit === produitId ? { ...produitExiste, quantite: quantite } : p)));
    }
    console.log('Panier après modification :', panier);
  };

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
          <Image className='roundedRight' src='décoration.avif' alt='décor zen' />
        </Col>
      </Row>
      <Row className='d-flex flex-row gap-3 mx-5 p-3 justify-content-center bulle'>
        description massages ayurvédiques :<br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Row>
      <Row>
        <Col md={2} className='p-3 bulle'>
          <h4>Panier</h4>
          {panier.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <ul>
              {panier.map((produit) => (
                <li key={produit.ID_Produit}>
                  {produit.Nom_Produit} - {produit.Prix * produit.quantite}€
                  <div className='d-flex align-items-center'>
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() => modifierQuantite(produit.ID_Produit, produit.quantite - 1)}
                    >
                      -
                    </Button>
                    <input
                      type='number'
                      value={produit.quantite}
                      onChange={(e) => modifierQuantite(produit.ID_Produit, parseInt(e.target.value))}
                      style={{ width: '50px', margin: '0 10px' }}
                    />
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() => modifierQuantite(produit.ID_Produit, produit.quantite + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant='danger'
                      size='sm'
                      onClick={() => supprimer(produit.ID_Produit)}
                      style={{ marginLeft: '10px' }}
                    >
                      Retirer
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Col>{' '}
        <Col md={10}>
          {' '}
          <Row className='d-flex flex-row gap-3 mx-5 justify-content-between'>
            {produits &&
              produits.map((produit) => (
                <Card style={{ width: '18rem' }} key={produit.ID_Produit}>
                  <Card.Img variant='top' src={`${img_url}/${produit.Image}`} alt={produit.Nom_Produit} />
                  <Card.Body>
                    <Card.Title>{produit.Nom_Produit}</Card.Title>
                    <Card.Text>{produit.Description}</Card.Text>
                    <Button
                      variant='primary'
                      onClick={() => ajouter(produit)}
                    >{`Acheter pour ${produit.Prix}€`}</Button>{' '}
                  </Card.Body>
                </Card>
              ))}{' '}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BoutiquePage;
