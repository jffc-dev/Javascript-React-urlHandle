import React, { useContext, useState } from 'react'

import './ListaUrlsBdPaginationPage.css'
import { Container } from 'react-bootstrap'
import { OK_STATUS } from '../../constants'
import { getUrlsPaginate } from '../../services/urls/getUrlsPaginate'
import { AppContext } from '../../utils/AppContext'
import { faEye, faGlobe, faRotate, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  handleDeleteAction,
  handleGoAction,
  handleLoadAction
} from '../../utils/pages/ListaUrlsBdPaginationPage'
import ListaUrlsBdPaginationModals from './ListaUrlsBdPaginationModals/ListaUrlsBdPaginationModals'
import TableComponentPaginated from '../../components/General/TableComponentPaginated/TableComponentPaginated'
import DetailUrlModal from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModal'
import ListaUrlsBdPaginationFilter from './ListaUrlsBdPaginationFilter/ListaUrlsBdPaginationFilter'

const ListaUrlsBdPaginationPage = () => {
  const [links, setLinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedSize, setPaginatedSize] = useState(20)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [filterTable, setFilterTable] = useState(null)
  const { setShowLoaderApp, setToastAppProperties } = useContext(AppContext)
  // States confirmation modal - reset
  const [modalResetShow, setModalResetShow] = useState(false)

  // States confirmation modal - delete
  const [modalConfirmationDeleteShow, setmodalConfirmationDeleteShow] = useState(false)
  const [modalDeleteLink, setmodalDeleteLink] = useState(null)

  // States modal - detail
  const [modalDetailShow, setmodalDetailShow] = useState(false)
  const [modalDetailLink, setmodalDetailLink] = useState(null)

  React.useEffect(() => {
    getData(currentPage, paginatedSize)
  }, [])

  const getData = async (currentPage, size) => {
    setShowLoaderApp(true)
    const { data, message, status } = await getUrlsPaginate({ page: currentPage, size })

    if (status === OK_STATUS) {
      const { items, totalPages, totalItems } = data
      setLinks(items)
      setTotalPages(totalPages)
      setTotalItems(totalItems)
    } else {
      setToastAppProperties({
        title: 'ERROR',
        message,
        type: 'danger',
        date: new Date()
      })
    }
    setShowLoaderApp(false)
  }

  const PressOkModalDelete = async () => {
    handleDeleteAction(modalDeleteLink, links, setLinks, setToastAppProperties)
    setmodalConfirmationDeleteShow(false)
  }

  const OpenConfirmModalDelete = async (link) => {
    setmodalDeleteLink(link)
    setmodalConfirmationDeleteShow(true)
  }

  const OpenConfirmModalDetail = async (link) => {
    setmodalDetailLink(link)
    setmodalDetailShow(true)
  }

  return (
    <Container style={{ paddingTop: '80px' }}>
      <ListaUrlsBdPaginationModals
        AleatorioUrlsBdModalResetObjects={{
          modalShow: modalResetShow,
          setModalShow: setModalResetShow,
          url: '',
          modalOkBtnAction: '',
          formData: '',
          modalCancelBtnAction: ''
        }}
        ConfirmationModalDeleteObjects={{
          modalConfirmationDeleteShow,
          setmodalConfirmationDeleteShow,
          PressOkModalDelete
        }}></ListaUrlsBdPaginationModals>

      <DetailUrlModal
        modalShow={modalDetailShow}
        setModalShow={setmodalDetailShow}
        cadenas={links}
        setCadenas={setLinks}
        cadena={modalDetailLink}
        setCadena={setmodalDetailLink}></DetailUrlModal>

      <ListaUrlsBdPaginationFilter
        filterTable={filterTable}
        setFilterTable={setFilterTable}></ListaUrlsBdPaginationFilter>

      <TableComponentPaginated
        data={links}
        setData={setLinks}
        heads={{
          currentTitleOrUrl: { name: 'URL', width: 850, type: 'string' },
          dateCreated: { name: 'Creation date', width: 150, type: 'date' },
          _id: { name: 'ID', type: 'string' }
        }}
        actions={[
          {
            actionShow: true,
            actionIcon: faGlobe,
            actionText: 'Go',
            actionFunction: handleGoAction
          },
          {
            actionShow: true,
            actionIcon: faEye,
            actionText: 'Detail',
            actionFunction: OpenConfirmModalDetail
          },
          {
            actionShow: true,
            actionIcon: faSpinner,
            actionText: 'Load',
            actionFunction: handleLoadAction
          },
          {
            actionShow: true,
            actionIcon: faRotate,
            actionText: 'Reset',
            actionFunction: handleLoadAction
          },
          {
            actionShow: true,
            actionIcon: faTrash,
            actionText: 'Delete',
            actionFunction: OpenConfirmModalDelete,
            actionColor: 'red'
          }
        ]}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        getData={getData}
        size={paginatedSize}
        setSize={setPaginatedSize}
        totalItems={totalItems}></TableComponentPaginated>
    </Container>
  )
}

export default ListaUrlsBdPaginationPage
