import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../../hooks/useForm';
import { getUrlById } from '../../../services/urls/getUrlById';
import GeneralTableButton from '../../General/TableButton/TableButton';
import './AleatorioUrlsBdModal.css';
import AleatorioUrlsBdModalTabTitles from './AleatorioUrlsBdModalTabTitles/AleatorioUrlsBdModalTabTitles';

const AleatorioUrlsBdModal = ({modalShow, setModalShow, cadenaId}) => {

    const [cadena, setCadena] = useState(null);
    //General form
    const [{url, dateCreated}, handleInputChange] = useForm(cadena || {
        url: '',
        dateCreated: '',
        initial: true
    });
    
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
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">URL original</label>
                            <div className="col-sm-10">
                                <div className='inputModal__container'>
                                    <input type="text" className="form-control" value={url} onChange={handleInputChange} name="url" readOnly/>
                                    <button className='inputModal__button' onClick={() =>  navigator.clipboard.writeText(url)}><FontAwesomeIcon className='faIcon' icon={faClipboard} inverse/></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Fecha de creación</label>
                            <div className="col-sm-9">
                                <input type="datetime-local" className="form-control" value={dateCreated ? new Date(dateCreated).toISOString().slice(0,16) : ''} onChange={handleInputChange} name="dateCreated" readOnly/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="titles" title="Títulos">
                        <AleatorioUrlsBdModalTabTitles 
                            cadenaId={cadenaId}
                            titles={titles}
                            setTitles={setTitles}
                        ></AleatorioUrlsBdModalTabTitles>
                    </Tab>
                    <Tab eventKey="resets" title="Urls">
                        <div className="col-12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>URL</th>
                                        <th style={{width: '20%'}}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {resets.length ? resets.map((reset, index)=>
                                    (
                                        <tr key={index}>
                                            <td className='url'>
                                                {reset.url}
                                            </td>
                                            <td style={{width: '10%'}}>
                                                <GeneralTableButton faIcon={faClipboard} msgTooltip={"Ver"} 
                                                    action={()=>{navigator.clipboard.writeText(reset.url)}}
                                                ></GeneralTableButton>
                                            </td>
                                        </tr>
                                    )) : 
                                    <tr><td colSpan={2} style={{textAlign: 'center'}}>No se cargaron registros</td></tr>
                                }
                                </tbody>
                            </table>
                        </div>
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