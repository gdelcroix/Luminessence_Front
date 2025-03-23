import { useContext} from 'react';
import { Container, Button } from 'react-bootstrap';
import Context from '../context/Context';
import NavBar from '../composants/NavBar';
import AdminDashboard from '../composants/AdminDashboard';
import { useNavigate } from 'react-router-dom';

function ComptePage() {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <NavBar />
      <Button onClick={handleBackHome}>Retour à l&apos;accueil</Button>
      <h1>Mon Compte</h1>
      <p>
        Bienvenue {user.prenom} {user.nom}
      </p>
      {user.role === 'admin' && <AdminDashboard />}
      <h2 className='text-end'>Historique des réservations</h2>

    </Container>
  );
}


export default ComptePage;
