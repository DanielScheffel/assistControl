import { useState } from "react";
import { api } from "../services/api";

export default function CadastroAssistencia() {
    const [form, setForm] = useState({
        defeito: "",
        numero_peca: "",
        descricao_peca: "",
        loja_id: "",
        produto_id: "",
        status_assistencia_id: "",
    });

    const [imagens, setImagens] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            setImagens(Array.from(e.target.files));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            data.append("defeito", form.defeito);
            data.append("numero_peca", form.numero_peca);
            data.append("descricao_peca", form.descricao_peca);
            data.append("loja_id", form.loja_id);
            data.append("produto_id", form.produto_id);
            data.append("status_assistencia_id", form.status_assistencia_id);

            imagens.forEach((img) => {
                data.append("imagens", img);
            });

            await api.post("/assistencia/cadastro-assistencia", data);

            alert("Assistência cadastrada com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao cadastrar assistência");
        } finally {
            setLoading(false);
        }
    }

            return (
            <div>

                <h2>Cadastrar Assistência</h2>

                <form onSubmit={handleSubmit}>
                    
                    <input
                        name="defeito"
                        placeholder="Defeito"
                        onChange={handleChange}
                    />

                    <input
                        name="numero_peca"
                        placeholder="Número da peça"
                        onChange={handleChange}
                    />

                    <input
                        name="descricao_peca"
                        placeholder="Descrição da peça"
                        onChange={handleChange}
                    />

                    <input
                        name="loja_id"
                        placeholder="Loja"
                        onChange={handleChange}
                    />

                    <input
                        name="produto_id"
                        placeholder="Produto"
                        onChange={handleChange}
                    />

                    <input
                        name="status_assistencia_id"
                        placeholder="Status Assistência"
                        onChange={handleChange}
                    />

                    <input type="file" multiple onChange={handleFiles} />

                    <button disabled={loading}>
                        {loading ? "Enviando..." : "Cadastrar"}
                    </button>

                </form>


            </div>
        )
}