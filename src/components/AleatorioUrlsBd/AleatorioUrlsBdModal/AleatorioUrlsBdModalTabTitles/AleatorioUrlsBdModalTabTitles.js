import React, { useContext } from 'react'
import { faClipboard, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../../../../hooks/useForm'
import { addTitleToUrl } from '../../../../services/urls/addTitleToUrl'
import GeneralTableButton from '../../../General/TableButton/TableButton'
import FormButtonComponent from '../../../General/FormButtonComponent/FormButtonComponent'
import { AppContext } from '../../../../utils/AppContext'
import { OK_STATUS } from '../../../../constants'
import { updateArrayObject } from '../../../../utils/url'
import { deleteTitleFromUrl } from '../../../../services/urls/deleteTitleFromUrl'

const AleatorioUrlsBdModalTabTitle = ({
  modalLink,
  setModalLink,
  links,
  setLinks,
  modalLinkIndex
}) => {
  // Title form
  const [{ tFormTitle }, tFormHandleInputChange, tFormReset] = useForm({
    tFormTitle: '',
    initial: true
  })

  const { setToastAppProperties, setShowLoaderApp } = useContext(AppContext)

  const handleDelete = async (title) => {
    setShowLoaderApp(true)
    const { data, message, status } = await deleteTitleFromUrl(
      modalLink._id,
      title._id,
      modalLink.index
    )
    if (status === OK_STATUS) {
      const urlOld = modalLink
      updateArrayObject(links, setLinks, urlOld, data)
      setModalLink(data)
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

  const handleTitleFormSubmit = async (e) => {
    e.preventDefault()
    const { data, message, status } = await addTitleToUrl(modalLink._id, tFormTitle, modalLinkIndex)

    if (status === OK_STATUS) {
      const urlOld = modalLink
      updateArrayObject(links, setLinks, urlOld, data)
      tFormReset()
      setModalLink(data)
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
    <div>
      <form onSubmit={handleTitleFormSubmit}>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Título
          </label>
          <div className="col-sm-10">
            <div className="inputModal__container">
              <input
                type="text"
                className="form-control"
                value={tFormTitle}
                onChange={tFormHandleInputChange}
                autoComplete="off"
                name="tFormTitle"
              />
            </div>
          </div>
        </div>
        <div className="form-group col-12 inputModal__containerButtons">
          <FormButtonComponent text={'Agregar'} faIcon={faSquarePlus}></FormButtonComponent>
        </div>
      </form>

      <div className="col-12">
        <table className="random__content__table">
          <thead>
            <tr>
              <th>Title</th>
              <th style={{ width: '20%' }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {modalLink?.titles?.length ? (
              modalLink.titles.map((title, index) => (
                <tr key={index}>
                  <td className="url">{title.title}</td>
                  <td style={{ width: '10%' }}>
                    <GeneralTableButton
                      faIcon={faClipboard}
                      msgTooltip={'Ver'}
                      action={() => {
                        navigator.clipboard.writeText(title.title)
                      }}></GeneralTableButton>
                    <GeneralTableButton
                      faIcon={faTrash}
                      msgTooltip={'Delete'}
                      color="red"
                      action={() => {
                        handleDelete(title)
                      }}></GeneralTableButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AleatorioUrlsBdModalTabTitle
