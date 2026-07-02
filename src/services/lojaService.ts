import { api } from "./api"


export const lojaService = {
    listar() {
        return api.get("/lojas/lojas");
    },

    cadastrar(data: {
        loja_nome: string;
        cidade: string;
        uf: string;
        sigla: string;
        cnpj: string;
    }) {
        return api.post("/lojas/loja/nova-loja", data);
    },

    atualizar(
    id: number,
    data: {
      loja_nome: string;
      cidade: string;
      uf: string;
      sigla: string;
      cnpj: string;
    }
  ) {
    return api.put(`/lojas/loja/editar-loja/${id}`, data);
  },

deletar(id: number) {
    return api.delete(`/lojas/loja/deletar-loja/${id}`);
  },
}