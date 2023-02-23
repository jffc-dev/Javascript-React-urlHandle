import React from 'react'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import GeneralTableButton from '../../../General/TableButton/TableButton'

const AleatorioUrlsBdModalTabTitles = ({ cadena }) => {
  return (
    <div className="col-12">
      <table className="random__content__table">
        <thead>
          <tr>
            <th>URL</th>
            <th style={{ width: '20%' }}>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {cadena &&
            cadena.resets &&
            (cadena.resets.length ? (
              cadena.resets.map((reset, index) => (
                <tr key={index}>
                  <td className="url">{reset.url}</td>
                  <td style={{ width: '10%' }}>
                    <GeneralTableButton
                      faIcon={faClipboard}
                      msgTooltip={'Ver'}
                      action={() => {
                        navigator.clipboard.writeText(reset.url)
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
  )
}

export default AleatorioUrlsBdModalTabTitles
