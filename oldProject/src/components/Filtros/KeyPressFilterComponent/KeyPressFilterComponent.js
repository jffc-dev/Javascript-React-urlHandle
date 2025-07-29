import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './KeyPressFilterComponent.css'

export const KeyPressFilterComponent = ({ busqueda, setBusqueda }) => {
  const onChangeSearch = (event) => {
    setBusqueda(event.target.value)
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
