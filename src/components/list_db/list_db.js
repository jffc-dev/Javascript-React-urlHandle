import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Constants from '../../constants';
import {abrirUrlEspecifica, reestablecerUrl} from '../../utils/url.js'
import axios from 'axios';
import './list_db.css';
import { Url } from '../../models/Url';

function ListDB() {

    const [cadenas, setCadenas] = useState([])
    const [cadenasFiltro, setCadenasFiltro] = useState([])
    const [busqueda, setBusqueda] = useState("")

    React.useEffect(() => {
        axios.get(Constants.urlBackend+'/api/urls/')
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

                cadenasClase.push(new Url(cadena._id, index+1, cadena.resets ? maxReset.url : cadena.url, '', cadena.audi_createdDate));
                return null;
            })
            setCadenas(cadenasClase);
            setCadenasFiltro(cadenasClase);
        })
    }, []);

    const onChangeSearch = (event) => {
        setBusqueda(event.target.value)
        setCadenasFiltro(cadenas.filter(cadena=>cadena.url.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const cargarUrl = async(idCadena) => {
        await axios.post(Constants.urlBackend+'/api/urls/cargar/', {
            id: idCadena
        })
        .then(async(response) => {
            if(response.status === 201){
                const { value: formValues } = await Swal.fire({
                    title: 'Obtención de título',
                    html:
                        `<span><b>Para la url:</b> ${response.data.contenido.url}</span>`+
                        `<br/><span><b>Se encontró el título:</b></span>`+
                        `<br/><textarea id="swal-input1" style="width: 100%">${response.data.contenido.titulo.toString()}</textarea>`,
                    focusConfirm: false,
                    preConfirm: async() => {
                        const titulo = document.getElementById('swal-input1').value

                        const data = await axios.patch(Constants.urlBackend+'/api/urls/add-title/'+idCadena, {
                            title: titulo
                        })
                        .then((response) => {
                            if(response.status === 201){
                                return response.data
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                        return data
                    }
                })
                
                if (formValues) {
                    Swal.fire(formValues.msg)
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
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cadenasFiltro.map((cadena,index)=>(
                            <tr key={index}>
                                <td className='url'>
                                    {cadena.url}
                                </td>
                                <td className='date'>
                                    {new Date(cadena.dateCreated).toLocaleString()}
                                </td>
                                <td>
                                    <button onClick={_ => abrirUrlEspecifica(cadena)}>Ver</button>
                                    <button onClick={_ => cargarUrl(cadena._id)}>Cargar</button>
                                    <button onClick={_ => reestablecerUrl(cadena, cadenas, setCadenas)}>Reestablecer</button>
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
