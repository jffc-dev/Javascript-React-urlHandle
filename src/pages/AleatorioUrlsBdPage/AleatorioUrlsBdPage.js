import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { faClipboard, faEye, faGlobe, faRotate, faTrashRestore } from '@fortawesome/free-solid-svg-icons';

import {abrirUrlEspecifica, reestablecerUrl, updateArrayObject} from '../../utils/url.js'
import { KeyPressFilterComponent } from '../../components/Filtros/KeyPressFilterComponent/KeyPressFilterComponent';

import './AleatorioUrlsBdPage.css';
import GeneralTableButton from '../../components/General/TableButton/TableButton';
// import { useNavigate } from 'react-router-dom';
import AleatorioUrlsBdModal from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModal';
import { getUrlsRandom } from '../../services/urls/getUrlsRandom';
import { getNewUrlService } from '../../services/urls/getNewUrl';
import ConfirmationModalComponent from '../../components/General/ConfirmationModal/ConfirmationModalComponent.js';

const AleatorioUrlsBdPage = ({props}) => {
    const [cadenas, setCadenas] = useState([])
    const [cadenasFiltro, setCadenasFiltro] = useState([])
    const [nroResultados, setnroResultados] = useState(1)
    const [linkCount, setLinkCount] = useState(-1)
    const [currentLink, setCurrentLink] = useState(-1)
    const intervalRef = React.useRef(null);

    //States modal
    const [modalDetailShow, setmodalDetailShow] = useState(false);
    const [modalConfirmationShow, setmodalConfirmationShow] = useState(false);
    const [modalCadena, setmodalCadena] = useState(null);

    //States confirmation modal - replace
    const [modalCadenaReplaceOld, setmodalCadenaReplaceOld] = useState(null);
    const [modalCadenaReplaceNew, setmodalCadenaReplaceNew] = useState(null);
  
    React.useEffect(() => {
      return () => stopCounter();
    }, []);

    const handleChangeResultados = (event) => {
        let content = event.target.value;
        if(parseInt(content.substr(content.length - 1)) !== null && parseInt(content.substr(content.length - 1)) !== undefined){
            setnroResultados(content);
        }
    }

    const handleContador = (operacion) => {
        if (operacion === "+")
            setnroResultados((prevCounter) => parseInt(prevCounter) + 1);
        else
            setnroResultados((prevCounter) => (parseInt(prevCounter)>1) ? parseInt(prevCounter) - 1 : parseInt(prevCounter));
    }

    const startCounter = (operacion) => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            handleContador(operacion);
        }, 100);
      };
    
    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const obtenerCadenas = async() => {

        if(currentLink < linkCount){

            const result = await Swal.fire({
                title: 'No has terminado de recorrer la lista anterior. ¿Quieres generar una nueva?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Generar',
                denyButtonText: 'Volver',
            });

            if(!result.isConfirmed){
                return;
            }

        }

        if(nroResultados !== ''){
            const cadenasClase = await getUrlsRandom(nroResultados);

            setCadenas(cadenasClase);
            setCadenasFiltro(cadenasClase);
            setLinkCount(cadenasClase.length)
            setCurrentLink(0)
        }

    }
    const abrirUrls = () => {

        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: cadenas.at(currentLink).url,
        }).click();
        setCurrentLink(currentLink + 1);
        
    }

    const verDetalleUrl = (cadena) =>  {
        setmodalCadena(cadena);
        setmodalDetailShow(true);
    }

    const OpenConfirmModalReplace = async(cadena) => {
        const excepts = cadenas.map(cadena => {return cadena._id})
        const {data, status} = await getNewUrlService(excepts, 1, cadena.index)

        if(status === 1){
            const newUrl = data[0]
            setmodalCadenaReplaceOld(cadena)
            setmodalCadenaReplaceNew(newUrl)
            setmodalConfirmationShow(true)
        }
    }

    const pressOkModalReplace = async() => {
        updateArrayObject(cadenas, setCadenas, modalCadenaReplaceOld, modalCadenaReplaceNew)
        setmodalConfirmationShow(false);
    }

    return (
        <Container style={{paddingTop: '80px'}}>
            <AleatorioUrlsBdModal 
                modalShow = {modalDetailShow}
                setModalShow = {setmodalDetailShow}
                cadenaId = {modalCadena ? modalCadena._id : null}
            ></AleatorioUrlsBdModal>
            <ConfirmationModalComponent 
                modalShow = {modalConfirmationShow}
                setModalShow = {setmodalConfirmationShow}
                modalHeader = "URL Replace"
                modalOkBtnAction={pressOkModalReplace}
                modalBody = {(modalCadenaReplaceOld && modalCadenaReplaceNew) && 
                    <div>
                        You are goin to replace <a target="_blank" href={modalCadenaReplaceOld.url} rel="noreferrer">{modalCadenaReplaceOld.title || 'Current URL'}</a>
                        &nbsp;by <a target="_blank" href={modalCadenaReplaceNew.url} rel="noreferrer">{modalCadenaReplaceNew.title || 'New URL'}</a>. Are you sure?
                    </div>
                }
            ></ConfirmationModalComponent>
            <div>
                <div className='random__contenedor'>
                    <div className='random__contenedor__contador'>
                        <button onClick={()=>{handleContador("-")}} onMouseDown={()=>{startCounter("-")}} onMouseUp={stopCounter} onMouseLeave={stopCounter}>-</button>
                        <input value={nroResultados} onChange={handleChangeResultados}></input>
                        <button onClick={()=>{handleContador("+")}} onMouseDown={()=>{startCounter("+")}} onMouseUp={stopCounter} onMouseLeave={stopCounter}>+</button>
                    </div>
                    <div className='random__contenedor__botones'>
                        <div className='random__contenedor__botones_btn'>
                            <button onClick={() => { obtenerCadenas() }}>Obtener cadenas</button>
                        </div>
                        <div className='random__contenedor__botones_btn'>
                            <button disabled={linkCount === currentLink} onClick={() => { abrirUrls() }}>Abrir URL</button>
                            <div className='random__contenedor__botones_div'>{(currentLink === -1) ? '' : currentLink}</div>
                        </div>
                    </div>
                </div>
                <div className='random__tabla'>
                    <KeyPressFilterComponent cadenas={cadenas} setCadenasFiltro={setCadenasFiltro}/>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width: '4%'}}></th>
                                <th style={{width: '6%'}}>NRO</th>
                                <th>URL</th>
                                <th style={{width: '6%'}}>RESETS</th>
                                <th style={{width: '20%'}}>OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cadenasFiltro.length ? cadenasFiltro.map((cadena, index)=>
                                (
                                    <tr key={index}>
                                        <td className='url'>
                                            {(currentLink === cadena.index) && '->'}
                                        </td>
                                        <td style={{width: '10%'}}>
                                            {cadena.index}
                                        </td>
                                        <td className='url'>
                                            {cadena.url}
                                        </td>
                                        <td>
                                            {(cadena.resets) ? cadena.resets.length : 0}
                                        </td>
                                        <td>
                                            <GeneralTableButton faIcon={faGlobe} msgTooltip={"Ver"} 
                                                action={()=>{abrirUrlEspecifica(cadena)}}
                                            ></GeneralTableButton>
                                            <GeneralTableButton faIcon={faRotate} msgTooltip={"Reestablecer"} 
                                                action={()=>{reestablecerUrl(cadena, cadenas, setCadenas)}}
                                            ></GeneralTableButton>
                                            <GeneralTableButton faIcon={faEye} msgTooltip={"Detalle"} 
                                                action={()=>{verDetalleUrl(cadena)}}
                                            ></GeneralTableButton>
                                            <GeneralTableButton faIcon={faClipboard} msgTooltip={"Copiar URL"} 
                                                action={()=>{navigator.clipboard.writeText(cadena.url)}}
                                            ></GeneralTableButton>
                                            <GeneralTableButton faIcon={faTrashRestore} msgTooltip={"Reemplazar"} color="red"
                                                action={()=>{OpenConfirmModalReplace(cadena)}}
                                            ></GeneralTableButton>
                                        </td>
                                    </tr>
                                )) : 
                                <tr><td colSpan={4} style={{textAlign: 'center'}}>No se cargaron registros</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
}

export default AleatorioUrlsBdPage;
