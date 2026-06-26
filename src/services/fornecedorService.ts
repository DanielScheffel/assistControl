import { api } from "./api"
import type { Fornecedor } from "../types/Fornecedor"

interface NovoFornecedor {
    marca: string;
    representante: string;
    contato: string;
    email: string;
}

export const fornecedorService = {
    listar() {
        return api.get<Fornecedor[]>("/fornecedor/fornecedores");
    },

    cadastrar(data: NovoFornecedor) {
        return api.post("/fornecedor/novo-fornecedor", data);
    },

    buscarPorId(id: number) {
        return api.get<Fornecedor>(`/fornecedor/${id}`);
    },

    atualizar(id: number, data: {
        marca?: string;
        representante?: string;
        contato?: string;
        email?: string;
    }
    ) {
        return api.put(`/fornecedor/atualizar-fornecedor/${id}`, data);
    },

    deletar(id: number) {
        return api.delete(`/fornecedor/deletar-fornecedor/${id}`)
    }
}