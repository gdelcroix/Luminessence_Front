import { useContext, useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import Context from '../context/Context';

function BienEtrePage() {
  const { currentSection, setCurrentSection } = useContext(Context);

  useEffect(() => {
    setCurrentSection(currentSection); // TODO a configurer : les redirections des boutons
  });

  // className='mt-1 ms-0 p-0 mx-5'
  return (
    <>
      <Container fluid>
        <Row className='p-0 mx-5 d-flex flex-row flex-start hero'>
          <Col md={3} className='p-0 img'>
            <Image className='roundedLeft' src='massage0.avif' alt='masseuse en action' />
          </Col>
          <Col md={6} className='d-flex flex-column mx-auto justify-content-center align-items-center'>
            <Stack gap={2} className='w-100 mt-2 mx-auto'>
              <div className='bulle p-3 m-1'>
                <h1 className='slide-down'>
                  <p>Ateliers</p>Bien-Être
                </h1>
              </div>
              <div className='d-flex bulle p-4 m-1 flex-row align-content-start'>
                <Col md={8}>Réservez dès a présent votre séance atelier, seule ou entre ami/e/s !</Col>
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
        <Row className='d-flex flex-row gap-3 mx-5 justify-content-between'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Fabrication de Baumes à Lèvres Naturels</Card.Title>
              <Card.Text>
                Découvrez comment créer des baumes à lèvres hydratants avec des ingrédients naturels, simples et
                efficaces.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('massagesAyurvediques')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='top' src='image-6.avif' />
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Création de Crèmes Hydratantes pour le Visage</Card.Title>
              <Card.Text>
                Apprenez à formuler des crèmes hydratantes maison adaptées à votre type de peau avec des ingrédients
                naturels.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('formationEstimeDeSoi')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='bottom' src='image-8.avif' />
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Fabrication de Gommages Corporels Naturels</Card.Title>
              <Card.Text>
                Initiez-vous à la fabrication de gommages corporels exfoliants et naturels pour une peau douce et
                revitalisée.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('ateliersBienEtre')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='bottom' src='image-7.avif' />
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Création de Masques pour le Visage</Card.Title>
              <Card.Text>
                Maîtrisez l&apos;art de concevoir des masques visage personnalisés pour un teint éclatant et une peau
                nourrie.
              </Card.Text>
              <Button variant='primary' onClick={() => setCurrentSection('boutique')}>
                En savoir plus
              </Button>
            </Card.Body>
            <Card.Img variant='bottom' src='image-9.avif' />
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default BienEtrePage;
