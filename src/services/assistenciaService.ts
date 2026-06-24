import { api } from "./api";

export const assistenciaService = {
    listar() {
        return api.get("/assistencia/lista-assistencia");
    },

    buscarporId(id: number) {
        return api.get(`/assistencia/${id}`);
    },

    atualizarStatus(id: number, status_assistencia_id: number) {
        return api.patch(`/assistencia/atualizar-status-assistencia/${id}`),
        {
            status_assistencia_id,
        };
    },

    cadastrar(data: FormData) {
        return api.post(
            "/assistencia/cadastro-assistencia",
            data
        )
    }
}