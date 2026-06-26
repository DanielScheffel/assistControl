import { useState } from "react";
import { fornecedorService } from "../services/fornecedorService";

export default function CadastroFornecedor() {
  const [marca, setMarca] = useState("");
  const [representante, setRepresentante] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await fornecedorService.cadastrar({
        marca,
        representante,
        contato,
        email,
      });

      alert("Fornecedor cadastrado com sucesso!");

      setMarca("");
      setRepresentante("");
      setContato("");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar fornecedor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Novo Fornecedor</h1>

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
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}