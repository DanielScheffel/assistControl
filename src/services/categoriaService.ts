import { api } from "./api"


export const categoriaService = {

    listar() {
        return api.get("/categoria/categorias")
    },

    cadastrar(data: {
        categoria: string;
    }) {
        return api.post("/categoria/nova-categoria", data);
    },

    deletar(id: number) {
        return api.delete(`/categoria/deletar-categoria/${id}`);
    }
}