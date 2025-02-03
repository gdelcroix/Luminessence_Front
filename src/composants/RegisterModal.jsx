import { Modal, Button } from 'react-bootstrap';
import Register from '../pages/Register';
import PropTypes from 'prop-types';

const RegisterModal = ({ show, onHide, setShowRegisterModal }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title>Création de Compte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Register setShowRegisterModal={setShowRegisterModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

RegisterModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  setShowRegisterModal: PropTypes.func,
};
export default RegisterModal;

