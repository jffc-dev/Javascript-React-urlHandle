import React, { useContext } from 'react'
import { faClipboard, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../../../../hooks/useForm'
import { addTitleToUrl } from '../../../../services/urls/addTitleToUrl'
import GeneralTableButton from '../../../General/TableButton/TableButton'
import FormButtonComponent from '../../../General/FormButtonComponent/FormButtonComponent'
import { AppContext } from '../../../../utils/AppContext'
import { OK_STATUS } from '../../../../constants'
import { updateArrayObject } from '../../../../utils/url'

const AleatorioUrlsBdModalTabTitle = ({ cadena, setCadena, cadenas, setCadenas, cadenaIndex }) => {
  // Title form
  const [{ tFormTitle }, tFormHandleInputChange, tFormReset] = useForm({
    tFormTitle: '',
    initial: true
  })

  const { setToastAppProperties } = useContext(AppContext)

  const handleTitleFormSubmit = async (e) => {
    e.preventDefault()
    const { data, message, status } = await addTitleToUrl(cadena._id, tFormTitle, cadenaIndex)

    if (status === OK_STATUS) {
      const urlOld = cadena
      updateArrayObject(cadenas, setCadenas, urlOld, data)
      tFormReset()
      setCadena(data)
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
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th style={{ width: '20%' }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {cadena &&
              cadena.titles &&
              (cadena.titles.length ? (
                cadena.titles.map((title, index) => (
                  <tr key={index}>
                    <td className="url">{title.title}</td>
                    <td style={{ width: '10%' }}>
                      <GeneralTableButton
                        faIcon={faClipboard}
                        msgTooltip={'Ver'}
                        action={() => {
                          navigator.clipboard.writeText(title.title)
                        }}></GeneralTableButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center' }}>
                    No se cargaron registros
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AleatorioUrlsBdModalTabTitle
