import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './TableComponentSizer.css'

const TableComponentSizer = ({ size, setSize, totalItems }) => {
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  return (
    <div className="d-flex align-items-center pagination__sizer">
      <div>
        <label className="form-label m-0" htmlFor="size">
          <span>({totalItems} total items.)</span> Items per page
        </label>
      </div>
      <div>
        <select className="form-select" name="size" value={size} onChange={handleSizeChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  )
}

export default TableComponentSizer
