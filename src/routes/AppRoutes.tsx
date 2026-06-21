import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Me from "../pages/Me";
import CadastroAssistencia from "../pages/CadastroAssistencia";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Me" element={<Me />} />

                <Route path="/assistencia/novo" element={<CadastroAssistencia />} />
            </Routes>
        </BrowserRouter>
    )
}