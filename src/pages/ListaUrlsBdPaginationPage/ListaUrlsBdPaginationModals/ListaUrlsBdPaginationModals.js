import React from 'react'
import AleatorioUrlsBdModalReset from '../../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModalReset/AleatorioUrlsBdModalReset'

const ListaUrlsBdPaginationModals = ({ AleatorioUrlsBdModalResetObjects }) => {
  const { modalResetShow, setmodalResetShow } = AleatorioUrlsBdModalResetObjects
  return (
    <div>
      <AleatorioUrlsBdModalReset
        modalShow={modalResetShow}
        setModalShow={setmodalResetShow}
        url={''}
        modalOkBtnAction={''}
        formData={{ newUrl: '' }}
        modalCancelBtnAction={() => {}}></AleatorioUrlsBdModalReset>
    </div>
  )
}

export default ListaUrlsBdPaginationModals
