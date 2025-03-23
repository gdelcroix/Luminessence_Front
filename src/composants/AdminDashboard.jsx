import { Tab, Tabs, Container } from 'react-bootstrap';
// TODO importer les modules Gestion...
import GestionModules from "./GestionModules";
import GestionServices from './GestionServices';

function AdminDashboard(){
  return (
    <Container fluid>
      <h1>Administration Système</h1>
      <Tabs defaultActiveKey='modules' id='admin-dashboard-tabs'>
        <Tab eventKey='modules' title='Gérer les modules'>
          <GestionModules/>
        </Tab>
        <Tab eventKey='services' title='Gérer les prestations'>
          <GestionServices/>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default AdminDashboard;