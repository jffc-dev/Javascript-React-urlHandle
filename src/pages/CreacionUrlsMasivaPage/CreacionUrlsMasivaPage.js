import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import 'react-notifications-component/dist/theme.css'
import { AppContext } from '../../utils/AppContext'
import { handleCreateMultipleUrl } from '../../utils/url'

import './CreacionUrlsMasivaPage.css'

const CreacionUrlsMasivaPage = () => {
  const [cadenas, setCadenas] = useState('')
  const [paste, setPaste] = useState(false)
  const { setToastAppProperties } = useContext(AppContext)

  const handleChangeCadenas = (event) => {
    if (paste) {
      setPaste(false)
    } else {
      setCadenas(event.target.value)
    }
  }

  const handlePasteCadenas = (event) => {
    setPaste(true)
    setCadenas(event.target.value + event.clipboardData.getData('Text') + '\n')
  }

  return (
    <Container style={{ paddingTop: '80px', height: '95%' }}>
      <div className="creacion">
        <div className="creacion__textarea">
          <textarea
            style={{ width: '100%', height: '100%' }}
            value={cadenas}
            onChange={handleChangeCadenas}
            onPaste={handlePasteCadenas}></textarea>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="creacion__parte">
            <button
              onClick={() => {
                handleCreateMultipleUrl(cadenas, setCadenas, setToastAppProperties)
              }}>
              Crear cadenas
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CreacionUrlsMasivaPage
