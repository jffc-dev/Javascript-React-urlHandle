import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Constants from '../../constants';
import axios from 'axios';
import './list_db.css';

function ListDB() {

    const [cadenas, setCadenas] = useState([])
    const [cadenasFiltro, setCadenasFiltro] = useState([])
    const [busqueda, setBusqueda] = useState("")

    React.useEffect(() => {
        axios.get(Constants.urlBackend+'/api/urls/')
        .then(res => {
            setCadenas(res.data.urls);
            setCadenasFiltro(res.data.urls);
        })
    }, []);

    const onChangeSearch = (event) => {
        setBusqueda(event.target.value)
        setCadenasFiltro(cadenas.filter(cadena=>cadena.url.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const cargarUrl = (idCadena) => {
        axios.post(Constants.urlBackend+'/api/urls/cargar/', {
            id: idCadena
        })
        .then(async(response) => {
            if(response.status === 201){
                console.log(response.data);
                const { value: formValues } = await Swal.fire({
                    title: 'Multiple inputs',
                    html:
                        `<span><b>Para la url:</b> ${response.data.contenido.url}</span>`+
                        `<br/><span><b>Se encontró el título:</b></span>`+
                        `<input id="swal-input1" class="swal2-input" value="${response.data.contenido.titulo.toString()}"}>`,
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                        ]
                    }
                })
                
                if (formValues) {
                    Swal.fire(JSON.stringify(formValues))
                }
            };
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Container style={{paddingTop: '80px'}}>
            <div className='random__contenedor'>
                <div>
                    <input value={busqueda} onChange={onChangeSearch} style={{display: 'inline-block', width: '100%', marginBottom: '1rem'}}/>
                    <table>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Fecha</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cadenasFiltro.map((cadena,index)=>(
                            <tr key={index}>
                                <td className='url'>
                                    {cadena.url}
                                </td>
                                <td className='date'>
                                    {new Date(cadena.audi_createdDate).toLocaleString()}
                                </td>
                                <td>
                                    <button disabled>Ver</button>
                                    <button onClick={_ => cargarUrl(cadena._id)}>Cargar</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );

}

export default ListDB;
