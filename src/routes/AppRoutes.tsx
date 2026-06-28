import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Me from "../pages/Me/Me";
import CadastroAssistencia from "../pages/CadastroAssistencia";
import Usuarios from "../pages/Usuario/Usuarios";
import EditarUsuario from "../pages/EditarUsuario";
import Fornecedores from "../pages/Fornecedores";
import CadastroFornecedor from "../pages/CadastroFornecedor";
import EditarFornecedor from "../pages/EditarFornecedor";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/me" element={<Me />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />

          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/fornecedores/novo" element={<CadastroFornecedor />} />
          <Route
            path="/fornecedores/editar/:id"
            element={<EditarFornecedor />}
          />

          <Route path="/assistencia/novo" element={<CadastroAssistencia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
