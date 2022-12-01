import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { getUrlById } from '../../../services/urls/getUrlById';
import './AleatorioUrlsBdModal.css';
import AleatorioUrlsBdModalTabTitles from './AleatorioUrlsBdModalTabTitles/AleatorioUrlsBdModalTabTitles';
import AleatorioUrlsBdModalTabGeneral from './AleatorioUrlsBdModalTabGeneral/AleatorioUrlsBdModalTabGeneral';
import AleatorioUrlsBdModalTabResets from './AleatorioUrlsBdModalTabResets/AleatorioUrlsBdModalTabResets';

const AleatorioUrlsBdModal = ({modalShow, setModalShow, cadenaId}) => {

    const [cadena, setCadena] = useState(null);

    const [titles, setTitles] = useState([]);
    const [resets, setResets] = useState([]);

    useEffect((cadena) => {

        const getUrlByIdService = async() => {
            if(cadenaId){
                const url = await getUrlById(cadenaId);
                setCadena(url);
                setTitles(url.titles || []);
                setResets(url.resets || []);
            }
        }

        getUrlByIdService(cadena);
    }, [cadenaId]);    

    return (
        <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                DETALLES DE LA URL
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                defaultActiveKey="titles"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                    <Tab eventKey="general" title="General">
                        <AleatorioUrlsBdModalTabGeneral
                            cadena={cadena}
                        ></AleatorioUrlsBdModalTabGeneral>
                    </Tab>
                    <Tab eventKey="titles" title="Títulos">
                        <AleatorioUrlsBdModalTabTitles 
                            cadenaId={cadenaId}
                            titles={titles}
                            setTitles={setTitles}
                        ></AleatorioUrlsBdModalTabTitles>
                    </Tab>
                    <Tab eventKey="resets" title="Urls">
                        <AleatorioUrlsBdModalTabResets
                            resets={resets}
                        ></AleatorioUrlsBdModalTabResets>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                footer
            </Modal.Footer>
        </Modal>
    );
}

export default AleatorioUrlsBdModal;