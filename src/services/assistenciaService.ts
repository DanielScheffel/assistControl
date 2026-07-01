import { api } from "./api";

export const assistenciaService = {
    listar() {
        return api.get("/assistencia/lista-assistencia");
    },

    buscarPorId(id: number) {
        return api.get(`/assistencia/${id}`);
    },

    cadastrar(data: FormData) {
        return api.post(
            "/assistencia/cadastro-assistencia",
            data, {
                headers: {
                    "Content-Type": "Multipart/form-data"
                },
            }
        )
    },

    atualizarStatus(id: number, status_assistencia_id: number) {
        return api.patch(`/assistencia/atualizar-status-assistencia/${id}`, {
            status_assistencia_id,
        });
    },

    search(status?: string, codigoInterno?: string) {
  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (codigoInterno) {
    params.append("codigoInterno", codigoInterno);
  }

  const query = params.toString();

  return api.get(`/assistencia/search${query ? `?${query}` : ""}`);
},
}