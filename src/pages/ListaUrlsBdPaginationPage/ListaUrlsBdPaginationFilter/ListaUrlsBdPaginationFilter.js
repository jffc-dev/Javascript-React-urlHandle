import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const ListaUrlsBdPaginationFilter = () => {
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-sm-4">
          <label>URL:</label>
          <input className="form-control" />
        </div>
        <div className="col-sm-4">
          <label>Fecha desde:</label>
          <input className="form-control" type="date" />
        </div>
        <div className="col-sm-4">
          <label>Fecha hasta:</label>
          <input className="form-control" type="date" />
        </div>
      </div>
      <div className="row d-flex justify-content-end mt-2">
        <div className="col-sm-4">
          <button className="col-sm-6">Buscar</button>
          <button className="col-sm-6">Limpiar</button>
        </div>
      </div>
    </div>
  )
}

export default ListaUrlsBdPaginationFilter
