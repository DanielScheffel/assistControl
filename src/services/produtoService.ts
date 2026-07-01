import { api } from "./api"


export const produtoService = {
    listar() {
        return api.get("/produtos/produtos");
    },

    cadastrar(data: {
        sku: string;
        descricao: string;
        valor_produto: number;
        codigo_gtin_ean?: string;
        categoria_id: number;
        fornecedor_id: number;
    }) {
        return api.post("/produtos/cadastro-produto", data);
    },

    atualizar(
        id: number,
        data: {
            descricao?: string;
            valor_produto?: number;
            codigo_gtin_ean?: string;
            categoria_id?: number;
            fornecedor_id?: number;
        }
    ) {
        return api.put(`/produtos/atualizar-produto/${id}`, data);
    },

    deletar(id: number) {
        return api.delete(`/produtos/deletar-produto/${id}`)
    }
}