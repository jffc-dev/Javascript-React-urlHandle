import React, { useContext, useState } from 'react'

import './ListaUrlsBdPaginationPage.css'
import TableComponent from '../../components/General/TableComponent/TableComponent'
import { Container } from 'react-bootstrap'
import { OK_STATUS } from '../../constants'
import { getUrlsPaginate } from '../../services/urls/getUrlsPaginate'
import { AppContext } from '../../utils/AppContext'
import ListaUrlsBdPaginationPaginator from './ListaUrlsBdPaginationPaginator/ListaUrlsBdPaginationPaginator'
import { abrirUrlEspecifica } from '../../utils/url'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

const ListaUrlsBdPaginationPage = () => {
  const [links, setLinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { setToastAppProperties } = useContext(AppContext)

  React.useEffect(() => {
    getData(currentPage)
  }, [])

  const getData = async (currentPage) => {
    const {
      data: { items, totalPages },
      message,
      status
    } = await getUrlsPaginate({ page: currentPage, size: 20 })

    if (status === OK_STATUS) {
      setLinks(items)
      setTotalPages(totalPages)
    } else {
      setToastAppProperties({
        title: 'ERROR',
        message,
        type: 'danger',
        date: new Date()
      })
    }
  }

  return (
    <Container style={{ paddingTop: '80px' }}>
      <TableComponent
        data={links}
        setData={setLinks}
        heads={{
          _id: { name: 'ID', width: 1 },
          url: { name: 'URL', width: 50 },
          dateCreated: { name: 'Creation date', width: 50 }
        }}
        actions={[
          {
            actionShow: true,
            actionIcon: faGlobe,
            actionText: 'Go',
            actionFunction: abrirUrlEspecifica
          }
        ]}></TableComponent>
      <ListaUrlsBdPaginationPaginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        getData={getData}></ListaUrlsBdPaginationPaginator>
    </Container>
  )
}

export default ListaUrlsBdPaginationPage
