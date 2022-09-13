import React, { useState } from 'react';
import Constants from '../../constants';
import {abrirUrlEspecifica, reestablecerUrl} from '../../utils/url.js'
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './random_db.css';
import { UrlRandom } from '../../models/Url';

function Random() {
    const [cadenas, setCadenas] = useState([])
    const [cadenasFiltro, setCadenasFiltro] = useState([])
    const [nroResultados, setnroResultados] = useState(1)
    const [linkCount, setLinkCount] = useState(-1)
    const [currentLink, setCurrentLink] = useState(-1)
    const intervalRef = React.useRef(null);
    const [busqueda, setBusqueda] = useState("")
  
    React.useEffect(() => {
      return () => stopCounter();
    }, []);

    const handleChangeResultados = (event) => {
        setnroResultados(event.target.value);
    }

    const onChangeSearch = (event) => {
        setBusqueda(event.target.value)
        setCadenasFiltro(cadenas.filter(cadena=>cadena.url.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const handleContador = (operacion) => {
        if (operacion === "+")
            setnroResultados((prevCounter) => prevCounter + 1);
        else
            setnroResultados((prevCounter) => (prevCounter>1) ? prevCounter - 1 : prevCounter);
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

                cadenasClase.push(new UrlRandom(cadena._id, index+1, cadena.resets ? maxReset.url : cadena.url, ''));
                return null;
            })
            setCadenas(cadenasClase);
            setCadenasFiltro(cadenasClase);
            setLinkCount(cadenasClase.length)
            setCurrentLink(0)
        })
    }
    const abrirUrls = () => {
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: cadenas.at(currentLink).url,
        }).click();
        setCurrentLink(currentLink + 1);
        console.log(linkCount);
        console.log(currentLink);
    }

    return (
        <Container style={{paddingTop: '80px'}}>
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
                    <input value={busqueda} onChange={onChangeSearch} style={{display: 'inline-block', width: '100%', marginBottom: '1rem'}}/>
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
                                            <button onClick={()=>{abrirUrlEspecifica(cadena)}}>Ver</button>
                                            <button onClick={()=>{reestablecerUrl(cadena, cadenas, setCadenas)}}>Reestablecer</button>
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

export default Random;
