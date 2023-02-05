import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import {
  faClipboard,
  faEye,
  faGlobe,
  faRotate,
  faSearch,
  faSpinner,
  faTrashRestore
} from '@fortawesome/free-solid-svg-icons'

import { abrirUrlEspecifica, updateArrayObject } from '../../utils/url.js'
import {
  openCurrentLink,
  OpenAdvancedGoogleSearch,
  handleGetUrlsRandom,
  PressOkModalLoadTitle
} from '../../utils/pages/AleatorioUrlsBdPageUtils.js'
import { KeyPressFilterComponent } from '../../components/Filtros/KeyPressFilterComponent/KeyPressFilterComponent'

import GeneralTableButton from '../../components/General/TableButton/TableButton'

import AleatorioUrlsBdModal from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModal'
import { getNewUrlService } from '../../services/urls/getNewUrl'
import ConfirmationModalComponent from '../../components/General/ConfirmationModal/ConfirmationModalComponent.js'
import AleatorioUrlsBdModalReset from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModalReset/AleatorioUrlsBdModalReset.js'
import { addResetToUrl } from '../../services/urls/addResetToUrl.js'
import { OK_STATUS } from '../../constants.js'
import { AppContext } from '../../utils/AppContext.js'
import './AleatorioUrlsBdPage.css'
import AleatorioUrlsBdModalLoad from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModalLoad/AleatorioUrlsBdModalLoad.js'
import { loadTitleOfUrlService } from '../../services/urls/loadTitleOfUrl.js'
import { useForm } from '../../hooks/useForm.js'

