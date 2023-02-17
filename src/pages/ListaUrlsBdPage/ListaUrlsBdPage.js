import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { faGlobe, faRotate, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'

import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { abrirUrlEspecifica, hanldeDeleteUrl, updateArrayObject } from '../../utils/url.js'
// import './ListaUrlsBdPage.css'
import GeneralTableButton from '../../components/General/TableButton/TableButton'
import { AppContext } from '../../utils/AppContext'
import { getUrls } from '../../services/urls/getUrls'
import AleatorioUrlsBdModalReset from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModalReset/AleatorioUrlsBdModalReset'
import { addResetToUrl } from '../../services/urls/addResetToUrl'

const ListaUrlsBdPage = () => {
  const [cadenas, setCadenas] = useState([])
  const [cadenasFiltro, setCadenasFiltro] = useState([])
  const [busqueda, setBusqueda] = useState('')

  // States confirmation modal - reset
  const [modalResetShow, setmodalResetShow] = useState(false)
  const [modalCadenaReset, setmodalCadenaReset] = useState(null)

  const { setShowLoaderApp, setToastAppProperties } = useContext(AppContext)

  React.useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data, message, status } = await getUrls()

    if (status === OK_STATUS) {
      setCadenas(data)
      setCadenasFiltro(data)
    } else {
      setToastAppProperties({
        title: 'ERROR',
        message,
        type: 'danger',
        date: new Date()
      })
    }
  }

  const onChangeSearch = (event) => {
    setBusqueda(event.target.value)
    setCadenasFiltro(
      cadenas.filter((cadena) =>
        cadena.url.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  const OpenConfirmModalReset = async (cadena) => {
    setmodalCadenaReset(cadena)
    setmodalResetShow(true)
  }

  const PressOkModalReset = async (idUrl, newUrl, index) => {
    const { data, status, message } = await addResetToUrl(idUrl, newUrl, index)
    if (status === OK_STATUS) {
      updateArrayObject(cadenas, setCadenas, modalCadenaReset, data)
      setmodalResetShow(false)
    } else {
      setToastAppProperties({
        title: 'ERROR',
        message,
        type: 'danger',
        date: new Date()
      })
    }
  }

  const cargarUrl = async (idCadena) => {
    setShowLoaderApp(true)
    await axios
      .post(API_URL_BASE + API_URL_URLS + 'load/', {
        id: idCadena
      })
      .then(async (response) => {
        const { data, message, status } = response.data
        if (status === 1) {
          setShowLoaderApp(false)
          const { value: formValues } = await Swal.fire({
            title: 'Obtención de título',
            html:
              `<span><b>Para la url:</b> ${data.url}</span>` +
              `<br/><span><b>Se encontró el título:</b></span>` +
              `<br/><textarea id="swal-input1" style="width: 100%">${data.titulo.toString()}</textarea>`,
            focusConfirm: false,
            preConfirm: async () => {
              const titulo = document.getElementById('swal-input1').value

              const data = await axios
                .patch(API_URL_BASE + '/api/url/add-title/' + idCadena, {
                  title: titulo
                })
                .then((response) => {
                  if (response.status === 201) {
                    return response.data
                  }
                })
                .catch((error) => {
                  console.log(error)
                })

              return data
            }
          })

          if (formValues) {
            Swal.fire(formValues.msg)
          }
        } else {
          setToastAppProperties({
            title: 'ERROR',
            message,
            type: 'danger',
            date: new Date()
          })
          setShowLoaderApp(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setShowLoaderApp(false)
      })
  }

  return (
    <Container style={{ paddingTop: '80px' }}>
      {/* Get new urls confirmation model */}
      <AleatorioUrlsBdModalReset
        modalShow={modalResetShow}
        setModalShow={setmodalResetShow}
        url={modalCadenaReset}
        modalOkBtnAction={PressOkModalReset}
        formData={{ newUrl: '' }}
        modalCancelBtnAction={() => {
          setmodalCadenaReset(false)
        }}></AleatorioUrlsBdModalReset>

      <div className="random__contenedor">
        <div>
          <input
            value={busqueda}
            onChange={onChangeSearch}
            style={{ display: 'inline-block', width: '100%', marginBottom: '1rem' }}
          />
          <table className="mb-5">
            <thead>
              <tr>
                <th>URL</th>
                <th>Fecha</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {cadenasFiltro.map((url, index) => (
                <tr key={index}>
                  <td className="url">{url.currentTitle || url.currentUrl}</td>
                  <td className="date">{new Date(url.dateCreated).toLocaleString()}</td>
                  <td>
                    <GeneralTableButton
                      faIcon={faGlobe}
                      msgTooltip={'Go'}
                      action={(_) => abrirUrlEspecifica(url)}></GeneralTableButton>
                    <GeneralTableButton
                      faIcon={faSpinner}
                      msgTooltip={'Load'}
                      action={(_) => cargarUrl(url._id)}></GeneralTableButton>
                    <GeneralTableButton
                      faIcon={faRotate}
                      msgTooltip={'Reset'}
                      action={() =>
                        OpenConfirmModalReset(url, cadenas, setCadenas)
                      }></GeneralTableButton>
                    <GeneralTableButton
                      faIcon={faTrash}
                      msgTooltip={'Delete'}
                      color="red"
                      action={(_) =>
                        hanldeDeleteUrl(url, cadenas, setCadenas, setToastAppProperties)
                      }></GeneralTableButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default ListaUrlsBdPage
