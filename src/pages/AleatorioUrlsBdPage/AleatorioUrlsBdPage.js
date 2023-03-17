import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'

import { updateArrayObject } from '../../utils/url.js'
import {
  openCurrentLink,
  handleGetUrlsRandom,
  PressOkModalLoadTitle
} from '../../utils/pages/AleatorioUrlsBdPageUtils.js'

import DetailUrlModal from '../../components/AleatorioUrlsBd/AleatorioUrlsBdModal/AleatorioUrlsBdModal'
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
import AleatorioUrlsBdPageHead from './AleatorioUrlsBdPageHead/AleatorioUrlsBdPageHead.js'
import AleatorioUrlsBdPageBody from './AleatorioUrlsBdPageBody/AleatorioUrlsBdPageBody.js'

const AleatorioUrlsBdPage = ({ props }) => {
  const [cadenas, setCadenas] = useState([])
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
    const { data, status, message } = await loadTitleOfUrlService(cadena.currentUrl)
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
      <DetailUrlModal
        modalShow={modalDetailShow}
        setModalShow={setmodalDetailShow}
        cadenas={cadenas}
        setCadenas={setCadenas}
        cadena={modalCadena}
        setCadena={setmodalCadena}></DetailUrlModal>

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
              You are going to replace{' '}
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
              Do you want to add {nroResultados - cadenas.length} new urls to the current list?
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
          setmodalLoadTitleShow(false)
        }}></AleatorioUrlsBdModalLoad>
      <div>
        <AleatorioUrlsBdPageHead
          handleContador={handleContador}
          startCounter={startCounter}
          stopCounter={stopCounter}
          nroResultados={nroResultados}
          handleChangeResultados={handleChangeResultados}
          OpenConfirmModalRandom={OpenConfirmModalRandom}
          linkCount={linkCount}
          currentLink={currentLink}
          cadenas={cadenas}
          setCurrentLink={setCurrentLink}
          openCurrentLink={openCurrentLink}></AleatorioUrlsBdPageHead>
        <AleatorioUrlsBdPageBody
          cadenas={cadenas}
          selectedLink={selectedLink}
          currentLink={currentLink}
          setCadenas={setCadenas}
          setSelectedLink={setSelectedLink}
          OpenConfirmModalReset={OpenConfirmModalReset}
          verDetalleUrl={verDetalleUrl}
          OpenConfirmModalLoadTitle={OpenConfirmModalLoadTitle}
          OpenConfirmModalReplace={OpenConfirmModalReplace}></AleatorioUrlsBdPageBody>
      </div>
    </Container>
  )
}

export default AleatorioUrlsBdPage
