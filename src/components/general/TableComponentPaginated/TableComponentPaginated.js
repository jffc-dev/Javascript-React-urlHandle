import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import TableComponent from './TableComponent/TableComponent'
import TableComponentPaginator from './TableComponentPaginator/TableComponentPaginator'
import TableComponentSizer from './TableComponentSizer/TableComponentSizer'
import './TableComponentPaginated.css'

const TableComponentPaginated = ({
  data,
  setData,
  heads,
  actions,
  currentPage,
  setCurrentPage,
  totalPages,
  getData,
  size,
  setSize,
  totalItems
}) => {
  React.useEffect(() => {
    getData(currentPage, size)
  }, [currentPage, size])
  return (
    <div>
      <TableComponent
        data={data}
        setData={setData}
        heads={heads}
        getData={getData}
        actions={actions}></TableComponent>
      <div className="d-flex justify-content-between py-3 flex-wrap">
        <TableComponentPaginator
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          getData={getData}></TableComponentPaginator>
        <TableComponentSizer
          size={size}
          setSize={setSize}
          totalItems={totalItems}></TableComponentSizer>
      </div>
    </div>
  )
}

export default TableComponentPaginated
