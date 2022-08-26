import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import Constants from '../../constants';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from 'axios';
import './creacion_masiva.css';

function Random() {
    const [cadenas, setCadenas] = useState("");
    const [paste, setPaste] = useState(false)

    const handleChangeCadenas = (event) => {
        if(paste){
            setPaste(false);
        }else{
            setCadenas(event.target.value);
        }
    }

    const handlePasteCadenas = (event) => {
        setPaste(true)
        setCadenas(event.target.value + event.clipboardData.getData('Text') + '\n');
    }

    const crearCadenas = () => {
        axios.post(Constants.urlBackend+'/api/urls/', {
            urls: cadenas
        })
        .then(function (response) {
            if(response.status === 201){
                Store.addNotification({
                    title: "Operación exitosa!",
                    message: `Se crearon ${response.data.rpta.rpta.insertedCount} urls de forma correcta`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
            };
            setCadenas('');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <ReactNotifications style={{ marginRight: '100px' }}/>
            <Container style={{paddingTop: '80px'}}>
                <div className='creacion'>
                    <div className='creacion__textarea'>
                        <textarea 
                            style={{ width: '100%', height: '100%' }} 
                            value={cadenas} 
                            onChange={handleChangeCadenas}
                            onPaste={handlePasteCadenas}>
                        </textarea>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='creacion__parte'>
                            <button onClick={() => { crearCadenas() }}>Crear cadenas</button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Random;
