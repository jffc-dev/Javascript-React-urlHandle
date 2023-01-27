import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModalComponent = (
    {
        modalShow, 
        setModalShow,
        modalHeader, 
        modalBody,
        modalCloseBtnText, 
        modalOkBtnText,
        modalOkBtnAction
}) => {

  const handleClose = () => setModalShow(false);

  return (
    <Modal show={modalShow} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>{modalHeader}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        {modalCloseBtnText || "Close"}
        </Button>
        <Button variant="primary" onClick={modalOkBtnAction || handleClose}>
        {modalOkBtnText || "Save"}
        </Button>
    </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModalComponent