import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './KeyPressFilterComponent.css'

export const KeyPressFilterComponent = ({ cadenas, setCadenasFiltro }) => {
  const [busqueda, setBusqueda] = useState('')

  const onChangeSearch = (event) => {
    setBusqueda(event.target.value)
    setCadenasFiltro(
      cadenas.filter((cadena) =>
        cadena.url.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  const clearSearch = () => {
    setBusqueda('')
    onChangeSearch({
      target: { value: '' }
    })
  }

  return (
    <div className="inputKeyPress__container">
      <input
        value={busqueda}
        onChange={onChangeSearch}
        className="inputKeyPress__filter form-control"
      />
      <button className="inputKeyPress__button" onClick={clearSearch}>
        <FontAwesomeIcon className="faIcon" icon={faX} inverse />
      </button>
    </div>
  )
}
