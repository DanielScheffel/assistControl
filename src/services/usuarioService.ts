import { api } from "./api";
import type { Usuario } from "../types/Usuario";

interface NovoUsuario {
    nome: string;
    email: string;
    senha: string;
    tipo_usuario: string;
}

interface AtualizarUsuario {
  nome?: string;
  email?: string;
  senha?: string;
  tipo_usuario?: string;
}

export const usuarioService = {
    listar() {
        return api.get<Usuario[]>("/usuario/usuarios");
    },

    cadastrar(data: NovoUsuario) {
        return api.post("/usuario/cadastro-usuario", data)
    },

    buscarId(id: number) {
        return api.get<Usuario>(`/usuario/${id}`);
    },

    atualizar(id: number, data: AtualizarUsuario) {
        return api.put(`/usuario/atualizar-usuario/${id}`, data)
    }, 

    alterarStatus(id: number, status: string) {
        return api.put(`/usuario/atualizar-status/${id}`, {
            status
        })
    },

    deletar(id: number) {
        return api.delete(`/usuario/delete-usuario/${id}`)
    }
}