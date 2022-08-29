import Random from '../random';
import Navbar from '../navbar';
import CreacionMasiva from '../creacion_masiva/creacion_masiva';
import RandomDb from '../random_db/random_db';
import ListDB from '../list_db/list_db';
import MenuPrincipal from '../menuPrincipal/index'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<MenuPrincipal/>} />
                    <Route path="mantenimiento">
                        <Route path="creacion">
                            <Route path="masiva" element={<CreacionMasiva />} />
                        </Route>
                        <Route path="random">
                            <Route path="db" element={<RandomDb />} />
                            <Route path="manual" element={<Random />} />
                        </Route>
                        <Route path="list">
                            <Route path="db" element={<ListDB />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
