import React from 'react'
import AleatorioUrlsBdModalReset from '../../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModalReset/AleatorioUrlsBdModalReset'
import ConfirmationModalComponent from '../../../components/General/ConfirmationModal/ConfirmationModalComponent'

const ListaUrlsBdPaginationModals = ({
  AleatorioUrlsBdModalResetObjects,
  ConfirmationModalDeleteObjects
}) => {
  const { modalResetShow, setmodalResetShow } = AleatorioUrlsBdModalResetObjects
  const { modalConfirmationDeleteShow, setmodalConfirmationDeleteShow, PressOkModalDelete } =
    ConfirmationModalDeleteObjects
  return (
    <div>
      <AleatorioUrlsBdModalReset
        modalShow={modalResetShow}
        setModalShow={setmodalResetShow}
        url={''}
        modalOkBtnAction={''}
        formData={{ newUrl: '' }}
        modalCancelBtnAction={() => {}}></AleatorioUrlsBdModalReset>

      {/* Delete url confirmation model */}
      <ConfirmationModalComponent
        modalShow={modalConfirmationDeleteShow}
        setModalShow={setmodalConfirmationDeleteShow}
        modalHeader="URL Delete"
        modalOkBtnText="Yes, i want."
        modalCloseBtnText="Cancel"
        modalOkBtnAction={PressOkModalDelete}
        modalBody={
          <div>Are you sure that you want to delete this URL?</div>
        }></ConfirmationModalComponent>
    </div>
  )
}

export default ListaUrlsBdPaginationModals