const AleatorioUrlsBdPage = ({ props }) => {
  const [cadenas, setCadenas] = useState([])
  const [cadenasFiltro, setCadenasFiltro] = useState([])
  const [nroResultados, setnroResultados] = useState(1)
  const [linkCount, setLinkCount] = useState(-1)
  const [currentLink, setCurrentLink] = useState(-1)
  const [selectedLink, setSelectedLink] = useState(-1)
  const intervalRef = React.useRef(null)

  // States modal
  const [modalDetailShow, setmodalDetailShow] = useState(false)
  const [modalConfirmationReplaceShow, setmodalConfirmationReplaceShow] = useState(false)
  const [modalConfirmationRandomShow, setmodalConfirmationRandomShow] = useState(false)
  const [modalCadena, setmodalCadena] = useState(null)

  // States confirmation modal - replace
  const [modalCadenaReplaceOld, setmodalCadenaReplaceOld] = useState(null)
  const [modalCadenaReplaceNew, setmodalCadenaReplaceNew] = useState(null)

  // States confirmation modal - reset
  const [modalResetShow, setmodalResetShow] = useState(false)
  const [modalCadenaReset, setmodalCadenaReset] = useState(null)

  // States confirmation modal - load title
  const [modalLoadTitleShow, setmodalLoadTitleShow] = useState(false)
  const [modalCadenaLoadTitle, setmodalCadenaLoadTitle] = useState(null)
  const [{ newTitle }, handleInputChange, modalLoadTitleReset] = useForm({
    newTitle: '',
    initial: true
  })

  const { setToastAppProperties, setShowLoaderApp } = useContext(AppContext)

  React.useEffect(() => {
    return () => stopCounter()
  }, [])

  const handleChangeResultados = (event) => {
    const content = event.target.value
    if (
      parseInt(content.substr(content.length - 1)) !== null &&
      parseInt(content.substr(content.length - 1)) !== undefined
    ) {
      setnroResultados(content)
    }
  }

  const handleContador = (operacion) => {
    if (operacion === '+') setnroResultados((prevCounter) => parseInt(prevCounter) + 1)
    else
      setnroResultados((prevCounter) =>
        parseInt(prevCounter) > 1 ? parseInt(prevCounter) - 1 : parseInt(prevCounter)
      )
  }

  const startCounter = (operacion) => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      handleContador(operacion)
    }, 100)
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const OpenConfirmModalRandom = async () => {
    if ((cadenas.length > 0 && cadenas.length < nroResultados) || currentLink < linkCount) {
      setmodalConfirmationRandomShow(true)
    } else {
      await handleGetUrlsRandom(
        nroResultados,
        setCadenas,
        setCadenasFiltro,
        setLinkCount,
        setCurrentLink,
        setmodalConfirmationRandomShow,
        setToastAppProperties
      )
    }
  }

  const PressOkModalRandom = async () => {
    if (cadenas.length > 0 && cadenas.length < nroResultados) {
      await AddExtraUrlsRandomExcept()
    } else if (currentLink < linkCount) {
      await handleGetUrlsRandom(
        nroResultados,
        setCadenas,
        setCadenasFiltro,
        setLinkCount,
        setCurrentLink,
        setmodalConfirmationRandomShow,
        setToastAppProperties
      )
    }
  }

  const AddExtraUrlsRandomExcept = async () => {
    const newUrlsCant = nroResultados - cadenas.length
    const excepts = cadenas.map((cadena) => {
      return cadena._id
    })
    const indexUrlBase = Math.max(...cadenas.map((cadena) => cadena.index))
    const { data, status, message } = await getNewUrlService(excepts, newUrlsCant, indexUrlBase)

    if (status === 1) {
      const oldUrls = [...cadenas]
      const newCadenasList = [...oldUrls, ...data]

      setCadenas([])
      setCadenas(newCadenasList)
      setLinkCount(newCadenasList.length)
      setCadenasFiltro(newCadenasList)
    } else {
      setToastAppProperties({
        title: 'ERROR',
        message,
        type: 'danger',
        date: new Date()
      })
    }

    setmodalConfirmationRandomShow(false)
  }

  const verDetalleUrl = (cadena) => {
    setmodalCadena(cadena)
    setmodalDetailShow(true)
  }

  const OpenConfirmModalReplace = async (cadena) => {
    const excepts = cadenas.map((cadena) => {
      return cadena._id
    })
    const { data, status } = await getNewUrlService(excepts, 1, cadena.index)

    if (status === 1) {
      const newUrl = data[0]
      setmodalCadenaReplaceOld(cadena)
      setmodalCadenaReplaceNew(newUrl)
      setmodalConfirmationReplaceShow(true)
    }
  }

  const OpenConfirmModalLoadTitle = async (cadena) => {
    setShowLoaderApp(true)
    const { data, status, message } = await loadTitleOfUrlService(cadena._id)
    if (status === OK_STATUS) {
      const { title } = data
      setmodalCadenaLoadTitle(cadena)
      handleInputChange({ target: { name: 'newTitle' }, val: title })
      setmodalLoadTitleShow(true)
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

  const PressOkModalReplace = async () => {
    updateArrayObject(cadenas, setCadenas, modalCadenaReplaceOld, modalCadenaReplaceNew)
    setmodalConfirmationReplaceShow(false)
  }

  const OpenConfirmModalReset = async (cadena) => {
    setmodalCadenaReset(cadena)
    setmodalResetShow(true)
  }

  const handlePressOkModalLoadTitle = async () => {
    await PressOkModalLoadTitle(
      modalCadenaLoadTitle,
      modalCadenaLoadTitle.index,
      cadenas,
      setCadenas,
      newTitle,
      modalLoadTitleReset,
      setToastAppProperties,
      setmodalLoadTitleShow
    )
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

  return (
    <Container style={{ paddingTop: '80px' }}>
      <AleatorioUrlsBdModal
        modalShow={modalDetailShow}
        setModalShow={setmodalDetailShow}
        cadenas={cadenas}
        setCadenas={setCadenas}
        cadena={modalCadena}
        setCadena={setmodalCadena}></AleatorioUrlsBdModal>

      {/* Replace URL Confirmation model */}
      <ConfirmationModalComponent
        modalShow={modalConfirmationReplaceShow}
        setModalShow={setmodalConfirmationReplaceShow}
        modalHeader="URL Replace"
        modalOkBtnAction={PressOkModalReplace}
        modalBody={
          modalCadenaReplaceOld &&
          modalCadenaReplaceNew && (
            <div>
              You are goin to replace{' '}
              <a target="_blank" href={modalCadenaReplaceOld.url} rel="noreferrer">
                {modalCadenaReplaceOld.title || 'Current URL'}
              </a>
              &nbsp;by{' '}
              <a target="_blank" href={modalCadenaReplaceNew.url} rel="noreferrer">
                {modalCadenaReplaceNew.title || 'New URL'}
              </a>
              . Are you sure?
            </div>
          )
        }></ConfirmationModalComponent>

      {/* Get new urls confirmation model */}
      <ConfirmationModalComponent
        modalShow={modalConfirmationRandomShow}
        setModalShow={setmodalConfirmationRandomShow}
        modalHeader="URL Random"
        modalOkBtnText="Yes, i want."
        modalCloseBtnText="Cancel"
        modalOkBtnAction={PressOkModalRandom}
        modalBody={
          cadenas.length > 0 && cadenas.length < nroResultados ? (
            <div>
              Do you want to add {nroResultados - cadenas.length} new urls to the current list
            </div>
          ) : (
            <div>
              You didn&apos;t finish to traversing the current list. Do you want to generate a new
              one?
            </div>
          )
        }></ConfirmationModalComponent>

      {/* Reset model */}
      <AleatorioUrlsBdModalReset
        modalShow={modalResetShow}
        setModalShow={setmodalResetShow}
        url={modalCadenaReset}
        modalOkBtnAction={PressOkModalReset}
        formData={{ newUrl: '' }}
        modalCancelBtnAction={() => {
          setmodalCadenaReset(false)
        }}></AleatorioUrlsBdModalReset>

      {/* Load title modal */}
      <AleatorioUrlsBdModalLoad
        modalShow={modalLoadTitleShow}
        setModalShow={setmodalLoadTitleShow}
        url={modalCadenaLoadTitle}
        modalOkBtnAction={handlePressOkModalLoadTitle}
        newTitle={newTitle}
        handleInputChange={handleInputChange}
        modalCancelBtnAction={() => {
          setmodalCadenaReset(false)
        }}></AleatorioUrlsBdModalLoad>
      <div>
        <div className="random__contenedor">
          <div className="random__contenedor__contador">
            <button
              onClick={() => {
                handleContador('-')
              }}
              onMouseDown={() => {
                startCounter('-')
              }}
              onMouseUp={stopCounter}
              onMouseLeave={stopCounter}>
              -
            </button>
            <input value={nroResultados} onChange={handleChangeResultados}></input>
            <button
              onClick={() => {
                handleContador('+')
              }}
              onMouseDown={() => {
                startCounter('+')
              }}
              onMouseUp={stopCounter}
              onMouseLeave={stopCounter}>
              +
            </button>
          </div>
          <div className="random__contenedor__botones">
            <div className="random__contenedor__botones_btn">
              <button
                onClick={() => {
                  OpenConfirmModalRandom()
                }}>
                Obtener cadenas
              </button>
            </div>
            <div className="random__contenedor__botones_btn">
              <button
                disabled={linkCount === currentLink}
                onClick={() => {
                  openCurrentLink(cadenas, currentLink, setCurrentLink)
                }}>
                Open URL
              </button>
              <div className="random__contenedor__botones_div">
                {currentLink === -1 ? '' : currentLink}
              </div>
            </div>
          </div>
        </div>
        <div className="random__tabla">
          <KeyPressFilterComponent cadenas={cadenas} setCadenasFiltro={setCadenasFiltro} />
          <table>
            <thead>
              <tr>
                <th style={{ width: '4%' }}></th>
                <th style={{ width: '6%' }}>NRO</th>
                <th>URL</th>
                <th style={{ width: '4%' }}>R</th>
                <th style={{ width: '26%' }}>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {cadenasFiltro.length ? (
                cadenasFiltro.map((cadena, index) => (
                  <tr key={index} className={selectedLink === cadena.index ? 'active_row' : ''}>
                    <td className="url">{currentLink === cadena.index && '->'}</td>
                    <td style={{ width: '10%' }}>{cadena.index}</td>
                    <td className="url">{cadena.currentTitle || cadena.currentUrl}</td>
                    <td>{cadena.resets ? cadena.resets.length : 0}</td>
                    <td>
                      <GeneralTableButton
                        faIcon={faGlobe}
                        msgTooltip={'Ver'}
                        action={() => {
                          setSelectedLink(cadena.index)
                          abrirUrlEspecifica(cadena)
                        }}></GeneralTableButton>
                      <GeneralTableButton
                        faIcon={faRotate}
                        msgTooltip={'Reestablecer'}
                        action={() => {
                          setSelectedLink(cadena.index)
                          OpenConfirmModalReset(cadena, cadenas, setCadenas)
                        }}></GeneralTableButton>
                      <GeneralTableButton
                        faIcon={faEye}
                        msgTooltip={'Detalle'}
                        action={() => {
                          setSelectedLink(cadena.index)
                          verDetalleUrl(cadena)
                        }}></GeneralTableButton>
                      <GeneralTableButton
                        faIcon={faSpinner}
                        msgTooltip={'Load'}
                        action={(_) => {
                          setSelectedLink(cadena.index)
                          OpenConfirmModalLoadTitle(cadena)
                        }}></GeneralTableButton>
                      <GeneralTableButton
                        faIcon={faClipboard}
                        msgTooltip={'Copiar URL'}
                        action={() => {
                          setSelectedLink(cadena.index)
                          navigator.clipboard.writeText(cadena.url)
                        }}></GeneralTableButton>
                      <GeneralTableButton
                        faIcon={faTrashRestore}
                        msgTooltip={'Reemplazar'}
                        color="red"
                        action={() => {
                          setSelectedLink(cadena.index)
                          OpenConfirmModalReplace(cadena)
                        }}></GeneralTableButton>
                      <GeneralTableButton
                        faIcon={faSearch}
                        msgTooltip={'Search'}
                        color="blue"
                        action={() => {
                          setSelectedLink(cadena.index)
                          OpenAdvancedGoogleSearch(cadena)
                        }}></GeneralTableButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    No se cargaron registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default AleatorioUrlsBdPage
