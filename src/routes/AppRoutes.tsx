import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Me from "../pages/Me/Me";
import CadastroAssistencia from "../pages/CadastroAssistencia";
import Usuarios from "../pages/Usuario/Usuarios";
import Fornecedores from "../pages/Fornecedor/Fornecedores";
import CadastroFornecedor from "../pages/CadastroFornecedor";
import MainLayout from "../layouts/MainLayout";
import Configuracoes from "../pages/configuracoes";
import Produtos from "../pages/Produto";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/me" element={<Me />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/fornecedores/novo" element={<CadastroFornecedor />} />
          <Route path="/produtos" element={<Produtos />} />

          <Route path="/assistencia/novo" element={<CadastroAssistencia />} />

          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
