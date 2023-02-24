import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useContext } from 'react'

import NavbarComponent from '../components/General/NavbarComponent/NavbarComponent'
import AleatorioUrlsManualPage from '../pages/AleatorioUrlsManualPage/AleatorioUrlsManualPage'
import CreacionUrlsMasivaPage from '../pages/CreacionUrlsMasivaPage/CreacionUrlsMasivaPage'
import AleatorioUrlsBdPage from '../pages/AleatorioUrlsBdPage/AleatorioUrlsBdPage'
import ListaUrlsBdPage from '../pages/ListaUrlsBdPage/ListaUrlsBdPage'
import MenuPrincipalPage from '../pages/MenuPrincipalPage/MenuPrincipalPage'
import LoaderFullScreenComponent from '../components/General/LoaderFullScreenComponent/LoaderFullScreenComponent'

import ToastContainerComponent from '../components/General/ToastContainerComponent/ToastContainerComponent'
import ListaUrlsBdPaginationPage from '../pages/ListaUrlsBdPaginationPage/ListaUrlsBdPaginationPage'
import { AppContext } from '../utils/AppContext'

const AppRouter = ({ darkMode, toastAppProperties, showLoaderApp }) => {
  const { setDarkMode } = useContext(AppContext)

  React.useEffect(() => {
    const root = document.querySelector(':root')
    const rootStyles = getComputedStyle(root)

    const blackColor = rootStyles.getPropertyValue('--black_color')
    const whiteColor = rootStyles.getPropertyValue('--white_color')

    if (darkMode) {
      root.style.setProperty('--background_color', blackColor)
      root.style.setProperty('--color', whiteColor)
    } else {
      root.style.setProperty('--background_color', whiteColor)
      root.style.setProperty('--color', blackColor)
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <ToastContainerComponent toastAppProperties={toastAppProperties}></ToastContainerComponent>
      <LoaderFullScreenComponent show={showLoaderApp}></LoaderFullScreenComponent>
      <NavbarComponent setDarkMode={setDarkMode} darkMode={darkMode}></NavbarComponent>
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
  )
}

export default AppRouter
