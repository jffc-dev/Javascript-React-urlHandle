import React, { useState } from 'react';
import Constants from '../../constants';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './random_db.css';

function Random() {
    const [cadenas, setCadenas] = useState([])
    const [nroResultados, setnroResultados] = useState(1)
    const [linkCount, setLinkCount] = useState(-1)
    const [currentLink, setCurrentLink] = useState(-1)
    const intervalRef = React.useRef(null);
  
    React.useEffect(() => {
      return () => stopCounter();
    }, []);

    const handleChangeResultados = (event) => {
        setnroResultados(event.target.value);
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
            setCadenas(res.data.urls);
            setLinkCount(res.data.urls.length)
            setCurrentLink(0)
        })
    }
    const abrirUrls = () => {
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: cadenas.at(currentLink).url,
        }).click();
        setLinkCount((currentLink === cadenas.length - 1) ? -1 : linkCount + 1);
        setCurrentLink(currentLink + 1);
    }

    const abrirUrlEspecifica = (cadena) => {
        console.log(cadena)
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: cadena.url,
        }).click();
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
                            <button disabled={linkCount === -1} onClick={() => { abrirUrls() }}>Abrir URL</button>
                            <div className='random__contenedor__botones_div'>{(currentLink === -1) ? '' : currentLink + 1}</div>
                        </div>
                    </div>
                </div>
                <div className='random__tabla'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width: '5%'}}></th>
                                <th style={{width: '10%'}}>NRO</th>
                                <th>URL</th>
                                <th style={{width: '20%'}}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cadenas.length ? cadenas.map((cadena,index)=>(
                                <tr key={index}>
                                    <td className='url'>
                                        {(currentLink === index) && '->'}
                                    </td>
                                    <td style={{width: '10%'}}>
                                        {index+1}
                                    </td>
                                    <td className='url'>
                                        {cadena.url}
                                    </td>
                                    <td>
                                        <button onClick={()=>{abrirUrlEspecifica(cadena)}}>Ver</button>
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
