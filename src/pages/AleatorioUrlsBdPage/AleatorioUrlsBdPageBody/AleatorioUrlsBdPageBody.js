import {
  faClipboard,
  faEye,
  faGlobe,
  faRotate,
  faSearch,
  faSpinner,
  faTrashRestore
} from '@fortawesome/free-solid-svg-icons'
import { KeyPressFilterComponent } from '../../../components/Filtros/KeyPressFilterComponent/KeyPressFilterComponent'
import GeneralTableButton from '../../../components/General/TableButton/TableButton'
import { OpenAdvancedGoogleSearch } from '../../../utils/pages/AleatorioUrlsBdPageUtils'
import { abrirUrlEspecifica } from '../../../utils/url'

const AleatorioUrlsBdPageBody = ({
  cadenas,
  setCadenasFiltro,
  cadenasFiltro,
  selectedLink,
  currentLink,
  setCadenas,
  setSelectedLink,
  OpenConfirmModalReset,
  verDetalleUrl,
  OpenConfirmModalLoadTitle,
  OpenConfirmModalReplace
}) => {
  return (
    <div className="random__tabla">
      <KeyPressFilterComponent cadenas={cadenas} setCadenasFiltro={setCadenasFiltro} />
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
                      abrirUrlEspecifica(cadena.currentUrl)
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
              <td colSpan={5} style={{ textAlign: 'center' }}>
                No se cargaron registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AleatorioUrlsBdPageBody
