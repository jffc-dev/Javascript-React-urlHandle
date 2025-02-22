import {
  faClipboard,
  faEye,
  faGlobe,
  faRotate,
  faSearch,
  faSpinner,
  faTrashRestore
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { KeyPressFilterComponent } from '../../../components/Filtros/KeyPressFilterComponent/KeyPressFilterComponent'
import { GeneralTableButton } from '../../../components/General/TableButton/TableButton'
import { OpenAdvancedGoogleSearch } from '../../../utils/pages/AleatorioUrlsBdPageUtils'
import { abrirUrlEspecifica } from '../../../utils/url'

const AleatorioUrlsBdPageBody = ({
  cadenas,
  setCadenas,
  selectedLink,
  currentLink,
  setSelectedLink,
  OpenConfirmModalReset,
  verDetalleUrl,
  OpenConfirmModalLoadTitle,
  OpenConfirmModalReplace,
  handleSaveAsPlaylist,
  randomPage
}) => {
  const [busqueda, setBusqueda] = useState('')
  const currentRef = useRef(null)
  const selectedRef = useRef(null)
  const cadenasFiltered = cadenas.filter(
    (cadena) =>
      cadena.url.toLowerCase().includes(busqueda.toLowerCase()) ||
      cadena.currentTitle?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cadena.currentUrl?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="random__tabla">
      <KeyPressFilterComponent busqueda={busqueda} setBusqueda={setBusqueda} />
      <table className="random__content__table">
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
          {cadenasFiltered.length ? (
            cadenasFiltered.map((cadena, index) => (
              <tr
                key={index}
                className={selectedLink === cadena.index ? 'active_row' : ''}
                ref={
                  selectedLink === cadena.index
                    ? selectedRef
                    : currentLink === cadena.index
                    ? currentRef
                    : null
                }
                onClick={() => setSelectedLink(cadena.index)}>
                <td className="url">{currentLink === cadena.index && '->'}</td>
                <td style={{ width: '10%' }}>{cadena.index}</td>
                <td className="url">{cadena.currentTitle || cadena.currentUrl}</td>
                <td>{cadena.resets ? cadena.resets.length : 0}</td>
                <td>
                  <GeneralTableButton
                    faIcon={faGlobe}
                    msgTooltip={'Watch'}
                    action={() => {
                      setSelectedLink(cadena.index)
                      abrirUrlEspecifica(cadena.currentUrl)
                    }}></GeneralTableButton>
                  <GeneralTableButton
                    faIcon={faRotate}
                    msgTooltip={'Reset'}
                    action={() => {
                      setSelectedLink(cadena.index)
                      OpenConfirmModalReset(cadena, cadenas, setCadenas)
                    }}></GeneralTableButton>
                  <GeneralTableButton
                    faIcon={faEye}
                    msgTooltip={'Detail'}
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
                    msgTooltip={'Copy URL'}
                    action={() => {
                      setSelectedLink(cadena.index)
                      navigator.clipboard.writeText(cadena.url)
                    }}></GeneralTableButton>
                  <GeneralTableButton
                    faIcon={faTrashRestore}
                    msgTooltip={'Replace'}
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
              <td colSpan={5} style={{ textAlign: 'center' }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3">
        {randomPage && (
          <button
            className=""
            onClick={() => {
              handleSaveAsPlaylist(cadenas)
            }}>
            Save as playlist
          </button>
        )}
      </div>
      <ScrollToTopButton />
      <ScrollToActive
        currentRef={currentRef}
        selectedRef={selectedRef}
        selectedLink={selectedLink}
        currentLink={currentLink}
      />
    </div>
  )
}

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgb(var(--palette_n9))',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
        Up
      </button>
    )
  )
}

const ScrollToActive = ({ currentRef, selectedRef, selectedLink, currentLink }) => {
  const [type, setType] = useState('C')
  const scrollToTarget = () => {
    if (type === 'C' && currentRef.current) {
      currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setType('S')
    } else if (type === 'S' && selectedRef.current) {
      selectedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setType('C')
    }
  }

  return (
    (selectedLink > 0 || currentLink > 0) && (
      <button
        onClick={scrollToTarget}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
        Go
      </button>
    )
  )
}

export default AleatorioUrlsBdPageBody
