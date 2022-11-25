import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from '../components/General/NavbarComponent/NavbarComponent';
import AleatorioUrlsManualPage from '../pages/AleatorioUrlsManualPage/AleatorioUrlsManualPage';
import CreacionUrlsMasivaPage from '../pages/CreacionUrlsMasivaPage/CreacionUrlsMasivaPage';
import AleatorioUrlsBdPage from '../pages/AleatorioUrlsBdPage/AleatorioUrlsBdPage';
import ListaUrlsBdPage from '../pages/ListaUrlsBdPage/ListaUrlsBdPage';
import MenuPrincipalPage from '../pages/MenuPrincipalPage/MenuPrincipalPage'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <NavbarComponent></NavbarComponent>
                <Routes>
                    <Route path='/' element={<MenuPrincipalPage/>} />
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
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
