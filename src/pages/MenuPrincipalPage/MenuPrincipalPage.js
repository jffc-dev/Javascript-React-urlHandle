import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faHand, faList, faAdd } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './MenuPrincipalPage.css'

const MenuPrincipalPage = () => {
  return (
    <Container style={{ paddingTop: '80px', height: '100%' }}>
      <div className="menu_principal__contenedor">
        <Link className="menu_principal__item" to={`/mantenimiento/random/db`}>
          <FontAwesomeIcon className="faIcon" icon={faDatabase} size="5x" inverse />
          <span>Random DB</span>
        </Link>
        <Link className="menu_principal__item" to={`/mantenimiento/list/db`}>
          <FontAwesomeIcon className="faIcon" icon={faList} size="5x" inverse />
          <span>List DB</span>
        </Link>
        <Link className="menu_principal__item" to={`/mantenimiento/creacion/masiva`}>
          <FontAwesomeIcon className="faIcon" icon={faAdd} size="5x" inverse />
          <span>Add URL</span>
        </Link>
        <Link
          className="menu_principal__item menu_principal__item__manual"
          to={`/mantenimiento/random/manual`}>
          <FontAwesomeIcon className="faIcon" icon={faHand} size="5x" inverse />
          <span>Manual</span>
        </Link>
      </div>
    </Container>
  )
}

export default MenuPrincipalPage
