import { createPortal } from "react-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function MyModal({ showModal, closeModal, onClickYes, onClickNo, txt }) {
  const handleClose = () => closeModal();
  const handleCloseYes = () => {
    onClickYes();
    closeModal();
  };

  const handleCloseNo = () => {
    onClickNo();
    closeModal();
  };

  return createPortal(
    <>
      <Modal
        className={css.modal}
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className={css.modalTitle}>GAME OVER</Modal.Title>
        </Modal.Header>
        <Modal.Body className={css.txtbody}>Points: {txt}</Modal.Body>
        <Modal.Body className={css.txtbody}>Want to play again?</Modal.Body>
        <Modal.Footer>
          <Button
            className={css.button}
            variant="secondary"
            onClick={handleCloseYes}
          >
            Yes
          </Button>
          <Button
            className={css.button}
            variant="outline-secondary"
            onClick={handleCloseNo}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
    modalRoot,
  );
}

export default MyModal;
