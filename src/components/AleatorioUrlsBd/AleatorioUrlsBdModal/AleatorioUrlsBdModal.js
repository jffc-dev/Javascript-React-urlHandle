import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import './AleatorioUrlsBdModal.css'
import AleatorioUrlsBdModalTabTitles from './AleatorioUrlsBdModalTabTitles/AleatorioUrlsBdModalTabTitles'
import AleatorioUrlsBdModalTabGeneral from './AleatorioUrlsBdModalTabGeneral/AleatorioUrlsBdModalTabGeneral'
import AleatorioUrlsBdModalTabResets from './AleatorioUrlsBdModalTabResets/AleatorioUrlsBdModalTabResets'

const DetailUrlModal = ({ modalShow, setModalShow, cadenas, setCadenas, cadena, setCadena }) => {
  return (
    cadena && (
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">URL Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="titles" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="general" title="General">
              <AleatorioUrlsBdModalTabGeneral cadena={cadena}></AleatorioUrlsBdModalTabGeneral>
            </Tab>
            <Tab eventKey="titles" title="Títulos">
              <AleatorioUrlsBdModalTabTitles
                modalLink={cadena}
                setModalLink={setCadena}
                links={cadenas}
                setLinks={setCadenas}
                modalLinkIndex={cadena.index}></AleatorioUrlsBdModalTabTitles>
            </Tab>
            <Tab eventKey="resets" title="Urls">
              <AleatorioUrlsBdModalTabResets cadena={cadena}></AleatorioUrlsBdModalTabResets>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>footer</Modal.Footer>
      </Modal>
    )
  )
}

export default DetailUrlModal
