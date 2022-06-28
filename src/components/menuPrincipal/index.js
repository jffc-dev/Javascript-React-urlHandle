import React from 'react';
import { Container } from 'react-bootstrap';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faDatabase, faHand } from '@fortawesome/free-solid-svg-icons';

function MenuPrincipal() {
  
    return (
        <Container style={{paddingTop: '80px'}}>
            <div className='menu_principal__contenedor'>
                <a className='menu_principal__item' href="/mantenimiento/random/db">
                    <FontAwesomeIcon className='faIcon' icon={faDatabase} size="5x" inverse  />
                    <span>Random DB</span>
                </a>
                <a className='menu_principal__item' href="/mantenimiento/random/manual">
                    <FontAwesomeIcon className='faIcon' icon={faHand} size="5x" inverse  />
                    <span>Manual</span>
                </a>
            </div>
        </Container>
    );
}

export default MenuPrincipal;
