import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'

import NavbarComponent from '../components/General/NavbarComponent/NavbarComponent'
import AleatorioUrlsManualPage from '../pages/AleatorioUrlsManualPage/AleatorioUrlsManualPage'
import CreacionUrlsMasivaPage from '../pages/CreacionUrlsMasivaPage/CreacionUrlsMasivaPage'
import AleatorioUrlsBdPage from '../pages/AleatorioUrlsBdPage/AleatorioUrlsBdPage'
import ListaUrlsBdPage from '../pages/ListaUrlsBdPage/ListaUrlsBdPage'
import MenuPrincipalPage from '../pages/MenuPrincipalPage/MenuPrincipalPage'
import LoaderFullScreenComponent from '../components/General/LoaderFullScreenComponent/LoaderFullScreenComponent'

import { AppContext } from '../utils/AppContext'
import ToastContainerComponent from '../components/General/ToastContainerComponent/ToastContainerComponent'
import ListaUrlsBdPaginationPage from '../pages/ListaUrlsBdPaginationPage/ListaUrlsBdPaginationPage'

const App = () => {
  const [toastAppProperties, setToastAppProperties] = useState({
    title: '',
    message: '',
    type: '',
    date: null
  })
  const [showLoaderApp, setShowLoaderApp] = useState(false)

  const context = {
    setShowLoaderApp,
    setToastAppProperties
  }

  return (
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <ToastContainerComponent toastAppProperties={toastAppProperties}></ToastContainerComponent>
        <LoaderFullScreenComponent show={showLoaderApp}></LoaderFullScreenComponent>
        <NavbarComponent></NavbarComponent>
        <Routes>
          <Route path="/" element={<MenuPrincipalPage />} />
          <Route path="mantenimiento">
            <Route path="creacion">
              <Route path="masiva" element={<CreacionUrlsMasivaPage />} />
            </Route>
            <Route path="random">
              <Route path="db" element={<AleatorioUrlsBdPage />} />
              <Route path="manual" element={<AleatorioUrlsManualPage />} />
            </Route>
            <Route path="list">
              <Route path="db" element={<ListaUrlsBdPage />} />
              <Route path="dbv2" element={<ListaUrlsBdPaginationPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
