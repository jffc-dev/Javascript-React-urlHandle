import React, { useState } from 'react'

import { AppContext } from '../utils/AppContext'
import AppRouter from './AppRouter'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [toastAppProperties, setToastAppProperties] = useState({
    title: '',
    message: '',
    type: '',
    date: null
  })
  const [showLoaderApp, setShowLoaderApp] = useState(false)

  const context = {
    setShowLoaderApp,
    setToastAppProperties,
    setDarkMode
  }

  return (
    <AppContext.Provider value={context}>
      <AppRouter
        darkMode={darkMode}
        toastAppProperties={toastAppProperties}
        showLoaderApp={showLoaderApp}></AppRouter>
    </AppContext.Provider>
  )
}

export default App
