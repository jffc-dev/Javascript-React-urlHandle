import {
  faClipboard,
  faEye,
  faGlobe,
  faRotate,
  faSearch,
  faSpinner,
  faTrashRestore
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
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
              <tr key={index} className={selectedLink === cadena.index ? 'active_row' : ''}>
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
    </div>
  )
}

export default AleatorioUrlsBdPageBody
