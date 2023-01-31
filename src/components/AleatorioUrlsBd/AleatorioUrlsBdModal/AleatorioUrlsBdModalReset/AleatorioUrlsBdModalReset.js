import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useForm } from '../../../../hooks/useForm'

const AleatorioUrlsBdModalReset = ({
  modalShow,
  setModalShow,
  url,
  modalOkBtnAction,
  modalCancelBtnAction,
  formData
}) => {
  const [{ newUrl }, handleInputChange] = useForm(
    formData || {
      newUrl: '',
      initial: true
    }
  )

  return url ? (
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>URL Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The current URL:{' '}
        <a target="_blank" href={url.currentUrl} rel="noreferrer">
          {url.currentTitle || url.currentUrl}
        </a>{' '}
        is going to replace by:
        <input
          type="text"
          className="form-control mt-1"
          value={newUrl}
          onChange={handleInputChange}
          name="newUrl"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalCancelBtnAction}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            modalOkBtnAction(url._id, newUrl, url.index)
          }}>
          Replace
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <div></div>
  )
}

export default AleatorioUrlsBdModalReset
