import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const AleatorioUrlsBdModalLoad = ({
  modalShow,
  setModalShow,
  url,
  modalOkBtnAction,
  modalCancelBtnAction,
  newTitle,
  handleInputChange
}) => {
  return url ? (
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>URL Load title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The current URL:{' '}
        <a target="_blank" href={url.currentUrl} rel="noreferrer">
          {url.currentTitle || url.currentUrl}
        </a>{' '}
        is going to have the title:
        <input
          type="text"
          className="form-control mt-1"
          value={newTitle}
          onChange={handleInputChange}
          name="newTitle"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalCancelBtnAction}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            modalOkBtnAction(url._id, newTitle, url.index)
          }}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <div></div>
  )
}

export default AleatorioUrlsBdModalLoad
