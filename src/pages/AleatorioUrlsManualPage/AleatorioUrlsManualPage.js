import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import './AleatorioUrlsManualPage.css';

const AleatorioUrlsManualPage = () => {
    const [cadenas, setCadenas] = useState("")
    const [nroResultados, setnroResultados] = useState(1)
    const [cadenasResultado, setCadenasResultado] = useState("")
    const [cadenasResultadoArray, setCadenasResultadoArray] = useState("")
    const [linkCount, setLinkCount] = useState(-1)
    const intervalRef = React.useRef(null);
  
    React.useEffect(() => {
      return () => stopCounter();
    }, []);

    const handleChangeCadenas = (event) => {
        setCadenas(event.target.value);
    }
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

    const arrayToString = (array) => {
        let cadena = ""
        array.forEach((item) => {
            if (cadena !== "")
                cadena += "\n"
            cadena += `${item}`
        })
        return cadena;
    }
    const obtenerCadenas = () => {
        let arrayCadenas = cadenas.split("\n")
        let cadenasResultado = []
        while (cadenasResultado.length < nroResultados) {
            let item = arrayCadenas[Math.floor(Math.random() * arrayCadenas.length)];
            if (!cadenasResultado.includes(item)) {
                cadenasResultado.push(item)
            }
        }
        setCadenasResultado(arrayToString(cadenasResultado));
        setCadenasResultadoArray(cadenasResultado);
        setLinkCount(0);
    }
    const abrirUrls = () => {
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: cadenasResultadoArray.at(linkCount),
        }).click();
        setLinkCount((linkCount === cadenasResultadoArray.length - 1) ? -1 : linkCount + 1);
    }
    return (
        <Container style={{paddingTop: '80px'}}>
            <div className='random__contenedor'>
                <div className='random__contenedor__textarea'>
                    <textarea style={{ width: '100%', height: '100%' }} value={cadenas} onChange={handleChangeCadenas}></textarea>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='random__contenedor__parte'>
                        <div className='random__contenedor__parte__contador'>
                            <button onClick={()=>{handleContador("-")}} onMouseDown={()=>{startCounter("-")}} onMouseUp={stopCounter} onMouseLeave={stopCounter}>-</button>
                            <input value={nroResultados} onChange={handleChangeResultados}></input>
                            <button onClick={()=>{handleContador("+")}} onMouseDown={()=>{startCounter("+")}} onMouseUp={stopCounter} onMouseLeave={stopCounter}>+</button>
                        </div>
                        <button onClick={() => { obtenerCadenas() }}>Obtener cadenas</button>
                        <button disabled={linkCount === -1} onClick={() => { abrirUrls() }}>Abrir URL</button>
                    </div>
                </div>
                <div className='random__contenedor__textarea'>
                    <textarea style={{ width: '100%', height: '100%' }} value={cadenasResultado} onChange={() => {  }} disabled></textarea>
                </div>
            </div>
        </Container>
    );
}

export default AleatorioUrlsManualPage;
