import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fornecedorService } from "../services/fornecedorService";

export default function EditarFornecedor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [marca, setMarca] = useState("");
  const [representante, setRepresentante] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarFornecedor() {
      try {
        const response = await fornecedorService.buscarPorId(Number(id));

        setMarca(response.data.marca);
        setRepresentante(response.data.representante);
        setContato(response.data.contato);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar fornecedor.");
      }
    }

    carregarFornecedor();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await fornecedorService.atualizar(Number(id), {
        marca,
        representante,
        contato,
        email,
      });

      alert("Fornecedor atualizado com sucesso!");

      navigate("/fornecedores");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar fornecedor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Editar Fornecedor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Marca</label>
          <input
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>

        <div>
          <label>Representante</label>
          <input
            value={representante}
            onChange={(e) => setRepresentante(e.target.value)}
          />
        </div>

        <div>
          <label>Contato</label>
          <input
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
        </div>

        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}