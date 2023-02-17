import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

const ListaUrlsBdPaginationPaginator = ({ currentPage, setCurrentPage, totalPages, getData }) => {
  React.useEffect(() => {
    getData(currentPage)
  }, [currentPage])

  return (
    <Pagination>
      {currentPage > 1 && (
        <Pagination.Prev
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1)
            }
          }}
        />
      )}
      {currentPage > 2 && (
        <Pagination.Item
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(1)
            }
          }}>
          {1}
        </Pagination.Item>
      )}
      {currentPage > 3 && (
        <Pagination.Ellipsis
          onClick={() => {
            setCurrentPage(Math.ceil((1 + currentPage) / 2))
          }}
        />
      )}

      {currentPage > 1 && (
        <Pagination.Item
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}>
          {currentPage - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {currentPage < totalPages && (
        <Pagination.Item
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}>
          {currentPage + 1}
        </Pagination.Item>
      )}

      {currentPage < totalPages - 2 && (
        <Pagination.Ellipsis
          onClick={() => {
            setCurrentPage(Math.ceil((currentPage + totalPages) / 2))
          }}
        />
      )}
      {currentPage < totalPages - 1 && (
        <Pagination.Item
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(totalPages)
            }
          }}>
          {totalPages}
        </Pagination.Item>
      )}
      {currentPage < totalPages && (
        <Pagination.Next
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1)
            }
          }}
        />
      )}
    </Pagination>
  )
}

export default ListaUrlsBdPaginationPaginator
