import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { faClipboard, faEye, faGlobe, faRotate } from '@fortawesome/free-solid-svg-icons';

import Constants from '../../constants';
import {abrirUrlEspecifica, reestablecerUrl} from '../../utils/url.js'
import { UrlRandom } from '../../models/Url';
import { KeyPressFilterComponent } from '../../components/Filtros/KeyPressFilterComponent/KeyPressFilterComponent';

import './AleatorioUrlsBdPage.css';
import GeneralTableButton from '../../components/General/TableButton/TableButton';
import { useNavigate } from 'react-router-dom';
import AleatorioUrlsBdModal from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModal';

const AleatorioUrlsBdPage = ({props}) => {
    const [cadenas, setCadenas] = useState([])
    const [cadenasFiltro, setCadenasFiltro] = useState([])
    const [nroResultados, setnroResultados] = useState(1)
    const [linkCount, setLinkCount] = useState(-1)
    const [currentLink, setCurrentLink] = useState(-1)
    const intervalRef = React.useRef(null);

    //States modal
    const [modalDetailShow, setmodalDetailShow] = useState(false);
    const [modalCadena, setmodalCadena] = useState(null);

    const navigate = useNavigate();
  
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
            await axios.get(Constants.urlBackend+'/api/urls-random/'+nroResultados)
            .then(res => {
                const datos = res.data.urls;
                const cadenasClase = [];
                datos.map((cadena, index)=>{
                    let maxReset = null;

                    if(cadena.resets){
                        let idReset = Math.max(...cadena.resets.map(reset => reset._id))
                        maxReset = cadena.resets.find(reset => {
                            return reset._id === idReset;
                        });
                    }

                    cadenasClase.push(new UrlRandom(cadena._id, index+1, cadena.resets ? maxReset.url : cadena.url, '', cadena.resets));
                    return null;
                })
                setCadenas(cadenasClase);
                setCadenasFiltro(cadenasClase);
                setLinkCount(cadenasClase.length)
                setCurrentLink(0)
            });
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

    return (
        <Container style={{paddingTop: '80px'}}>
            <AleatorioUrlsBdModal 
                modalShow = {modalDetailShow}
                setModalShow = {setmodalDetailShow}
                cadenaId = {modalCadena ? modalCadena._id : null}
            ></AleatorioUrlsBdModal>
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
                                <th style={{width: '20%'}}>Opciones</th>
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
