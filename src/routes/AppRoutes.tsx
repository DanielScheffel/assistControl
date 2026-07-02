import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Me from "../pages/Me/Me";
import Usuarios from "../pages/Usuario/Usuarios";
import Fornecedores from "../pages/Fornecedor/Fornecedores";
import MainLayout from "../layouts/MainLayout";
import Configuracoes from "../pages/configuracoes";
import Produtos from "../pages/Produto";
import Assistencias from "../pages/Assistencia";
import NovaAssistencia from "../pages/Assistencia/Nova";
import DetalhesAssistencia from "../pages/Assistencia/Detalhe";
import EtiquetaAssistencia from "../pages/Assistencia/Etiqueta/Etiqueta";
import Lojas from "../pages/Loja";
import Dashboard from "../pages/Dashboard/index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/me" element={<Me />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/lojas" element={<Lojas />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/assistencias" element={<Assistencias />} />
          <Route path="/assistencia/novo" element={<NovaAssistencia />} />
          <Route path="/assistencia/:id" element={<DetalhesAssistencia />} />
          <Route path="/assistencia/:id/etiqueta" element={<EtiquetaAssistencia />} />  
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
